<script lang="ts" setup>
import { getObjOptions, getOptions, notify, PAYLOAD_ALL, STATUS_CODE_SUCCESS } from '@/helpers'
import { useCartStore, useOrderStore } from '@/stores'
import { onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import { columns, rules, CASH_ON_DELIVERY } from './shared'
import type { FormStateOrderDetail } from '@/interface'
import { ONLINE_PAYMENT, OPTIONS_PAYMENT_METHOD } from './shared/constants'
import { useRouter } from 'vue-router'

const loading = ref()
const loadingButton = ref()
const amountTotal = ref(0)
const selectedKeys = ref<any[]>([])
const orderStore = useOrderStore()
const { t } = useI18n()
const router = useRouter()
const cartStore = useCartStore()
const formRef = ref()
let autocompleteService = null as any
const arrayAddress = ref()
const formState = reactive<{ orders: FormStateOrderDetail[]; [key: string]: any }>({
    orders: [],
    shipping_address: '',
    place_id: '',
    note: '',
    payment_method: undefined,
})

const rowSelection = {
    onChange: (selectedRowKeys: any) => {
        selectedKeys.value = selectedRowKeys
        formState.orders =
            cartStore.getCart.data
                ?.filter((item: any) => selectedRowKeys.includes(item.id))
                .map((item: any) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    amount: item.product.price * item.quantity,
                })) || []
        amountTotal.value = formState.orders.reduce((sum: any, row: any) => sum + row.amount, 0)
    },
}

const onFinish = async () => {
    const { status_code } = await orderStore.create(formState)
    if (status_code === STATUS_CODE_SUCCESS) {
        if (!formState.orders.length) return notify(t(`cart.no_choose_product`), '', 'error')
        await cartStore.remove(selectedKeys.value)
        notify(t('cart.create_order_success'), '', 'success')
        return router.push({ name: 'home' })
    }
    return notify(t(`cart.create_order_failed`), '', 'error')
}

const redirectPaymentOnline = async () => {
    try {
        await formRef.value.validate()
        if (!formState.orders.length) {
            return notify(t(`cart.no_choose_product`), '', 'error')
        }
        const resultOrder = await orderStore.create(formState)
        if (resultOrder.status_code === STATUS_CODE_SUCCESS) {
            const { status_code, result } = await orderStore.createVNPayUrl({
                amount: amountTotal.value,
                order_id: +resultOrder.result.id,
            })
            if (status_code === STATUS_CODE_SUCCESS) {
                await cartStore.remove(selectedKeys.value)
                return (window.location.href = result)
            }
            return notify(t('cart.payment_method_no_unavailable'), '', 'error')
        }
        return notify(t(`cart.create_order_failed`), '', 'error')
    } catch (error) {
        console.error('Failed:', error)
    }
}

const onFinishFailed = (errorInfo: any) => console.error('Failed:', errorInfo)

const handleSearch = async (input: string) => {
    autocompleteService.getPlacePredictions(
        {
            input,
            componentRestrictions: { country: 'vn' },
        },
        (predictions: any, status: any) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                arrayAddress.value = predictions.map((item: any) => ({
                    description: item.description,
                    id: item.place_id,
                }))
            }
        }
    )
}

const handleChange = (value: any) => {
    formState.shipping_address = value.label
    formState.place_id = value.key
}

onMounted(async () => {
    loading.value = true
    if (window.google && window.google.maps) {
        autocompleteService = new window.google.maps.places.AutocompleteService()
    }
    await cartStore.list(PAYLOAD_ALL)
    loading.value = false
})

watch(
    () => cartStore.getCart.data,
    () => rowSelection.onChange(selectedKeys.value),
    { deep: true }
)
</script>

<template>
    <a-spin tip="Loading..." :spinning="loading">
        <a-empty v-if="!cartStore.getCart.data?.length">
            <template #description>
                <span>{{ t('cart.no_data') }} </span>
            </template>
        </a-empty>
        <a-table
            v-if="cartStore.getCart.data?.length"
            :dataSource="cartStore.getCart.data.map((item: any) => ({ ...item, key: item.id }))"
            :columns="columns"
            :pagination="false"
            :row-selection="rowSelection"
        />
        <div v-if="cartStore.getCart.data?.length" class="order">
            <div class="text">
                <span>{{ t('cart.amount_total') }}</span>
                <span>{{ amountTotal }}{{ t('unit_price') }}</span>
            </div>
        </div>
        <a-form
            v-if="cartStore.getCart.data?.length"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            :colon="false"
            ref="formRef"
            name="dynamic_form_nest_item"
            :model="formState"
            :rules="rules"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <a-form-item name="shipping_address" :label="t('cart.form.label.shipping_address')">
                <a-select
                    show-search
                    :options="getOptions(arrayAddress, 'description')"
                    :filterOption="false"
                    :notFoundContent="null"
                    :labelInValue="true"
                    @search="handleSearch"
                    @change="handleChange"
                />
            </a-form-item>
            <a-form-item name="payment_method" :label="t('cart.form.label.payment_method')">
                <a-select
                    v-model:value="formState.payment_method"
                    :options="getObjOptions(OPTIONS_PAYMENT_METHOD, false)"
                />
            </a-form-item>
            <a-form-item name="note" :label="t('cart.form.label.note')">
                <a-textarea v-model:value="formState.note" />
            </a-form-item>
            <a-button
                v-if="formState.payment_method === CASH_ON_DELIVERY"
                class="button"
                html-type="submit"
                key="submit"
                :loading="loadingButton"
            >
                {{ t('cart.button.order') }}
            </a-button>
            <a-button
                v-if="formState.payment_method === ONLINE_PAYMENT"
                class="button"
                @click="redirectPaymentOnline"
                >{{ t('cart.button.payment') }}</a-button
            >
        </a-form>
    </a-spin>
</template>

<style lang="scss" scoped>
.order {
    display: flex;
    gap: 20px;
    margin-top: 30px;
    justify-content: end;
    align-items: center;
}

.button {
    margin: 0 0 0 auto;
}
</style>

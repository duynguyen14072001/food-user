<script lang="ts" setup>
import { INITIAL_QUERY, notify, STATUS_CODE_SUCCESS } from '@/helpers'
import type { Product } from '@/interface'
import { useCartStore, useProductStore } from '@/stores'
import { onMounted, reactive, ref, watchEffect, type UnwrapRef } from 'vue'
import { useI18n } from 'vue3-i18n'
import { PER_PAGE_PRODUCTS } from './shared'

const { t } = useI18n()
const productStore = useProductStore()
const loading = ref()
const cartStore = useCartStore()
const query = ref({ ...INITIAL_QUERY, per_page: PER_PAGE_PRODUCTS })
const listProduct = ref<Product[]>([])
const formState: UnwrapRef<any> = reactive({})

const handleAddCart = async (id: number) => {
    loading.value = true
    const { status_code } = await cartStore.upsert({
        product_id: id,
        quantity: 1,
    })
    formState.quantity = 1
    if (status_code === STATUS_CODE_SUCCESS) {
        notify(t('products.add_cart_success'), '', 'success')
    }
    loading.value = false
}

watchEffect(async () => {
    loading.value = true
    await productStore.list(query.value)
    productStore.getProduct.data?.length &&
        (listProduct.value = [...listProduct?.value, ...productStore.getProduct.data])
    loading.value = false
})

onMounted(() => {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY
        const innerHeight = window.innerHeight
        const scrollHeight = document.documentElement.scrollHeight

        if (
            scrollY + innerHeight >= scrollHeight - 10 &&
            !loading.value &&
            Number(query.value.page) <
                Math.ceil(
                    Number(productStore.getProduct.total) / Number(productStore.getProduct.perPage)
                )
        ) {
            query.value = {
                ...query.value,
                page: Number(query.value.page) + 1,
            }
        }
    })
})
</script>

<template>
    <h2>{{ t('products.title') }}</h2>
    <div class="content">
        <product-item
            v-for="(item, index) in listProduct"
            :item="item"
            :key="index"
            @handle-add-cart="handleAddCart(item.id)"
        />
        <a-spin tip="Loading..." :spinning="loading" />
    </div>
</template>

<style lang="scss" scoped>
.content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}
</style>

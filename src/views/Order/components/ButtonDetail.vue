<script lang="ts" setup>
import { useOrderStore } from '@/stores'
import { ref } from 'vue'
import { useI18n } from 'vue3-i18n'

const props = defineProps(['id'])
const { t } = useI18n()
const open = ref()
const orderStore = useOrderStore()
const loading = ref()

const showDetail = async () => {
    loading.value = true
    open.value = true
    await orderStore.detail(+props.id)
    loading.value = false
}
</script>

<template>
    <div @click="showDetail" class="button">{{ t('order.column.button_detail') }}</div>

    <modal-vue
        :open="open"
        :wrapClassName="'modal-delete-chapter'"
        :centered="true"
        :width="600"
        :hasFooter="false"
        :closable="true"
        @cancel="open = false"
    >
        <template #body>
            <a-spin tip="Loading..." :spinning="loading">
                <h4 class="title-modal">{{ t('order.modal.title') }}</h4>
                <div
                    v-for="(item, index) in orderStore.getOrderDetail.orderDetails"
                    class="order__item"
                    :key="index"
                >
                    <div class="info-product">
                        <img :src="item.product.image_url" alt="" />
                        <div class="text">
                            <div class="name">{{ item.product.name }}</div>
                            <div class="quantity">
                                {{ t('order.modal.quantity') }}: {{ item.quantity }}
                            </div>
                            <div class="amount">
                                {{ t('order.modal.amount') }}:{{ item.product.price
                                }}{{ t('unit_price') }}
                            </div>
                        </div>
                    </div>
                    <div class="total">{{ item.amount }}{{ t('unit_price') }}</div>
                </div>
            </a-spin>
        </template>
    </modal-vue>
</template>

<style lang="scss" scoped>
.button {
    cursor: pointer;
}

.order__item {
    border-bottom: 1px solid var(--vt-c-gray-5);
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .info-product {
        display: flex;
        align-items: center;
        gap: 20px;

        img {
            width: 80px;
            height: 80px;
            object-fit: cover;
        }
    }

    .total {
        font-size: 16px;
    }

    &:last-of-type {
        border-bottom: none;
    }
}
</style>

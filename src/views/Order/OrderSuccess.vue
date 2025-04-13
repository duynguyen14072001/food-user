<script lang="ts" setup>
import { useOrderStore } from '@/stores'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { STATUS_CODE_SUCCESS } from '@/helpers'
import { CheckOutlined } from '@ant-design/icons-vue'
import { STATUS, STATUS_METHOD, STATUS_PAYMENT } from './shared'

dayjs.extend(utc)
dayjs.extend(timezone)

const { t } = useI18n()
const orderStore = useOrderStore()
const loading = ref()
const router = useRouter()
const { params } = useRoute()

onMounted(async () => {
    loading.value = true
    const { status_code } = await orderStore.detailReturn(+params.id)
    if (status_code !== STATUS_CODE_SUCCESS) {
        return router.push({ name: 'page-not-found' })
    }
    loading.value = false
})
</script>

<template>
    <a-spin tip="Loading..." :spinning="loading">
        <div class="box">
            <div class="icon">
                <CheckOutlined style="color: green; font-size: 20px" />
            </div>
            <div class="title">{{ t(`order_success.title`) }}</div>
            <div class="box-info">
                <div class="info-list">
                    <div class="info__item">
                        <span class="label">{{ t('order_success.created_at') }}</span>
                        <span>
                            {{
                                dayjs
                                    .utc(orderStore.getOrderDetail.created_at)
                                    .tz('Asia/Ho_Chi_Minh')
                                    .format('DD-MM-YYYY HH:mm:ss')
                            }}
                        </span>
                    </div>
                    <div class="info__item">
                        <span class="label">{{ t('order_success.expected_delivery_time') }}</span>
                        <span>
                            {{
                                dayjs
                                    .utc(orderStore.getOrderDetail.expected_delivery_time)
                                    .tz('Asia/Ho_Chi_Minh')
                                    .format('DD-MM-YYYY HH:mm:ss')
                            }}
                        </span>
                    </div>
                    <div class="info__item">
                        <span class="label">{{ t('order_success.status') }}</span>
                        <span>{{ STATUS[orderStore.getOrderDetail.status] }}</span>
                    </div>
                    <div class="info__item">
                        <span class="label">{{ t('order_success.payment_method') }}</span>
                        <span>{{ STATUS_METHOD[orderStore.getOrderDetail.payment_method] }}</span>
                    </div>
                    <div class="info__item">
                        <span class="label">{{ t('order_success.status_payment') }}</span>
                        <span>{{ STATUS_PAYMENT[orderStore.getOrderDetail.payment_status] }}</span>
                    </div>
                </div>
                <div class="order_summary">
                    <div class="order_summary_title">
                        {{ t('order_success.order_summary') }}
                    </div>
                    <div
                        class="order_summary__item"
                        v-for="(item, index) in orderStore.getOrderDetail.orderDetails"
                        :key="index"
                    >
                        <div class="name">{{ item.product.name }}</div>
                        <div class="amount">{{ item.amount }}{{ t('unit_price') }}</div>
                    </div>
                </div>
                <div class="amount">
                    <span class="label">{{ t('order_success.total') }}</span>
                    <span>{{ orderStore.getOrderDetail.total_price }}{{ t('unit_price') }}</span>
                </div>
            </div>
            <a-button type="primary">
                <router-link to="/">{{ t('order_success.back_homepage') }}</router-link>
            </a-button>
        </div>
    </a-spin>
</template>

<style lang="scss" scoped>
.box {
    margin: 30px auto 0;
    width: fit-content;
    padding: 20px;
    border: 1px solid var(--vt-c-gray-5);
    border-radius: 4px;

    .icon {
        width: fit-content;
        margin: 15px auto 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        background-color: var(--vt-c-green-1);
    }

    .icon-error {
        width: fit-content;
        margin: 15px auto 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        border: 1px solid var(--vt-c-gray-5);
    }

    .title {
        font-size: 26px;
        font-weight: bold;
        margin: 0 0 8px;
    }

    .info-list {
        padding: 10px 10px 0;
        margin: 0 0 10px;
        background-color: var(--vt-c-gray-5);
        border-radius: 4px;

        .info__item {
            padding: 0 0 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 30px;
        }
    }

    .order_summary {
        border-bottom: 1px solid var(--vt-c-gray-5);
        margin: 0 0 20px;
        &_title {
            font-size: 16px;
            font-weight: bold;
        }

        &__item {
            margin: 0 0 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }
    }

    .amount {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .label {
            font-size: 16px;
            font-weight: bold;
        }
    }

    .ant-btn {
        width: 200px;
        margin: 20px auto 0;
    }
}
</style>

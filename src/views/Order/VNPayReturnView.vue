<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CheckOutlined, ExclamationOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue3-i18n'
import { formatDate, formatDayJS, notify, STATUS_CODE_SUCCESS } from '@/helpers'
import { useOrderStore } from '@/stores'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const { query } = useRoute()
const orderStore = useOrderStore()
const loading = ref()
const { t } = useI18n()
const checked = ref()

const handlePayment = async () => {
    if (query.vnp_Amount && query.vnp_TxnRef) {
        const { status_code, result } = await orderStore.createVNPayUrl({
            amount: +query.vnp_Amount / 100,
            order_id: +query.vnp_TxnRef.toString().split('_')[0],
        })
        if (status_code === STATUS_CODE_SUCCESS) return (window.location.href = result)
        return notify(t('cart.payment_method_no_unavailable'), '', 'error')
    }
}

onMounted(async () => {
    loading.value = true
    const { result } = await orderStore.verifyVNPay(query)
    checked.value = result
    query.vnp_TxnRef && (await orderStore.detail(+query.vnp_TxnRef.toString().split('_')[0]))
    loading.value = false
})
</script>

<template>
    <a-spin tip="Loading..." :spinning="loading">
        <div v-if="!loading">
            <div class="box">
                <div v-if="checked" class="icon">
                    <CheckOutlined style="color: green; font-size: 20px" />
                </div>
                <div v-else class="icon-error">
                    <ExclamationOutlined style="color: red; font-size: 20px" />
                </div>
                <div class="title">
                    {{ t(`vnpay_return.${checked ? 'success' : 'failed'}.title`) }}
                </div>
                <div class="box-info">
                    <div class="info-list">
                        <div class="info__item">
                            <span class="label">{{ t('vnpay_return.created_at') }}</span>
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
                            <span class="label">{{
                                t('vnpay_return.expected_delivery_time')
                            }}</span>
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
                            <span class="label">{{ t('vnpay_return.date') }}</span>
                            <span>
                                {{
                                    dayjs
                                        .utc(
                                            query.vnp_OrderInfo?.toString().split(' - ')[1],
                                            'YYYYMMDDHHmmss'
                                        )
                                        .tz('Asia/Ho_Chi_Minh')
                                        .format('DD-MM-YYYY HH:mm:ss')
                                }}
                            </span>
                        </div>
                        <div class="info__item">
                            <span class="label">{{ t('vnpay_return.payment_method') }}</span>
                            <span>{{ t('vnpay_return.method_vnpay') }}</span>
                        </div>
                    </div>
                    <div class="order_summary">
                        <div class="order_summary_title">
                            {{ t('vnpay_return.order_summary') }}
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
                        <span class="label">{{ t('vnpay_return.total') }}</span>
                        <span>{{ Number(query.vnp_Amount) / 100 }}{{ t('unit_price') }}</span>
                    </div>
                </div>
                <a-button type="primary">
                    <router-link to="/">{{ t('vnpay_return.back_homepage') }}</router-link>
                </a-button>
                <a-button v-if="!checked" @click="handlePayment">
                    {{ t('vnpay_return.payment_again') }}
                </a-button>
            </div>
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

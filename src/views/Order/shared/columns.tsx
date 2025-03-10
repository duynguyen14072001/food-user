import { formatDate } from '@/helpers'
import type { ColumnTable } from '@/interface'
import i18n from '@/lang'
import { STATUS, STATUS_METHOD, STATUS_PAYMENT } from './constants'
import ButtonDetail from '../components/ButtonDetail.vue'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('order.column.created_at'),
        key: 'created_at',
        customRender: ({ record }: any) => (
            <div class="flex-center">{formatDate(record.created_at)}</div>
        ),
    },
    {
        title: t('order.column.item_count'),
        key: 'item_count',
        dataIndex: 'item_count',
    },
    {
        title: t('order.column.total_price'),
        key: 'total_price',
        customRender: ({ record }: any) => (
            <div class="flex-center">
                {record.total_price}
                {t('unit_price')}
            </div>
        ),
    },
    {
        title: t('order.column.shipping_address'),
        key: 'shipping_address',
        dataIndex: 'shipping_address',
    },
    {
        title: t('order.column.status'),
        key: 'status',
        dataIndex: 'status',
        customRender: ({ record }: any) => <div class="flex-center">{STATUS[record.status]}</div>,
    },
    {
        title: t('order.column.payment_status'),
        key: 'payment_status',
        dataIndex: 'payment_status',
        customRender: ({ record }: any) => (
            <div class="flex-center">{STATUS_PAYMENT[record.payment_status]}</div>
        ),
    },
    {
        title: t('order.column.payment_method'),
        key: 'payment_method',
        dataIndex: 'payment_method',
        customRender: ({ record }: any) => (
            <div class="flex-center">{STATUS_METHOD[record.payment_method]}</div>
        ),
    },
    {
        title: '',
        key: 'button_detail',
        customRender: ({ record }: any) => <ButtonDetail id={record.id} />,
    },
]

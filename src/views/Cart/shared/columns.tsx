import type { ColumnTable } from '@/interface'
import i18n from '@/lang'
import ButtonDelete from '../components/ButtonDelete.vue'
import ButtonQuantity from '../components/ButtonQuantity.vue'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('cart.column.name'),
        key: 'name',
        width: '200px',
        customRender: ({ record }: any) => (
            <div class="flex-center">
                <img src={record.product.image_url} alt="" />
                {record.product.name}
            </div>
        ),
    },
    {
        title: t('cart.column.price'),
        key: 'price',
        customRender: ({ record }: any) => <span>{record.product.price}</span>,
    },
    {
        title: t('cart.column.quantity'),
        key: 'quantity',
        customRender: ({ record }: any) => <ButtonQuantity item={record} />,
    },
    {
        title: t('cart.column.amount'),
        key: 'amount',
        customRender: ({ record }: any) => (
            <span>{Number(record.quantity) * Number(record.product.price)}</span>
        ),
    },
    {
        title: t('cart.column.action'),
        key: 'action',
        customRender: ({ record }: any) => <ButtonDelete id={record.id} />,
    },
]

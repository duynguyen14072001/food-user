import type { ColumnTable } from '@/interface'
import i18n from '@/lang'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('products.list.column.name'),
        key: 'name',
        dataIndex: 'name',
    },
    {
        title: t('products.list.column.description'),
        key: 'description',
        dataIndex: 'description',
    },
    {
        title: t('products.list.column.price'),
        key: 'price',
        dataIndex: 'price',
    },
]

import type { ColumnTable } from '@/interface'
import i18n from '@/lang'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('categories.list.column.name'),
        key: 'name',
        dataIndex: 'name',
    },
]

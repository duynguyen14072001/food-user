<script lang="ts" setup>
import { PAYLOAD_ALL } from '@/helpers'
import { useCartStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { columns } from './shared'

const loading = ref()
const { t } = useI18n()
const cartStore = useCartStore()

const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record: any) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
}

onMounted(async () => {
    loading.value = true
    await cartStore.list(PAYLOAD_ALL)
    loading.value = false
})
</script>

<template>
    <a-spin tip="Loading..." :spinning="loading">
        <a-empty v-if="!cartStore.getCart.data?.length">
            <template #description>
                <span>{{ t('cart.no_data') }} </span>
            </template>
        </a-empty>
        <a-table
            v-if="cartStore.getCart.data"
            :dataSource="cartStore.getCart.data.map((item: any) => ({ ...item, key: item.id }))"
            :columns="columns"
            :pagination="false"
            :row-selection="rowSelection"
        />
    </a-spin>
</template>

<style lang="scss" scoped></style>

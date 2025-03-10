<script lang="ts" setup>
import { INITIAL_QUERY } from '@/helpers'
import { useOrderStore } from '@/stores'
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue3-i18n'
import { columns, PER_PAGE_ORDER } from './shared'

const { t } = useI18n()
const query = ref({ ...INITIAL_QUERY, per_page: PER_PAGE_ORDER })
const loading = ref()
const orderStore = useOrderStore()

const onChangePage = (pageValue: number) => {
    loading.value = true
    query.value = {
        ...query.value,
        page: pageValue,
    }
    loading.value = false
}

watchEffect(() => {
    loading.value = true
    orderStore.list(query.value)
    loading.value = false
})
</script>

<template>
    <a-spin tip="Loading..." :spinning="loading">
        <h1>{{ t('order.title') }}</h1>
        <a-table
            v-if="orderStore.getOrder.data?.length"
            :dataSource="orderStore.getOrder.data.map((item: any) => ({ ...item, key: item.id }))"
            :columns="columns"
            :pagination="false"
        />
        <a-pagination
            v-if="orderStore.getOrder"
            :total="orderStore.getOrder.total"
            :page-size="+orderStore.getOrder.perPage"
            :current="Number(orderStore.getOrder.page)"
            show-less-items
            @change="onChangePage"
        />
    </a-spin>
</template>

<style lang="scss" scoped>
.ant-pagination {
    margin: 20px 0 0;
}
</style>

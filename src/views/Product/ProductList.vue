<script lang="ts" setup>
import { INITIAL_QUERY, PAGE_FIRST } from '@/helpers'
import type { Product } from '@/interface'
import { useProductStore } from '@/stores'
import { onMounted, ref, watchEffect } from 'vue'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
const productStore = useProductStore()
const loading = ref()
const query = ref(INITIAL_QUERY)
const listProduct = ref<Product[]>([])

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
            scrollY + innerHeight >= scrollHeight - 50 &&
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
        <product-item v-for="(item, index) in listProduct" :item="item" :key="index" />
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

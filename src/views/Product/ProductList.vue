<script lang="ts" setup>
import { INITIAL_QUERY, PAGE_FIRST } from '@/helpers'
import type { Product } from '@/interface'
import { useProductStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { FLAG_SHOW, PER_PAGE_PRODUCTS } from './shared'
import { useDebounceFn } from '@vueuse/core'

const { t } = useI18n()
const productStore = useProductStore()
const loading = ref()
const page = ref(PAGE_FIRST)
const query = ref({ ...INITIAL_QUERY, per_page: PER_PAGE_PRODUCTS })
const listProduct = ref<Product[]>([])
const maxItems = ref()

const handleSearch = useDebounceFn(async (e: any) => {
    loading.value = true
    query.value = {
        ...query.value,
        search: e.target.value,
    }
    page.value = PAGE_FIRST
    await getProducts(PAGE_FIRST)
    productStore.getProduct.data && (listProduct.value = [...productStore.getProduct.data])
    loading.value = false
}, 1000)

const getProducts = async (pageCurrent: number) => {
    await productStore.list({
        ...query.value,
        page: pageCurrent,
        filters: [
            {
                key: 'show_flag',
                data: FLAG_SHOW,
            },
        ],
    })
    maxItems.value =
        pageCurrent >=
        Math.ceil(Number(productStore.getProduct.total) / Number(productStore.getProduct.perPage))
}

const loadMoreProducts = async () => {
    loading.value = true
    page.value++
    await getProducts(page.value)
    productStore.getProduct.data && listProduct.value.push(...productStore.getProduct.data)
    loading.value = false
}

onMounted(async () => {
    loading.value = true
    await getProducts(page.value)
    productStore.getProduct.data && (listProduct.value = [...productStore.getProduct.data])
    loading.value = false
})
</script>

<template>
    <a-spin class="loading" tip="Loading..." :spinning="loading">
        <div class="heading">
            <h2>{{ t('products.title') }}</h2>
            <a-input-search
                style="width: 400px"
                @change="handleSearch"
                :placeholder="t('products.placeholder')"
            />
        </div>
        <div class="content">
            <product-item v-for="(item, index) in listProduct" :item="item" :key="index" />
        </div>
        <div v-if="!maxItems" class="btn_load_more">
            <a-button @click="loadMoreProducts">{{ t('products.btn_load_more') }}</a-button>
        </div>
    </a-spin>
</template>

<style lang="scss" scoped>
.heading {
    position: fixed;
    background-color: var(--vt-c-white);
    width: calc(100% - 120px);
    top: 100px;
    z-index: 1000;
    padding: 20px 0;
}

.content {
    display: grid;
    padding: 100px 0 0;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.btn_load_more {
    margin: 30px auto;
    width: fit-content;
}
</style>

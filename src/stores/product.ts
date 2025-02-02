import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/product'
import type { Product, ProductResult, ParamsList } from '@/interface'

export const useProductStore = defineStore('product', () => {
    const products = ref({} as ProductResult)
    const productDetail = ref({} as Product)
    const query = ref<ParamsList>({})

    const list = async (payload: Record<string, any>) => {
        try {
            const data = await API.list(payload)
            query.value = payload
            return (products.value = data.result)
        } catch (error: any) {
            return error
        }
    }

    const detail = async (slug: string) => {
        try {
            const { result, status_code } = await API.detail(slug)
            productDetail.value = result
            return { ...productDetail.value, status_code }
        } catch (error: any) {
            return error
        }
    }

    const getProduct = computed(() => products.value)
    const getProductDetail = computed(() => productDetail.value)

    return {
        getProduct,
        getProductDetail,
        list,
        detail,
    }
})

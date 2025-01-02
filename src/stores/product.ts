import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/product'
import { INITIAL_QUERY } from '@/helpers'
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

    const detail = async (id: number) => {
        try {
            const { result, status_code } = await API.detail(id)
            productDetail.value = result
            return { ...productDetail.value, status_code }
        } catch (error: any) {
            return error
        }
    }

    const create = async (payload: Record<string, any>) => {
        try {
            const result = await API.create(payload)
            await list({ ...INITIAL_QUERY })
            return result
        } catch (error: any) {
            return error
        }
    }

    const update = async (payload: Record<string, any>, id: number) => {
        try {
            const result = await API.update(payload, id)
            await list(query.value)
            return result
        } catch (error: any) {
            return error
        }
    }

    const remove = async (id: number) => {
        try {
            const result = await API.remove(id)
            await list({ ...INITIAL_QUERY })
            return result
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
        update,
        create,
        remove,
    }
})

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/category'
import { INITIAL_QUERY } from '@/helpers'
import type { Category, CategoryResult, ParamsList } from '@/interface'

export const useCategoryStore = defineStore('category', () => {
    const categories = ref({} as CategoryResult)
    const categoryDetail = ref({} as Category)
    const query = ref<ParamsList>({})

    const list = async (payload: Record<string, any>) => {
        try {
            const data = await API.list(payload)
            query.value = payload
            return (categories.value = data.result)
        } catch (error: any) {
            return error
        }
    }

    const detail = async (id: number) => {
        try {
            const { result } = await API.detail(id)
            return (categoryDetail.value = result)
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

    const getCategories = computed(() => categories.value)
    const getCategoryDetail = computed(() => categoryDetail.value)

    return {
        getCategories,
        getCategoryDetail,
        list,
        detail,
        update,
        create,
        remove,
    }
})

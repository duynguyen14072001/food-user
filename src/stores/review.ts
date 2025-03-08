import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/review'
import { INITIAL_QUERY } from '@/helpers'
import type { ReviewResult, ParamsList } from '@/interface'

export const useReviewStore = defineStore('review', () => {
    const reviews = ref({} as ReviewResult)
    const query = ref<ParamsList>({})

    const list = async (payload: Record<string, any>) => {
        try {
            const data = await API.list(payload)
            query.value = payload
            return (reviews.value = data.result)
        } catch (error: any) {
            return error
        }
    }

    const create = async (payload: Record<string, any>) => {
        try {
            const result = await API.create(payload)
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
            return result
        } catch (error: any) {
            return error
        }
    }

    const getReviews = computed(() => reviews.value)

    return {
        getReviews,
        list,
        update,
        create,
        remove,
    }
})

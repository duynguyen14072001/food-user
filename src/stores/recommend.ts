import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/recommend'
import type { ParamsList, RecommendResult } from '@/interface'

export const useRecommendStore = defineStore('recommend', () => {
    const recommends = ref({} as RecommendResult)
    const query = ref<ParamsList>({})

    const list = async (payload: Record<string, any>) => {
        try {
            const data = await API.list(payload)
            query.value = payload
            return (recommends.value = data.result)
        } catch (error: any) {
            return error
        }
    }

    const getRecommends = computed(() => recommends.value)

    return {
        getRecommends,
        list,
    }
})

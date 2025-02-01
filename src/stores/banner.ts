import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/banner'
import type { ParamsList, BannerResult } from '@/interface'

export const useBannerStore = defineStore('banner', () => {
    const banners = ref({} as BannerResult)
    const query = ref<ParamsList>({})

    const list = async (payload: Record<string, any>) => {
        try {
            const data = await API.list(payload)
            query.value = payload
            return (banners.value = data.result)
        } catch (error: any) {
            return error
        }
    }

    const getBanners = computed(() => banners.value)

    return {
        getBanners,
        list,
    }
})

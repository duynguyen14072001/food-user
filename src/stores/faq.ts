import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/faq'
import type { ParamsList, FaqResult } from '@/interface'

export const useFaqStore = defineStore('faq', () => {
    const faqs = ref({} as FaqResult)
    const query = ref<ParamsList>({})

    const list = async (payload: Record<string, any>) => {
        try {
            const data = await API.list(payload)
            query.value = payload
            return (faqs.value = data.result)
        } catch (error: any) {
            return error
        }
    }

    const getFaqs = computed(() => faqs.value)

    return {
        getFaqs,
        list,
    }
})

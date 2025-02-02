import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/cart'
import { INITIAL_QUERY } from '@/helpers'
import type { CartResult, ParamsList } from '@/interface'

export const useCartStore = defineStore('cart', () => {
    const carts = ref({} as CartResult)
    const query = ref<ParamsList>({})

    const list = async (payload: Record<string, any>) => {
        try {
            const data = await API.list(payload)
            query.value = payload
            return (carts.value = data.result)
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

    const getCart = computed(() => carts.value)

    return {
        getCart,
        list,
        update,
        create,
        remove,
    }
})

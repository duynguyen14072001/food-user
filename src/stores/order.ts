import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/order'
import type { Order, OrderResult, ParamsList } from '@/interface'

export const useOrderStore = defineStore('order', () => {
    const orders = ref({} as OrderResult)
    const query = ref<ParamsList>({})
    const orderDetail = ref({} as Order)

    const list = async (payload: Record<string, any>) => {
        try {
            const data = await API.list(payload)
            query.value = payload
            return (orders.value = data.result)
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

    const createVNPayUrl = async (payload: Record<string, any>) => {
        try {
            const result = await API.createVNPayUrl(payload)
            return result
        } catch (error: any) {
            return error
        }
    }

    const verifyVNPay = async (payload: Record<string, any>) => {
        try {
            const result = await API.verifyVNPay(payload)
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

    const detail = async (id: number) => {
        try {
            const { result, status_code } = await API.detail(id)
            orderDetail.value = result
            return { ...orderDetail.value, status_code }
        } catch (error: any) {
            return error
        }
    }

    const detailReturn = async (id: number) => {
        try {
            const { result, status_code } = await API.detailReturn(id)
            orderDetail.value = result
            return { ...orderDetail.value, status_code }
        } catch (error: any) {
            return error
        }
    }

    const getOrder = computed(() => orders.value)
    const getOrderDetail = computed(() => orderDetail.value)

    return {
        getOrder,
        list,
        update,
        getOrderDetail,
        createVNPayUrl,
        verifyVNPay,
        detail,
        create,
        detailReturn,
    }
})

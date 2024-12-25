import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/admin'
import { INITIAL_QUERY } from '@/helpers'
import type { ParamsList, AdminResult, Admin } from '@/interface'

export const useAdminStore = defineStore('admin', () => {
    const admins = ref({} as AdminResult)
    const admin = ref({} as Admin)
    const query = ref<ParamsList>({})

    const list = async (payload: Record<string, any>) => {
        try {
            const data = await API.list(payload)
            query.value = payload
            return (admins.value = data.result)
        } catch (error: any) {
            return error
        }
    }

    const detail = async (id: number) => {
        try {
            const { result } = await API.detail(id)
            return (admin.value = result)
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

    const getAdmins = computed(() => admins.value)
    const getAdmin = computed(() => admin.value)

    return {
        getAdmins,
        getAdmin,
        list,
        detail,
        update,
        create,
        remove,
    }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/auth'
import type { AuthResponse, User } from '@/interface'
import { ACCESS_TOKEN, STATUS_CODE_SUCCESS } from '@/helpers'

export const useAuthStore = defineStore('auth', () => {
    const me = ref({} as User)

    const login = async (payload: any | {}) => {
        try {
            const data = await API.login(payload)
            if (data.status_code === STATUS_CODE_SUCCESS) {
                const { result } = data
                setUser(result)
            }

            return data
        } catch (error: any) {
            return error
        }
    }

    const signup = async (payload: any | {}) => {
        try {
            return await API.signup(payload)
        } catch (error: any) {
            return error
        }
    }

    const logout = async () => {
        try {
            localStorage.clear()
            return true
        } catch (error: any) {
            return error
        }
    }

    const updateInfo = async (payload: any | {}) => {
        try {
            await API.updateInfo(payload)
            const { result } = await getMe()
            localStorage.setItem('user', JSON.stringify(result))
        } catch (error: any) {
            return error
        }
    }

    const forgotPassword = async (payload: any | {}) => {
        try {
            return await API.forgotPassword(payload)
        } catch (error: any) {
            return error
        }
    }

    const resetPassword = async (payload: any | {}) => {
        try {
            return await API.resetPassword(payload)
        } catch (error: any) {
            return error
        }
    }

    const setUser = async ({ me: user, access_token }: AuthResponse) => {
        if (access_token) {
            localStorage.setItem(ACCESS_TOKEN, access_token)
            localStorage.setItem('user', JSON.stringify(user))
            me.value = user
        }
    }

    const getMe = async () => {
        try {
            const data = await API.me()
            me.value = data.result
            return data
        } catch (error: any) {
            return error
        }
    }

    const getUser = computed(() => me.value)

    return {
        me,
        getUser,
        login,
        logout,
        getMe,
        signup,
        updateInfo,
        forgotPassword,
        resetPassword,
    }
})

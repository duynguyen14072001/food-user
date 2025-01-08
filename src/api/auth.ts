import request from '@/api/config'
import type { ResponseResult } from '@/interface'

export function login(payload: Record<string, any>) {
    const url = 'auth/login'
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'POST',
        data: payload,
    })
}

export function signup(payload: Record<string, any>) {
    const url = 'auth/signup'
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'POST',
        data: payload,
    })
}

export function changePassword(payload: Record<string, any>) {
    const url = 'auth/change-password'
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'PATCH',
        data: payload,
    })
}

export const logout = () => {
    const url = 'auth/logout'
    return request({
        url,
        method: 'POST',
    })
}

export const me = () => {
    const url = 'auth/me'
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'GET',
    })
}

export function forgotPassword(payload: object | {}) {
    const url = 'auth/forgot-password'
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'PATCH',
        data: payload,
    })
}

export function resetPassword(payload: object | {}) {
    const url = 'auth/reset-password'
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'POST',
        data: payload,
    })
}

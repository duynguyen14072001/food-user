import request from '@/api/config'
import type { ResponseResult, ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) => {
    const url = '/orders'
    return request<ResponseList, ResponseList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const create = (payload: Record<string, any>) => {
    const url = '/orders'
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'POST',
        data: payload,
    })
}

export const update = (payload: Record<string, any>, id: number) => {
    const url = `/orders/${id}`
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'PATCH',
        data: payload,
    })
}

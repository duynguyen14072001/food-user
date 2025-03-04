import request from '@/api/config'
import type { ResponseResult, ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) => {
    const url = '/carts'
    return request<ResponseList, ResponseList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const upsert = (payload: Record<string, any>) => {
    const url = '/carts'
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'POST',
        data: payload,
    })
}

export const update = (payload: Record<string, any>, id: number) => {
    const url = `/carts/${id}`
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'PATCH',
        data: payload,
    })
}

export const remove = (payload: Record<string, any>) => {
    const url = `/carts`
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'DELETE',
        data: payload,
    })
}

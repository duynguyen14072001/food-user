import request from '@/api/config'
import type { ResponseResult, ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) => {
    const url = '/products'
    return request<ResponseList, ResponseList>({
        url,
        method: 'GET',
        params: payload,
    })
}

export const detail = (slug: string) => {
    const url = `/products/${slug}`
    return request<ResponseResult, ResponseResult>({
        url,
        method: 'GET',
    })
}

import request from '@/api/config'
import type { ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) => {
    const url = '/banners'
    return request<ResponseList, ResponseList>({
        url,
        method: 'GET',
        params: payload,
    })
}

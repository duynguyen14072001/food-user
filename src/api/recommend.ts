import request from '@/api/config'
import type { ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) => {
    const url = '/recommends'
    return request<ResponseList, ResponseList>({
        url,
        method: 'GET',
        params: payload,
    })
}

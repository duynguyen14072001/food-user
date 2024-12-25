import request from '@/api/config'
import type { ImageResponse } from '@/interface'

export const uploadImage = ({ media, type = 'avatar', sub }: any) => {
    try {
        const formData = new FormData()
        formData.append('file', media, media.name)
        const url = `/uploads?type=chapter&sub=${sub}`
        request.defaults.headers.common['Content-Type'] = 'multipart/form-data'
        return request<ImageResponse>({
            url,
            method: 'POST',
            data: formData,
        })
    } catch (err) {
        return err
    } finally {
        request.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8'
    }
}

import type { Result } from './commonInterface'

export interface Banner {
    id: number
    image_url: string
    number: number
}

export interface BannerResult extends Result {
    data?: Banner[]
}

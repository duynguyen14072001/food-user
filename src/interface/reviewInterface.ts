import type { Result } from './commonInterface'

export interface Review {
    id: number
    user_id: number
    product_id: number
    star_number: number
    comment: string
}

export interface ReviewResult extends Result {
    data?: Review[]
}

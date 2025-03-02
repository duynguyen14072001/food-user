import type { Result } from './commonInterface'

export interface Cart {
    id: number
    user_id: number
    product_id: number
    quantity: number
}

export interface CartResult extends Result {
    data?: Cart[]
}

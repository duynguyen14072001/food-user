import type { Result } from './commonInterface'

export interface Order {
    id: number
    user_id: number
    quantity: number
    status: number
    shipping_address: string
}

export interface FormStateOrderDetail {
    product_id: number
    quantity: number
    amount: number
}

export interface OrderResult extends Result {
    data?: Order[]
}

export interface FormStateOrder {
    id?: number
    user_id: number
    status: number
    shipping_address: string
}

import type { Result } from './commonInterface'

export interface Product {
    id: number
    name: string
    image_url: string
    description: string
    price: number
    created_at: string
}

export interface ProductResult extends Result {
    data?: Product[]
}

export interface FormStateProduct {
    id?: number
    name: string
    image_url: string
    description: string
    price: number | null
    category_id: number | string[]
}

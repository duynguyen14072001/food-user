import type { Result } from './commonInterface'

export interface Product {
    id: number
    name: string
    image_url: string
    image_urls: string[]
    description: string
    price: number
    created_at: string
    category_names: string[]
}

export interface ProductResult extends Result {
    data?: Product[]
}

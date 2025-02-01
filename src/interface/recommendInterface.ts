import type { Result } from './commonInterface'
import type { Product } from './productInterface'

export interface Recommend {
    id: number
    product_id: number
    number: number
    product: Product
}

export interface RecommendResult extends Result {
    data?: Recommend[]
}

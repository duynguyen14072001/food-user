import type { Result } from './commonInterface'

export interface Category {
    id: number
    name: string
}

export interface CategoryResult extends Result {
    data?: Category[]
}

export interface FormStateCategory {
    name: string
}

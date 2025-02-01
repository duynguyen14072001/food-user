import type { Result } from './commonInterface'

export interface Faq {
    id: number
    question: string
    answer: string
    number: number
}

export interface FaqResult extends Result {
    data?: Faq[]
}

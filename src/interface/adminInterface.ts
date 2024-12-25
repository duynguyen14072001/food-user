import type { Result } from './commonInterface'

export interface Admin {
    id: number
    mail_address: string
    role: number
}

export interface AdminResult extends Result {
    data?: Admin[]
}

export interface FormAdminState {
    mail_address: string
    role: number | string
}

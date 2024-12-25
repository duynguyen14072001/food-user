import type { PaginateParams, ResponseResult } from './commonInterface'

export interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    created_at?: string
    updated_at?: string
}

export interface UserDetail {
    id: number
    username: string
    mail_address: string
    created_at: string
}

export interface UserSearchDto {
    search: string
}

export interface UserCreateDto {
    username: string
    mail_address: string
}

export interface ResponseUserList extends ResponseResult {
    data?: User
}

export interface PaginateUserParams extends PaginateParams {
    data?: {
        id: number
        full_name: string
        tel: string
        created_at: string
        first_experience_date: string
        last_session_date: string
        is_active: string
        plane_type: string
    }[]
}

import type { ResponseResult } from './commonInterface'

export interface User {
    id: number
    name: string
    email: string
    phone_number: string
    image_url: string
}

export interface UserDetail {
    id: number
    name: string
    mail_address: string
    phone_number: string
    image_url: string
    created_at: string
}

export interface UserCreateDto {
    name: string
    mail_address: string
    phone_number: string
    image_url: string
    old_password: string
    new_password: string
}

export interface ResponseUserList extends ResponseResult {
    data?: User
}

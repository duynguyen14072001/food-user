import type { User } from './userInterface'

export interface LoginDto {
    mail_address: string
    password: string
}

export interface SignupTermDto {
    mail_address: string
    first_name: string
    last_name: string
}

export interface SignupDto {
    [k: string]: any
}

export interface AuthResponse {
    access_token: string
    expires_in: string
    token_type: string
    me: User
}

export interface ChangePasswordDto {
    old_password: string
    new_password: string
    conf_password: string
}

export interface ForgotPasswordDto {
    mail_address: string
}

export interface ResetPasswordDto {
    new_password: string
    conf_password: string
}

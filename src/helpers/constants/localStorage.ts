export const ACCESS_TOKEN = 'access_token'

export const USER = 'user'

export const getToken = () => localStorage.getItem(ACCESS_TOKEN)

export const getUser = () => localStorage.getItem(USER)

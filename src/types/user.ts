import type { ApiResponse } from "./general"

export interface LoginInput {
    userName: string
    passWord: string
}

export interface AccessToken {
    access_token: string
    refresh_token: string
    expire_refresh_token: string
    expire_access_token: string
    token_type: string
    expires_in: number
}

export interface LoginData {
    userName: string
    accessToken: AccessToken
}

export type ILoginResponse = ApiResponse<LoginData>

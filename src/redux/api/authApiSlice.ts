import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"
import type { LoginInput, ILoginResponse } from "@/types/user"

export const authApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery: customFetchBase,
    endpoints: builder => ({
        loginUser: builder.mutation<ILoginResponse, LoginInput>({
            query(data) {
                return {
                    url: "Security/UserLogin/Login",
                    method: "POST",
                    body: data,
                }
            },
        }),
    }),
})

export const { useLoginUserMutation } = authApiSlice

import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query"

import { Mutex } from "async-mutex"

import {
    loggedOut,
    selectExpireAccessToken,
    selectRefreshToken,
    selectUsername,
    tokenReceived,
} from "../slices/auth-slice"
import type { ILoginResponse } from "@/types/user"
import { type RootState } from "@/app/store"
import type { ApiResponse } from "@/types/general"

// create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_ENDPOINT,
    timeout: 1000000,
    prepareHeaders: (headers, { getState }) => {
        headers.set("Accept", "application/json")
        const {
            accessToken: { access_token },
        } = (getState() as RootState).auth.accessData || {}

        if (access_token) {
            headers.set("Authorization", `Bearer ${access_token}`)
        }
        return headers
    },
})

export const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    const rootStore = api.getState() as RootState
    const expireAccessToken = selectExpireAccessToken(rootStore)

    const authorizedError = result.error && result.error.status === 401
    const accessTokenExpired =
        new Date(expireAccessToken).getTime() < new Date().getTime()

    if (accessTokenExpired || authorizedError) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshToken = selectRefreshToken(rootStore)
                const userName = selectUsername(rootStore)

                const refreshResult = await baseQuery(
                    {
                        url: "Security/UserLogin/RefreshToken",
                        method: "POST",
                        body: {
                            userName,
                            refreshToken,
                        },
                    },
                    api,
                    extraOptions,
                )

                if (refreshResult?.data) {
                    const refreshData = refreshResult.data as ILoginResponse

                    if (refreshData?.data && !refreshData?.hasError) {
                        api.dispatch(tokenReceived(refreshData.data))

                        if (authorizedError) {
                            // retry the initial query
                            result = await baseQuery(args, api, extraOptions)
                        }
                    }
                } else {
                    const { error } = refreshResult.error
                        ?.data as ApiResponse<any>

                    if (error !== "توکن هنوز اعتبار دارد") {
                        api.dispatch(loggedOut())
                    }
                }
            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

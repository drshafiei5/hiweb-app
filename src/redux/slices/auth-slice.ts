import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "@/app/createAppSlice"
import type { LoginData } from "@/types/user"

export interface AuthSliceState {
    accessData: LoginData
}

const initialState: AuthSliceState = {
    accessData: {
        userName: "",
        accessToken: {
            access_token: "",
            refresh_token: "",
            expire_refresh_token: "",
            expire_access_token: "",
            token_type: "",
            expires_in: 0,
        },
    },
}

export const authSlice = createAppSlice({
    name: "auth",
    initialState,
    reducers: create => ({
        loggedOut: () => initialState,
        tokenReceived: create.reducer(
            (state, action: PayloadAction<LoginData>) => {
                state.accessData = action.payload
            },
        ),
    }),
    selectors: {
        selectUsername: auth => auth?.accessData?.userName,
        selectToken: auth => auth.accessData?.accessToken?.access_token,
        selectRefreshToken: auth => auth.accessData?.accessToken?.refresh_token,
        selectExpireAccessToken: auth =>
            auth.accessData?.accessToken?.expire_access_token,
    },
})

export const { tokenReceived, loggedOut } = authSlice.actions
export const {
    selectToken,
    selectUsername,
    selectRefreshToken,
    selectExpireAccessToken,
} = authSlice.selectors

import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import { authApiSlice } from "@/redux/api/authApiSlice"
import { authSlice } from "@/redux/slices/auth-slice"
import { productApiSlice } from "@/redux/api/productApiSlice"

import { persistStore } from "redux-persist"
import persistReducer from "redux-persist/es/persistReducer"
import storage from "redux-persist/lib/storage"

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
    authApiSlice,
    authSlice,
    productApiSlice,
)

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware({
                serializableCheck: false,
            }).concat([authApiSlice.middleware, productApiSlice.middleware])
        },
    })

    // configure listeners using the provided defaults
    // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
    setupListeners(store.dispatch)
    return store
}

export const store = makeStore()
export const persistor = persistStore(store)

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>

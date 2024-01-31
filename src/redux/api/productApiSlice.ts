import type {
    IAddProductResponse,
    IGetProductsInput,
    IGetProductsResponse,
} from "@/types/product"
import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"

let addedProducts = 0;
const pageSize = import.meta.env.VITE_PAGE_SIZE

export const productApiSlice = createApi({
    baseQuery: customFetchBase,
    reducerPath: "productApi",
    tagTypes: ["Products"],
    endpoints: builder => ({
        createProduct: builder.mutation<IAddProductResponse, FormData>({
            query(post) {
                addedProducts++;
                return {
                    url: "General/Product/AddProduct",
                    method: "POST",
                    credentials: "include",
                    body: post,
                }
            },
            invalidatesTags: [{ type: "Products", id: "LIST" }],
        }),
        getProducts: builder.query<IGetProductsResponse, IGetProductsInput>({
            query: ({ count = pageSize, page = 1 }) =>
                `General/Product/ProductList?count=${count}&skip=${(page - 1) * count}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            merge: (currentCache, newItems) => {
                newItems.data.list.forEach(newItem => {
                    if (
                        currentCache.data.list.findIndex(
                            currentItem => currentItem.id === newItem.id,
                        ) === -1
                    ) {
                        currentCache.data.list.push(newItem)
                    }
                })
            },
            forceRefetch({ currentArg, previousArg, endpointState }) {
                const count = currentArg?.count || pageSize

                if (endpointState?.data && currentArg?.page) {
                    const {
                        data: { totalRowCount },
                    } = endpointState.data as IGetProductsResponse

                    return (
                        currentArg.page !== previousArg?.page &&
                        totalRowCount + addedProducts >= (currentArg.page - 1) * count
                    )
                }

                return false
            },
        }),
    }),
})

export const { useGetProductsQuery, useCreateProductMutation } = productApiSlice

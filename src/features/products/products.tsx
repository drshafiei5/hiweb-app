import ListView from "@/components/list-view"
import Product from "./product"
import { useGetProductsQuery } from "@/redux/api/productApiSlice"

import emptyProducts from "@/assets/images/empty-product.png"

import Button from "@/components/button"
import { useEffect, useState } from "react"
import useDetectScrolledToBottom from "@/hooks/use-detect-scrolled-to-bottom"

const EmptyProducts = () => {
    return (
        <div className="flex flex-col gap-3 items-center justify-center w-full min-h-screen">
            <img
                alt="عدم وجود کالا"
                src={emptyProducts}
                className="object-contain"
            />
            <span className="text-gray-700">محصول خود را وارد نمایید.</span>
        </div>
    )
}

const Products = () => {
    const [page, setPage] = useState(1)
    const { isBottom } = useDetectScrolledToBottom()

    const { isLoading, data, isError, refetch } = useGetProductsQuery({
        page,
    })

    const { totalRowCount, list } = data?.data || {}

    useEffect(() => {
        if (isBottom && (totalRowCount || 0) >= 12 * page) {
            setPage(prevPage => prevPage + 1)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBottom])

    return (
        <div className="">
            <ListView
                loading={isLoading}
                data={list}
                error={isError}
                renderRow={item => <Product product={item} />}
                LoadingComponent={<p>لطفا صبور باشید...</p>}
                listClasses="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-4 md:py-8 xl:py-12"
                ErrorComponent={
                    <div>
                        <p>خطایی وجود دارد</p>
                        <div className="w-44">
                            <Button
                                intent={"success"}
                                onClick={refetch}
                                className="px-5"
                            >
                                تلاش دوباره
                            </Button>
                        </div>
                    </div>
                }
                ListEmptyComponent={<EmptyProducts />}
            />
        </div>
    )
}

export default Products

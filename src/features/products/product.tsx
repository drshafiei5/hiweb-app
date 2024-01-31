import type { IProduct } from "@/types/product"
import { memo } from "react"

interface ProductProps {
    product: IProduct
}

const Product = memo(
    ({ product }: ProductProps) => {
        return (
            <div className="bg-white border rounded-md shadow-md overflow-hidden">
                <div className="flex justify-center">
                    <img
                        src={product.imageUrl}
                        className="h-48 w-full object-cover"
                        alt={product.title}
                        loading="lazy"
                    />
                </div>
                <div className="px-3 pb-6 pt-2">
                    <div>
                        <h5 className="text-md font-semibold tracking-tight text-gray-900">
                            {product.title}
                        </h5>
                        <p className="text-gray-600 text-sm line-clamp-2 text-pretty mt-2">
                            {product.description}
                        </p>
                    </div>
                    <div className="mt-2 flex justify-between">
                        <div className="flex items-center mt-2.5">
                            <span className="text-sm ">قیمت:</span>
                            <span className="text-sm font-semibold mr-2">
                                {new Intl.NumberFormat("fa-IR").format(
                                    product.price,
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    (prevProps: ProductProps, nextProps: ProductProps) => {
        return prevProps.product.id === nextProps.product.id
    },
)

export default Product

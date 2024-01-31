import AddProduct from "./add-product"

const ProductsHeader = () => {
    return (
        <div className="flex justify-between items-center flex-1">
            <h1 className="font-bold">لیست محصولات</h1>
            <AddProduct />
        </div>
    )
}

export default ProductsHeader

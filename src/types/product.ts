import type { ApiResponse } from "./general"

export interface IProduct {
    id: string
    title: string
    price: number
    imageUrl: string
    description: string
    rate: number
    view: number
}

export interface IGetProductsInput {
    count?: number
    page?: number
}

export interface GetProductsData {
    totalRowCount: number
    list: IProduct[]
    exception: null
}

export interface AddProduct {
    ProductTitle: string
    ProductPrice: number
    Description: string
}

export interface AddProductInput extends AddProduct {
    file?: string
}

export interface AddProductParams extends AddProduct{
    file?: FileList
}


export type IGetProductsResponse = ApiResponse<GetProductsData>
export type IAddProductResponse = ApiResponse<IProduct>

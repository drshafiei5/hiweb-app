import Button from "@/components/button"
import Input from "@/components/input"
import Modal from "@/components/modal"
import TextArea from "@/components/textarea"
import {
    useCreateProductMutation,
    useGetProductsQuery,
} from "@/redux/api/productApiSlice"
import type { AddProductParams } from "@/types/product"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const AddProduct = () => {
    const [addProductModal, setAddProductModal] = useState(false)
    const { refetch } = useGetProductsQuery({})

    const [addProduct, { isSuccess, isError }] = useCreateProductMutation()

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddProductParams>()

    const onSubmit = (values: AddProductParams) => {
        const { file, ...params } = values
        const formData = new FormData()

        formData.append("file", file![0])

        for (const [key, val] of Object.entries(params))
            formData.append(key, String(val))
        addProduct(formData)
    }

    useEffect(() => {
        if (isSuccess) {
            refetch()
            setAddProductModal(false)
            reset()
        }
    }, [isSuccess])

    return (
        <>
            <Button
                className="w-36 px-2 md:px-5 flex items-center justify-center gap-2 md:w-60 text-sm md:text-md"
                intent="success"
                onClick={() => setAddProductModal(true)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.75}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>

                <span>افزودن محصول</span>
            </Button>
            <Modal
                onClose={() => setAddProductModal(false)}
                isOpen={addProductModal}
            >
                {isError && (
                    <span className="block text-center text-red-500">
                        خطایی در ارسال محصول وجود دارد.
                    </span>
                )}
                <form
                    autoComplete="off"
                    className="w-full md:w-1/2 mx-auto"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        name="ProductTitle"
                        label="نام محصول"
                        placeholder="نام محصول..."
                        errors={errors}
                        register={register}
                        registerOptions={{
                            required: {
                                value: true,
                                message: "ورود نام محصول الزامی می باشد.",
                            },
                        }}
                    />

                    <Input
                        name="ProductPrice"
                        label="قیمت محصول"
                        placeholder="قیمت محصول..."
                        errors={errors}
                        register={register}
                        registerOptions={{
                            required: {
                                value: true,
                                message: "ورود قیمت محصول الزامی می باشد.",
                            },
                            validate: value => {
                                if (!/^\d+$/.test(value as string)) {
                                    return "لطفا مقدار درست را وارد کنید"
                                }
                            },
                        }}
                    />

                    <TextArea
                        name="Description"
                        type="password"
                        label="توضیحات"
                        placeholder="توضیحات..."
                        errors={errors}
                        register={register}
                        rows={4}
                        registerOptions={{
                            required: {
                                value: true,
                                message: "ورود توضیحات الزامی می باشد.",
                            },
                        }}
                    />

                    <Input
                        name="file"
                        dir="ltr"
                        type="file"
                        placeholder="انتخاب فایل"
                        label="انتخاب فایل"
                        errors={errors}
                        register={register}
                        className="file:border-0 file:bg-gray-100 file:me-4 file:py-2 file:px-4 p-0"
                        registerOptions={{
                            required: {
                                value: true,
                                message: "ورود قیمت محصول الزامی می باشد.",
                            },
                        }}
                    />

                    <div className="mt-10 flex">
                        <Button
                            type="button"
                            intent={"clear"}
                            onClick={() => {
                                reset()
                                setAddProductModal(false)
                            }}
                        >
                            انصراف
                        </Button>
                        <Button type="submit" intent={"success"}>
                            ثبت محصول
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default AddProduct

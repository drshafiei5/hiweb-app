import { useForm } from "react-hook-form"
import { FadeLoader } from "react-spinners"

import identity from "@/assets/images/identity.png"
import logo from "@/assets/images/logo.png"

import Button from "@/components/button"
import Input from "@/components/input"

import type { LoginInput } from "@/types/user"

import { useAppDispatch } from "@/app/hooks"
import { tokenReceived } from "@/redux/slices/auth-slice"
import { useLoginUserMutation } from "@/redux/api/authApiSlice"
import Status from "@/components/status"
import { useNavigate } from "react-router-dom"
import useTimeout from "@/hooks/use-timeout"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>()

    const [loginUser, { isLoading, isSuccess, data, isError, reset }] =
        useLoginUserMutation()

    const onSubmit = (values: LoginInput) => {
        loginUser(values)
    }

    const renderContent = () => {
        if (isLoading || isSuccess || isError) {
            return (
                <div className="flex flex-col items-center mt-10">
                    {isSuccess && (
                        <Status
                            type="success"
                            message="ورود شما با موفقیت انجام شد."
                        />
                    )}

                    {isError && (
                        <Status
                            type="error"
                            message="ورود شما موفقیت آمیز نبود."
                        />
                    )}

                    <FadeLoader color="#5C5C5C" />
                </div>
            )
        }

        return (
            <>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <Input
                        name="userName"
                        label="نام کاربری"
                        placeholder="نام کاربری..."
                        errors={errors}
                        register={register}
                        registerOptions={{
                            required: {
                                value: true,
                                message: "ورود نام کاربری الزامی می باشد.",
                            },
                        }}
                    />

                    <Input
                        name="passWord"
                        type="password"
                        label="کلمه عبور"
                        placeholder="کلمه عبور..."
                        errors={errors}
                        register={register}
                        registerOptions={{
                            required: {
                                value: true,
                                message: "ورود رمز کاربری الزامی می باشد.",
                            },
                        }}
                    />

                    <div className="mt-10">
                        <Button type="submit" intent={"success"}>
                            ورود
                        </Button>
                    </div>
                </form>
            </>
        )
    }

    useTimeout(
        () => {
            if (data?.data) {
                dispatch(tokenReceived(data.data))
                navigate("/dashboard")
            }
        },
        data ? 2000 : null,
    )

    useTimeout(
        () => {
            if (isError) {
                reset()
            }
        },
        isError ? 2000 : null,
    )

    return (
        <div className="w-full flex items-center">
            <div className="w-1/2 md:block hidden">
                <figure className="max-w-2xl mx-auto">
                    <img
                        src={identity}
                        alt="identity"
                        className="h-auto max-w-full"
                    />
                </figure>
            </div>
            <div className="md:w-1/2 shadow-none flex flex-col w-4/5 mx-auto md:mx-0">
                <div className="md:w-2/3 lg:w-1/2 flex flex-col">
                    <img
                        src={logo}
                        alt="logo"
                        className="object-contain h-20 w-40 mx-auto"
                    />
                    <div className="border rounded-lg border-gray-300 py-6 px-8 mt-4 lg:mt-8 xl:mt-16">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

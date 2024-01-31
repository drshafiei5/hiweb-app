import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
    loggedOut,
    selectToken,
    selectUsername,
} from "@/redux/slices/auth-slice"
import { Navigate, Outlet } from "react-router-dom"
import { useMainHeader } from "./main-header-context"

const MainLayout = () => {
    const dispatch = useAppDispatch()
    const token = useAppSelector(selectToken)
    const username = useAppSelector(selectUsername)

    const { component } = useMainHeader() || {}
    const Component = component

    if (token) {
        return (
            <div className="bg-slate-50 px-4 md:px-0">
                <div className="container mx-auto min-h-screen py-10">
                    <header className="flex items-center flex-wrap justify-between">
                        {Component && Component}

                        <div className="flex flex-col items-center md:flex-row gap-0 md:gap-10 ms-4 md:ms-10">
                            <span>{username}</span>

                            <div
                                className="flex items-center gap-1 text-red-400 text-sm cursor-pointer"
                                onClick={() => dispatch(loggedOut())}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                                    />
                                </svg>
                                <span>خروج</span>
                            </div>
                        </div>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        )
    }

    return <Navigate to="/" replace />
}

export default MainLayout

import { useAppSelector } from "@/app/hooks"
import { selectToken } from "@/redux/slices/auth-slice"
import { Navigate, Outlet } from "react-router-dom"

const IdentityLayout = () => {
    const token = useAppSelector(selectToken)

    if (token) {
        return <Navigate to="/dashboard" replace />
    }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center"> 
      <Outlet />
    </main>
  )
}

export default IdentityLayout

import { createBrowserRouter } from "react-router-dom"
import Login from "@/pages/login"
import IdentityLayout from "@/layouts/identity-layout"
import MainLayout from "@/layouts/main-layout"
import Products from "./pages/products"
import { MainHeaderProvider } from "./layouts/main-header-context"
import MainHeaderWrapper from "./components/main-header-wrapper"
import ProductsHeader from "./features/products/products-header"

const router = createBrowserRouter([
    {
        path: "/",
        element: <IdentityLayout />,
        children: [
            {
                index: true,
                element: <Login />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <MainHeaderProvider>
                <MainLayout />
            </MainHeaderProvider>
        ),
        children: [
            {
                index: true,
                element: (
                    <MainHeaderWrapper HeaderComponent={<ProductsHeader />}>
                        <Products />
                    </MainHeaderWrapper>
                ),
            },
        ],
    },
      {
        path: '*',
        element: <p>Not Found</p>
      }
])

export default router

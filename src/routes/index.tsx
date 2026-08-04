import { LoginPage } from "@/features/auth/pages/LoginPage"
import RegisterPage from "@/features/auth/pages/RegisterPage"
import ProductPage from "@/features/product/components/ProductPage"
import { AuthLayout } from "@/layouts/AuthLayout"
import { MainLayout } from "@/layouts/MainLayout"
import HomePage from "@/pages/HomePage"       
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "/products",
                element: <ProductPage /> 
            },
            // {
            //     path: "/products/:id",
            //     element: <ProductDetailPage />  //chi tiết sản phẩm
            // }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            }
        ]
    }
])

export default function AppRouter() {
    return <RouterProvider router={router} />
}
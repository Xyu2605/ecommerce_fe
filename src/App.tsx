import { useEffect, useState } from 'react'
import AppRouter from './routes'
import { authService } from './features/auth/api/service'
import { useAuthStore } from './store/auth'
import { Toaster } from "react-hot-toast"
import axiosInstance from './api/axios'

export default function App() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            try {
                const response = await authService.refreshToken();
                const token = response.data;

                useAuthStore.getState().setAccessToken(token);

                const user = await authService.getMe()
                useAuthStore.getState().setUser(user)

            } catch(err :  any) {
                useAuthStore.getState().logout();
            } finally {
                setIsLoading(false)
            }
        }

        initAuth()
    }, [])

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
            </div>
        )
    }

    return (
        <>
            <Toaster position="top-right" />
            <AppRouter />
        </>
    )
}
import { useEffect, useState } from 'react'
import AppRouter from './routes'
import { authService } from './features/auth/api/service'
import { useAuthStore } from './store/auth'
import { Toaster } from "react-hot-toast";


export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const { setAccessToken, setUser, logout } = useAuthStore();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const response = await authService.refreshToken();
                console.log('refresh response:', response)
                setAccessToken(response.data)

                const user = await authService.getMe();
                setUser(user)
            } catch(err) {
                console.log('refresh error:', err);
                logout()
            } finally {
                setIsLoading(false)
            }
        }

        initAuth()
    }, [])
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
                    <p className="text-gray-400 text-sm">Đang tải...</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <Toaster/>
            <AppRouter/>
        </>
    );
}
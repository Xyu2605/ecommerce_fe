import type { IUser } from "@/interfaces/user.interface";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    // State
    accessToken: string | null;
    user: IUser | null;
    isAuthenticated: boolean;

    // Actions
    setAccessToken: (token: string) => void;
    setUser: (user: IUser) => void;
    logout: () => void;
    updateUser: (user: Partial<IUser>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // Initial state
            accessToken: null,
            user: null,
            isAuthenticated: false,

            // Actions
            setAccessToken: (token) => set({
                accessToken: token,
                isAuthenticated: true
            }),

            setUser: (user) => set({ user }),

            logout: () => set({
                accessToken: null,
                user: null,
                isAuthenticated: false
            }),
            updateUser: (userData) => {
                const currentUser = get().user;
                if (currentUser) {
                set({ user: { ...currentUser, ...userData } });
                }
            }
        }),
        {
            name: 'auth-storage',  // key trong localStorage
            //  chỉ lưu user vào localStorage
            // không lưu accessToken vì không an toàn
            partialize: (state) => ({ user: state.user })
        }
    )
)
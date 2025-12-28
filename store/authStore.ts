import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
    id: string | number;
    name: string;
    email: string;
    mobile?: string;
    mobile_country_code?: string;
    email_verified_at?: string | null;
    [key: string]: any;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: !!user,
                }),

            setLoading: (loading) => set({ isLoading: loading }),

            login: (user) =>
                set({
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                }),

            logout: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                }),
            updateUser: (userData) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } : null,
                })),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

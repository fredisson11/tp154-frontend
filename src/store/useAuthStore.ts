// store/useAuthStore.ts

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Role = 'teacher' | 'student'

type UserData = {
  id: number
  firstName: string
  lastName: string
  phone: string | null
  photo: string | null
  email: string
  role: Role
  token: string // access token
}

type AuthState = {
  user: UserData | null
  isAuthenticated: boolean
  isHydrated: boolean
  setUserData: (user: UserData, refreshToken: string) => void
  logout: () => void
  setHydrated: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isHydrated: false,

      setUserData: (user, refreshToken) => {
        localStorage.setItem('refresh_token', refreshToken) // save refresh token
        set({
          user,
          isAuthenticated: true,
        })
      },

      logout: () => {
        localStorage.removeItem('refresh_token')
        set({
          user: null,
          isAuthenticated: false,
        })
      },

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

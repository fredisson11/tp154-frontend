'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

/**
 * Hydrates the auth store by setting `isHydrated` to true.
 * This is needed to prevent server and client side mismatch.
 *
 * @returns null
 */
export const AuthHydration = () => {
  const setHydrated = useAuthStore((state) => state.setHydrated)

  useEffect(() => {
    setHydrated()
  }, [setHydrated])

  return null
}

'use client'

import { Role, useAuthStore } from '@/store/useAuthStore'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RouteValidator({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isHydrated = useAuthStore((state) => state.isHydrated)
  const userRole = useAuthStore((state) => state.user?.role)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isHydrated) return

    // If not authenticated and not on login page, redirect to login
    if (!isAuthenticated && !pathname.startsWith('/login')) {
      return router.push('/login')
    }

    // If authenticated and on login page, redirect to home
    if (isAuthenticated && pathname.startsWith('/login')) {
      return router.push(`/${userRole}/`)
    }

    // Validate role
    const pathRole = pathname.split('/')[1] as Role | undefined

    if (pathRole && userRole && pathRole !== userRole) {
      return router.push(`/${userRole}/`)
    }
  }, [isAuthenticated, isHydrated, pathname, router, userRole])

  if (!isHydrated) {
    return null
  }

  return <>{children}</>
}

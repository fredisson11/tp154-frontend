'use client'

import MainButton from '@/components/ui/MainButton'
import { useEffect, useState } from 'react'
import BurgerMenu from '@/components/ui/BurgerMenu'
import Logo from '@/components/ui/Logo'
import classNames from 'classnames'
import NavLinks from '@/components/ui/NavLinks'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import Link from 'next/link'
import UserAvatar from '@/components/ui/UserAvatar'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const pathname = usePathname()

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isHydrated = useAuthStore((state) => state.isHydrated)
  const userData = useAuthStore((state) => state.user)

  useEffect(() => {
    const handleScroll = () => setIsScrolling(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isHydrated) return null

  const renderAuthButton = () => {
    if (!isAuthenticated) {
      return (
        <MainButton
          className={classNames('ml-auto w-10 md:w-auto h-12 md:h-auto', {
            'hidden md:flex': pathname === '/' && !isOpen,
            'w-full mr-auto': isOpen,
          })}
          href="/login"
        >
          Увійти в акаунт
        </MainButton>
      )
    }

    return (
      <Link href={`/${userData?.role}`}>
        <UserAvatar
          photo={userData?.photo}
          className={classNames({
            'w-12 h-12 lg:block hidden': !isOpen,
            'w-20 h-20 text-white mb-4': isOpen,
          })}
          spanClassName={classNames({
            'hidden lg:block': !isOpen,
            'text-white': isOpen,
          })}
        />
      </Link>
    )
  }

  return (
    <>
      <BurgerMenu
        isMainPage={pathname === '/'}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />

      <header
        className={classNames(
          'fixed top-0 left-0 right-0 z-10 transition-colors duration-300',
          {
            'bg-white shadow-md': !isOpen && isScrolling,
          }
        )}
      >
        <div
          className={classNames(
            'container mx-auto px-5 py-2 md:py-4',
            'flex flex-col items-center justify-between gap-4',
            { 'border-b-2 border-zinc-600': isOpen }
          )}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex-1">
              <Logo className={classNames({ 'text-white': isOpen })} />
            </div>

            <div className="hidden lg:flex justify-center flex-1">
              {pathname === '/' && !isOpen && (
                <NavLinks className="space-x-4 whitespace-nowrap" />
              )}
            </div>

            <div className="flex items-center justify-end gap-4 flex-1">
              {!isOpen && renderAuthButton()}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <Image
                  src={isOpen ? '/close-icon.svg' : '/hamb-icon.svg'}
                  alt="menu"
                  width={44}
                  height={44}
                  priority
                />
              </button>
            </div>
          </div>

          {isOpen && renderAuthButton()}
        </div>
      </header>
    </>
  )
}

export default Navbar

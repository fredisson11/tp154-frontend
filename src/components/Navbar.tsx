'use client'

import MainButton from '@/components/ui/MainButton'
import { useEffect, useState } from 'react'
import BurgerMenu from '@/components/ui/BurgerMenu'
import Logo from '@/components/ui/Logo'
import classNames from 'classnames'
import NavLinks from '@/components/ui/NavLinks'
import Image from 'next/image'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <BurgerMenu setIsOpen={setIsOpen} isOpen={isOpen} />

      <header
        className={classNames(
          'fixed top-0 left-0 right-0 z-10 transition-colors duration-300',
          {
            'bg-white shadow-md': !isOpen && isScrolling,
          }
        )}
      >
        {/* container */}
        <div
          className={classNames(
            'container md:mx-auto px-5 py-4',
            'flex flex-col items-center justify-between gap-4',

            {
              'border-b-2 border-zinc-600': isOpen,
            }
          )}
        >
          <div className="flex w-full items-center justify-between">
            {/* logo */}
            <Logo
              className={classNames({
                'text-white': isOpen,
              })}
            />

            {/* navigation */}
            {!isOpen && <NavLinks className="hidden lg:block space-x-4" />}

            {/* buttons */}
            <div className="flex items-center justify-between gap-15">
              <div className="hidden md:block">
                <MainButton className="px-10	" href="/login">
                  Увійти в акаунт
                </MainButton>
              </div>

              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
                <Image
                  src={isOpen ? '/close-icon.svg' : '/hamb-icon.svg'}
                  alt="menu"
                  width={44}
                  height={44}
                />
              </button>
            </div>
          </div>

          {isOpen && (
            <MainButton className="md:hidden w-full" href="/login">
              Увійти в акаунт
            </MainButton>
          )}
        </div>
      </header>
    </>
  )
}

export default Navbar

'use client'

import classNames from 'classnames'
import React, { useEffect } from 'react'
import NavLinks from '@/components/ui/NavLinks'

interface BurgerMenuProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function BurgerMenu({ isOpen, setIsOpen }: BurgerMenuProps) {
  // disable scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    // unmount for prevent disabled scroll at new page
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* opened menu */}
      <div
        className={classNames(
          'fixed inset-0 bg-black/90 w-screen h-screen',
          'transition-opacity duration-300',
          'flex items-center',
          'z-10',

          {
            'opacity-0 pointer-events-none': !isOpen,
            'opacity-100 pointer-events-auto': isOpen,
          }
        )}
      >
        {/* links */}
        {isOpen && (
          <div className="w-full" onClick={() => setIsOpen(!isOpen)}>
            <NavLinks className="flex flex-col items-center pt-[12%] md:pt-0 space-y-20 text-xl w-full text-white" />
          </div>
        )}
      </div>
    </>
  )
}

export default BurgerMenu

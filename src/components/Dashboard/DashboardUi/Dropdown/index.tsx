'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useRef, useState, useEffect } from 'react'
import classNames from 'classnames'
import useClickOutside from '@/hooks/useClickOutside'
import { usePathname } from 'next/navigation'

type DropdownProps = {
  trigger: ReactNode
  children: ReactNode
  className?: string
}

export const Dropdown = ({ trigger, children, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useClickOutside(isOpen, ref, () => setIsOpen(false))

  // close dropdown on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={classNames(
              'absolute top-15 mt-2 py-2 px-6 min-w-[145px] bg-white border border-gray-300 rounded-sm shadow-lg whitespace-nowrap z-50',
              className
            )}
          >
            {/* Triangle indicator */}
            <div className="absolute z-[5] top-[-13px] right-3 w-6 h-6 bg-white border-l border-t border-gray-300 rotate-45"></div>

            <div className="relative z-10 space-y-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

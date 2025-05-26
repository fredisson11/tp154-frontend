'use client'

import { Check } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import classNames from 'classnames'
import useClickOutside from '@/hooks/useClickOutside'

interface VerificationInfoProps {
  isVerified: boolean
  children: React.ReactNode
}

function VerificationInfo({ isVerified, children }: VerificationInfoProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // check if user is on touch device
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mql = window.matchMedia('(hover: none) and (pointer: coarse)')
      setIsTouch(mql.matches)

      // if user changes device (for example, mouse)
      const listener = (e: MediaQueryListEvent) => setIsTouch(e.matches)

      mql.addEventListener('change', listener)

      return () => mql.removeEventListener('change', listener)
    }
  }, [])

  useClickOutside(isOpen, ref, () => setIsOpen(false))

  const handleClick = () => {
    if (isTouch) {
      setIsOpen((prev) => !prev)
    }
  }

  const handleMouseEnter = () => {
    if (!isTouch) {
      setIsOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isTouch) {
      setIsOpen(false)
    }
  }

  return (
    //wrapper
    <div className="flex items-center gap-2 justify-center md:justify-start">
      <div
        className={classNames(
          'relative cursor-pointer rounded-full w-8 h-8 border-3 flex items-center justify-center p-1',
          isVerified ? 'border-primary' : 'border-gray-400'
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}
      >
        <Check
          className={isVerified ? 'text-primary' : 'text-gray-400'}
          strokeWidth={4}
        />
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className={classNames(
                'absolute top-full left-1/2 z-20 mt-2',
                '-translate-y-[140px] md:-translate-y-[120px] lg:-translate-y-[105px]',
                'bg-gray-200 rounded-xl rounded-bl-none',
                'p-2 shadow-md/5 border border-gray-200',
                'w-[250px] md:w-[320px] lg:w-[415px]'
              )}
            >
              <p className="text-sm text-gray-800">
                {isVerified
                  ? 'Цей вчитель підтвердив свою особистість та кваліфікацію, пройшовши повну верифікацію нашими адміністраторами.'
                  : 'Цей вчитель не проходив верифікацію нашими адміністраторами.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {children}
    </div>
  )
}

export default VerificationInfo

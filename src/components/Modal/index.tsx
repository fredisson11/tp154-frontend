'use client'

import { X } from 'lucide-react'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useEffect, useRef } from 'react'
import useClickOutside from '@/hooks/useClickOutside'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose?: () => void
  className?: string
  type?: 'profile-modal' | 'dashboard-modal'
}

const Modal = ({
  children,
  isOpen,
  onClose,
  className,
  type = 'profile-modal',
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // close modal on 'esc' or click outside
  const { ref } = useClickOutside(isOpen, modalRef, onClose)

  // close modal on esc and disable/enable scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            // additional check for click outside
            const target = e.target as HTMLDivElement
            if (target.classList.contains('fixed')) {
              onClose?.()
            }
          }}
        >
          <motion.div
            ref={ref}
            className={classNames(
              'w-[80%] h-[80%] lg:w-[65%] overflow-auto relative',
              type,
              className
            )}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="cursor-pointer absolute top-4 right-4 rounded-full p-1 hover:bg-gray-300"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal

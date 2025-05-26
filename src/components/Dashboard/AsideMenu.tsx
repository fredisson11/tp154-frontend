import { useAsideMenuStore } from '@/store/useAsideMenuStore'
import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useClickOutside from '@/hooks/useClickOutside'
import classNames from 'classnames'

const AsideMenu = ({ className }: { className?: string }) => {
  const { isOpen, content, position, closeMenu } = useAsideMenuStore()
  const ref = useRef<HTMLDivElement>(null)

  useClickOutside(isOpen, ref, closeMenu)

  const asideClassName = position === 'left' ? 'left-0' : 'right-0'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-brightness-75 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          />

          {/* Aside */}
          <motion.aside
            className={classNames(
              'fixed top-0 w-full max-w-md h-full shadow-xl z-30',
              { 'pr-[100px] translate-x-[100px]': position === 'right' },
              { 'pl-[100px] -translate-x-[100px]': position === 'left' },
              { 'bg-white': position === 'left' },
              { 'bg-background': position === 'right' },
              asideClassName,
              className
            )}
            initial={{ x: position === 'left' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: position === 'left' ? '-100%' : '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
              mass: 0.5,
            }}
          >
            {content}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default AsideMenu

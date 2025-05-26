import { useCallback, useEffect, RefObject } from 'react'

function useClickOutside<T extends HTMLElement | null = HTMLDivElement | null>(
  isOpen: boolean,
  ref: RefObject<T>,
  onClose?: () => void
) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        isOpen &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        onClose?.()
      }
    },
    [isOpen, onClose, ref]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        onClose?.()
      }
    },
    [isOpen, onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, ref, handleClickOutside, handleKeyDown])

  return { ref }
}

export default useClickOutside

'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface NavigateButtonProps {
  className?: string
  ariaLabel?: string
  showHome?: boolean
}

function NavigateButton({
  className = '',
  ariaLabel,
  showHome = false,
}: NavigateButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (showHome) {
      router.push('/')
    } else if (window.history.length > 2) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel || (showHome ? 'На головну' : 'Назад')}
      className={`p-2 link flex items-center ${className}`}
    >
      <ArrowLeft className="w-6 h-5 mr-2" />
      {showHome ? 'На головну' : 'Назад'}
    </button>
  )
}

export default NavigateButton

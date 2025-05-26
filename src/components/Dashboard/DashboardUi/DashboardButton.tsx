import classNames from 'classnames'
import Link from 'next/link'

interface DashboardButtonProps {
  type?: 'submit' | 'button' | 'reset'
  onClick?: () => void
  className?: string
  disabled?: boolean
  children: React.ReactNode
  href?: string
}

function DashboardButton({
  type = 'button',
  onClick,
  className,
  disabled,
  children,
  href,
}: DashboardButtonProps) {
  const baseClasses = classNames(
    'cursor-pointer text-center bg-primary hover:bg-primary/85 rounded-sm text-white text-lg md:text-xl py-2 px-4',
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseClasses} style={{ display: 'block' }}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default DashboardButton

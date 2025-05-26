import classNames from 'classnames'
import Link from 'next/link'

type ButtonOrLinkProps =
  | {
      href: string
      onClick?: never
      type?: never
      children: React.ReactNode
      className?: string
      secondaryStyle?: boolean
      disabled?: never
    }
  | {
      href?: never
      onClick?: () => void
      type?: 'submit' | 'button' | 'reset'
      children: React.ReactNode
      className?: string
      secondaryStyle?: boolean
      disabled?: boolean
    }

export default function MainButton(props: ButtonOrLinkProps) {
  const baseClasses = classNames(
    'rounded-[20px]',
    'text-xl',
    'px-2',
    'py-4',
    'leading-tight',
    'transition-all',
    'duration-300',
    'whitespace-nowrap',
    'flex',
    'justify-center',
    'items-center',
    'min-w-[180px]',
    'outline-0',
    props.secondaryStyle ? 'secondary-button' : 'primary-button',
    props.disabled ? 'opacity-50 cursor-not-allowed' : ''
  )

  if (props.href) {
    return (
      <Link
        href={props.href}
        className={classNames(baseClasses, props.className)}
      >
        <span className="px-3">{props.children}</span>
      </Link>
    )
  }

  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={classNames(baseClasses, props.className)}
      disabled={props.disabled}
    >
      <span className="px-3">{props.children}</span>
    </button>
  )
}

import NavLink from '@/components/ui/NavLink'
import classNames from 'classnames'

interface NavLinksProps {
  className?: string
}

function NavLinks({ className }: NavLinksProps) {
  return (
    <nav className={classNames('', className)}>
      <NavLink href="#search">Знайти репетитора</NavLink>
      <NavLink href="#register">Стати репетитором</NavLink>
      <NavLink href="#faq">Часті запитання</NavLink>
    </nav>
  )
}

export default NavLinks

import Link from 'next/link'

export default function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="py-3 px-4 hover:bg-slate-400 hover:text-white rounded-2xl transition-colors duration-200"
    >
      {children}
    </Link>
  )
}

import Link from 'next/link'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <header className="bg-slate-500 text-white py-4 px-6 flex justify-between">
        <h1 className="text-2xl">
          <Link href="/">TP154</Link>
        </h1>

        <nav className="flex space-x-4">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </nav>
      </header>

      {children}
    </div>
  )
}

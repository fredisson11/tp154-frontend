'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { teacherSidebarLinks } from '@/utils/teacherSidebarLinks'

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true)
    }
  }, [])

  return (
    <aside
      className={classNames(
        'bg-white border-r border-gray-200 h-screen transition-all duration-300 ease-in-out',
        'hidden md:flex flex-col p-6',
        isSidebarOpen ? 'w-[25%] lg:w-[18%] 2xl:w-[12%]' : 'w-[12%]'
      )}
    >
      {/* Toggle sidebar button on md */}
      <button
        onClick={toggleSidebar}
        className="block cursor-pointer lg:hidden"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? (
          <X className="w-12 h-12 text-gray-400" />
        ) : (
          <Menu className="w-12 h-12 mx-auto" />
        )}
      </button>

      {/* Logo on lg */}
      <Image
        className="hidden lg:block"
        src="/logo.svg"
        width={120}
        height={40}
        alt="Logo"
        priority
      />

      {/* Links */}
      <nav className="flex-1 mt-10 space-y-12">
        {teacherSidebarLinks.map(({ href, icon: Icon, label }) => {
          const isActive =
            pathname === href ||
            (href !== '/teacher' && pathname.startsWith(href))

          return (
            <Link
              key={href}
              href={href}
              className={classNames('flex items-center transition-all', {
                'text-black': isActive,
                'text-gray-400 hover:text-black': !isActive,
                'gap-4': isSidebarOpen,
              })}
            >
              <Icon
                className={classNames('w-10 h-10 shrink-0', {
                  'mx-auto': !isSidebarOpen,
                })}
              />

              <span
                className={classNames(
                  'whitespace-nowrap transition-opacity duration-200',
                  {
                    'opacity-100': isSidebarOpen,
                    'opacity-0 w-0 overflow-hidden': !isSidebarOpen,
                    'underline underline-offset-3': isActive,
                  }
                )}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar

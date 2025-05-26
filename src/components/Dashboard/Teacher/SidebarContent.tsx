'use client'

import { useAsideMenuStore } from '@/store/useAsideMenuStore'
import { teacherSidebarLinks } from '@/utils/teacherSidebarLinks'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SidebarContent() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col p-6">
      {/* Logo */}
      <Image src="/logo.svg" width={120} height={40} alt="Logo" priority />

      {/* Links */}
      <nav className="mt-10 space-y-12">
        {teacherSidebarLinks.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href

          return (
            <Link
              onClick={() => {
                useAsideMenuStore.getState().closeMenu()
              }}
              key={href}
              href={href}
              className={classNames('flex items-center transition-all', {
                'text-black': isActive,
                'text-gray-400': !isActive,
                'gap-4': true,
              })}
            >
              <Icon className="w-10 h-10 shrink-0" />

              <span
                className={classNames('transition-opacity duration-200', {
                  'opacity-100': true,
                  'opacity-0 w-0 overflow-hidden': false,
                  'underline underline-offset-3': isActive,
                })}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default SidebarContent

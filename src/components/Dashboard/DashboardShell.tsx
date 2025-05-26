'use client'

import { Bell, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { pathTitleMap } from '@/utils/page-titles'
import AsideMenu from '@/components/Dashboard/AsideMenu'
import UserProfileDropdown from '@/components/Dashboard/DashboardUi/Dropdown/UserProfileDropdown'
import { Dropdown } from '@/components/Dashboard/DashboardUi/Dropdown'
import Sidebar from '@/components/Dashboard/Teacher/Sidebar'
import { useAuthStore } from '@/store/useAuthStore'
import { useAsideMenuStore } from '@/store/useAsideMenuStore'
import SidebarContent from '@/components/Dashboard/Teacher/SidebarContent'

interface DashboardLayoutProps {
  children: React.ReactNode
}

function DashboardShell({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const title = pathTitleMap[pathname]

  const role = useAuthStore((state) => state.user?.role)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      {role === 'teacher' && <Sidebar />}

      {/* Main content + navbar */}
      <div className="flex flex-col flex-1">
        <header className="bg-white border-b border-gray-200 py-4 px-5 md:px-10 flex items-center justify-between">
          <Menu
            onClick={() => {
              useAsideMenuStore.getState().openMenu(<SidebarContent />, 'left')
            }}
            className={
              role === 'teacher' ? 'block w-10 h-10 md:hidden' : 'hidden'
            }
          />

          {/* Title md+ */}
          <h2
            className={classNames('text-left font-bold text-lg md:text-xl', {
              'hidden md:block ': role === 'teacher', // hide on teacher dashboard
            })}
          >
            {title}
          </h2>

          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Notifications */}
            <Dropdown
              className="-right-2"
              trigger={
                <Bell className="w-8 h-8 text-gray-400 cursor-pointer" />
              }
            >
              Notifications
            </Dropdown>

            {/* User profile */}
            <UserProfileDropdown />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto">{children}</main>

        {/* Aside, implemented using zustand */}
        <AsideMenu />
      </div>
    </div>
  )
}

export default DashboardShell

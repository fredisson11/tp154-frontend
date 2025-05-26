'use client'

import Image from 'next/image'
import { LogOut, User } from 'lucide-react'
import { Dropdown } from '@/components/Dashboard/DashboardUi/Dropdown'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'

const UserProfileDropdown = () => {
  const logout = useAuthStore((state) => state.logout)

  const router = useRouter()

  const handleEdit = () => {
    const role = useAuthStore.getState().user?.role

    router.push(role === 'teacher' ? '/teacher/edit' : '/student/edit')
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <Dropdown
      className="right-0"
      trigger={
        <Image
          className="rounded-full"
          src="/icon-user.png"
          alt="user profile"
          width={48}
          height={48}
          priority
        />
      }
    >
      <button
        onClick={handleEdit}
        className="p-2 text-primary hover:bg-gray-100 cursor-pointer flex items-center gap-2"
      >
        <User className="w-6 h-6" />
        Редагувати дані
      </button>

      <hr className="border-gray-300" />

      <button
        onClick={handleLogout}
        className="p-2 text-red-500 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
      >
        <LogOut className="w-6 h-6" />
        Вийти з аккаунту
      </button>
    </Dropdown>
  )
}

export default UserProfileDropdown

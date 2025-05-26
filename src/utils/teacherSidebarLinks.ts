import { Calendar, GraduationCap, User } from 'lucide-react'

type SidebarLink = {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}

export const teacherSidebarLinks: SidebarLink[] = [
  {
    href: '/teacher/schedule',
    icon: Calendar,
    label: 'Календар',
  },
  {
    href: '/teacher/students',
    icon: GraduationCap,
    label: 'Мої учні',
  },
  {
    href: '/teacher',
    icon: User,
    label: 'Мій кабінет',
  },
]

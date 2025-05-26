import { create } from 'zustand'

type AsideMenuStore = {
  isOpen: boolean
  content: React.ReactNode | null
  position?: 'left' | 'right'
  openMenu: (content: React.ReactNode, position?: 'left' | 'right') => void
  closeMenu: () => void
}

export const useAsideMenuStore = create<AsideMenuStore>((set) => ({
  isOpen: false,
  content: null,
  position: 'right',
  openMenu: (content, position = 'right') =>
    set({ isOpen: true, content, position }),
  closeMenu: () => set({ isOpen: false, content: null }),
}))

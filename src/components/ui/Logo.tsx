'use client'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

function Logo({ className }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()

  /**
   * Handles the click on the logo.
   * If the user is on the home page, it scrolls to the top.
   * If the user is on another page, it navigates to the home page.
   */
  const handleClick = () => {
    if (pathname === '/') {
      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      // Navigate to the home page
      router.push('/')
    }
  }

  return (
    <h1 className={`flex items-center space-x-2 ${className}`}>
      <button onClick={handleClick} className="w-full cursor-pointer">
        <Image src="/logo.svg" alt="Astra+" width={150} height={60} />
      </button>
    </h1>
  )
}

export default Logo

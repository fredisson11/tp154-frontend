import Logo from '@/components/ui/Logo'
import Image from 'next/image'

function Footer() {
  return (
    <footer className="container-fluid px-5">
      {/* top */}
      <div className="flex items-center justify-between">
        <Logo />
        <p className="font-bold">+380 99 260 0000</p>
      </div>

      {/* bottom */}
      <div className="flex flex-col md:flex-col lg:flex-row items-center justify-between mt-6 py-6 border-t-2 border-gray-200 space-y-6 lg:space-y-0">
        {/* socials */}
        <div className="flex space-x-4">
          <Image
            src="/facebook-icon.svg"
            alt="Facebook"
            width={36}
            height={36}
          />
          <Image
            src="/instagram-icon.svg"
            alt="Instagram"
            width={36}
            height={36}
          />
          <Image
            src="/telegram-icon.svg"
            alt="Telegram"
            width={36}
            height={36}
          />
          <Image src="/x-icon.svg" alt="X" width={36} height={36} />
          <Image src="/tiktok-icon.svg" alt="TikTok" width={36} height={36} />
        </div>

        {/* links */}
        <div className="flex flex-col gap-6 md:flex-row md:space-x-8 items-center">
          <a href="#" className="underline underline-offset-4">
            Договір оферти
          </a>
          <a href="#" className="underline underline-offset-4">
            Підтримати нас гривнею
          </a>
        </div>

        {/* copyright */}
        <span className="text-gray-400 text-center">
          Copyright ©2025 Astra+
        </span>
      </div>
    </footer>
  )
}

export default Footer

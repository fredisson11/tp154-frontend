'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ContactComponentProps {
  className?: string
}

const ContactComponent = ({ className }: ContactComponentProps) => {
  const [showNumber, setShowNumber] = useState(false)
  const phoneNumber = '099 888 22 23'

  return (
    <div className={`${className}`}>
      <div>
        <p className="text-gray-500 lg:text-base">Показати номер:</p>

        <button className="mx-auto md:mx-0 underline text-xl lg:text-base flex items-center gap-2 ">
          {showNumber ? `${phoneNumber}` : '**********'}

          <Image
            onClick={() => setShowNumber(!showNumber)}
            src={showNumber ? '/eye-closed-icon.svg' : '/eye-open-icon.svg'}
            alt={showNumber ? 'open eye' : 'closed eye'}
            className="w-8 h-8 cursor-pointer"
            width={32}
            height={32}
          />
        </button>
      </div>

      <div>
        <p className="text-gray-500 lg:text-base text-center md:text-left">
          Соцмережі:
        </p>
        <div className="flex gap-3">
          <a href="https://t.me/+38098882223" target="_blank" rel="noreferrer">
            <Image
              src="/telegram-icon.svg"
              alt="Telegram"
              className="w-8 h-8"
              width={32}
              height={32}
            />
          </a>
          <a href="https://wa.me/+38098882223" target="_blank" rel="noreferrer">
            <Image
              src="/telegram-icon.svg"
              alt="WhatsApp"
              className="w-8 h-8"
              width={32}
              height={32}
            />
          </a>
          <a
            href="https://viber.click/+38098882223"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/telegram-icon.svg"
              alt="Viber"
              className="w-8 h-8"
              width={32}
              height={32}
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactComponent

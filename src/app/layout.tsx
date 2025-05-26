import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

import { AuthHydration } from '@/components/AuthHydration'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  title: 'Astra +',
  description: 'Astra +',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <AuthHydration />

        {children}
      </body>
    </html>
  )
}

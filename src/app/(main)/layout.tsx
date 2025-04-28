import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="margin-top">
      <Navbar />

      {children}

      <Footer />
    </div>
  )
}

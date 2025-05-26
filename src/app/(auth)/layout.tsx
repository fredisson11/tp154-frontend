import BackgroundMain from '@/components/BackgroundMain'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center">
        <BackgroundMain />

        {children}
      </div>
    </>
  )
}

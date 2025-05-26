import DashboardShell from '@/components/Dashboard/DashboardShell'
import RouteValidator from '@/components/RouteValidator'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RouteValidator>
      <DashboardShell>{children}</DashboardShell>
    </RouteValidator>
  )
}

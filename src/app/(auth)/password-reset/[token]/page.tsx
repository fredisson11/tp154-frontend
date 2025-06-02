import PasswordReset from '@/components/PasswordReset'

type PasswordResetConfirmPageProps = {
  params: Promise<{ token: string }>
}

export default async function PasswordResetConfirmPage({
  params,
}: PasswordResetConfirmPageProps) {
  const { token } = await params

  return <PasswordReset token={token} />
}

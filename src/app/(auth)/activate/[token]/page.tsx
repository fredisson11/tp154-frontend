import ActivateClient from '@/components/ActivateClient'

type ActivatePageProps = {
  params: Promise<{ token: string }>
}

export default async function ActivatePage({ params }: ActivatePageProps) {
  const { token } = await params

  return <ActivateClient token={token} />
}

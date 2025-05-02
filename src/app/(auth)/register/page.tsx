import AuthForm from '@/components/AuthForm'

type RegisterPageProps = {
  searchParams: Promise<{
    initialRole?: 'teacher' | 'student'
  }>
}

async function RegisterPage(props: RegisterPageProps) {
  const searchParams = await props.searchParams
  const role = searchParams.initialRole === 'teacher' ? 'teacher' : 'student'

  return <AuthForm initialRole={role} isRegister={true} />
}

export default RegisterPage

import AuthForm from '@/components/AuthForm'
import { Role } from '@/store/useAuthStore'

type RegisterPageProps = {
  searchParams: Promise<{
    initialRole?: Role
  }>
}

async function RegisterPage(props: RegisterPageProps) {
  const searchParams = await props.searchParams
  const role = searchParams.initialRole === 'teacher' ? 'teacher' : 'student'

  return <AuthForm initialRole={role} isRegister={true} />
}

export default RegisterPage

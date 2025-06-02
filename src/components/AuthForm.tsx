'use client'

import { useRouter } from 'next/navigation'
import MainButton from '@/components/ui/MainButton'
import Logo from '@/components/ui/Logo'
import Link from 'next/link'
import { useState } from 'react'
import { Role, useAuthStore } from '@/store/useAuthStore'
import { getUser, loginUser, registerUser } from '@/services/authApi'
import NavigateButton from './ui/NavigateButton'
import { decodeToken } from '@/utils/jwt'
import { loginSchema, registerSchema } from '@/utils/schemas/authSchemas'
import { ZodError } from 'zod'
import { Check, Eye, EyeClosed } from 'lucide-react'

type AuthFormProps = {
  isRegister?: boolean
  initialRole?: Role
}

function AuthForm({
  isRegister = false,
  initialRole = 'student',
}: AuthFormProps) {
  const [role, setRole] = useState(initialRole)
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(isRegister)

  const router = useRouter()
  const setUserData = useAuthStore((state) => state.setUserData)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      setIsLoading(true)

      // Register
      if (isRegister) {
        const parsed = registerSchema.safeParse({ email, password, role })

        if (!parsed.success) {
          const zodErrors = parsed.error.flatten().fieldErrors
          setFormError(
            zodErrors.email?.[0] || zodErrors.password?.[0] || 'Невірні дані'
          )

          return
        }

        const result = await registerUser(parsed.data)

        if (!result.success) {
          setFormError(result.error?.toString().split(',')[0] || result.message)
          return
        }

        setRegistrationSuccess(true)
        return
      }

      // Login
      const parsed = loginSchema.parse({ email, password })
      const data = await loginUser(parsed)
      const decodedToken = decodeToken(data.access)
      // User data for store (immediately after entering)
      const userData = await getUser(data.access, decodedToken.role)

      if (!userData.success) {
        setFormError('Помилка авторизації. Спробуйте пізніше')
        return
      }

      setUserData(
        {
          id: decodedToken.user_id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          phone: userData.phone,
          photo: userData.photo,
          email: userData.email,
          role: decodedToken.role,
          token: data.access,
        },
        data.refresh
      )

      router.push(`/${decodedToken.role}`)
    } catch (error) {
      if (error instanceof ZodError) {
        const zodErrors = error.flatten().fieldErrors
        setFormError(
          zodErrors.email?.[0] || zodErrors.password?.[0] || 'Невірні дані'
        )
      } else {
        setFormError('Невірна пошта або пароль')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative pb-60 lg:pb-0 px-4 py-8 md:w-[85%] lg:h-[80%] flex flex-col lg:flex-row items-center gap-14 lg:gap-[10%]">
      <NavigateButton
        showHome={true}
        className="hidden lg:flex absolute left-0 top-0"
      />
      <NavigateButton showHome={true} className="lg:hidden mr-auto" />

      {/* description */}
      <div className="w-1/2 h-full flex flex-col justify-center lg:items-baseline gap-8">
        <Logo />
        <h2 className="lg:text-left">
          {isRegister
            ? 'Зареєструйтесь та починайте навчання прямо зараз'
            : 'Вхід в особистий кабінет'}
        </h2>
        <p className="text-center lg:text-left">
          Ваше світле майбутнє
          <br /> чекає на Вас!
        </p>
      </div>

      {/* form or success message */}
      <div className="lg:w-1/2 h-full w-full">
        {registrationSuccess ? (
          <div className="h-full bg-primary px-8 py-12 rounded-2xl flex flex-col items-center justify-center gap-4 text-center">
            <div role="status" className="flex items-center gap-4">
              <Check className="text-white w-8 h-8" />
              <h2 className="text-white">Реєстрація успішна!</h2>
            </div>

            <p className="text-lg text-gray-100">
              Будь ласка, перевірте свою пошту для підтвердження акаунта.
            </p>

            <MainButton
              className="mt-6"
              secondaryStyle
              onClick={() => router.push('/login')}
            >
              Перейти до входу
            </MainButton>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="h-full flex flex-col gap-8 form-block"
            aria-labelledby="form-title"
            aria-live="polite"
          >
            <h2 className="text-3xl lg:text-4xl" id="form-title">
              {isRegister
                ? `Реєстрація ${role === 'teacher' ? 'вчителя' : 'учня'}`
                : 'Вхід в акаунт'}
            </h2>

            {/* Role choice if register */}
            {isRegister && (
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    aria-checked={role === 'student'}
                    type="radio"
                    name="role"
                    value="student"
                    className="form-radio"
                    checked={role === 'student'}
                    onChange={() => setRole('student')}
                  />
                  Реєструюсь як учень
                </label>

                <label className="flex items-center gap-3 cursor-pointer ">
                  <input
                    aria-checked={role === 'teacher'}
                    type="radio"
                    name="role"
                    value="teacher"
                    className="form-radio"
                    checked={role === 'teacher'}
                    onChange={() => setRole('teacher')}
                  />
                  Реєструюсь як вчитель
                </label>
              </div>
            )}

            {/* Email */}
            <div className="w-full relative">
              <label className="form-label" htmlFor="email">
                Пошта<span className="text-error">*</span>
              </label>

              <input
                className="form-input"
                type="email"
                name="email"
                id="email"
                placeholder="Введіть свій email"
                required
                autoComplete={isRegister ? 'email' : 'username'}
              />
            </div>

            {/* Password */}
            <div className="w-full relative">
              <label className="form-label" htmlFor="password">
                Пароль<span className="text-error">*</span>
              </label>

              <input
                className="form-input pr-8"
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Введіть свій пароль"
                required
                autoComplete={isRegister ? 'new-password' : 'current-password'}
              />

              {showPassword ? (
                <EyeClosed
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <Eye
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </div>

            {formError && (
              <p role="alert" className="form-alert">
                {formError}
              </p>
            )}

            <MainButton
              disabled={isLoading}
              type="submit"
              className="w-full"
              secondaryStyle={true}
            >
              {isRegister ? 'Створити акаунт' : 'Увійти'}
            </MainButton>

            <span className="text-gray-300 text-center">
              {isRegister && (
                <>
                  Створюючи обліковий запис, ви приймаєте{' '}
                  <Link
                    href="/terms"
                    className="underline-offset-2 underline"
                    aria-label="Умови використання Astra+"
                  >
                    Умови використання
                  </Link>{' '}
                  Astra+.
                </>
              )}
            </span>

            <p className="py-2 text-center">
              {isRegister ? 'У Вас вже є акаунт? ' : 'Ще не маєте акаунт? '}

              <Link
                href={isRegister ? '/login' : '/register'}
                className="underline-offset-2 underline"
              >
                {isRegister ? 'Увійти' : 'Зареєструватися'}
              </Link>
            </p>

            {!isRegister && (
              <p>
                <Link
                  href="/password-reset"
                  className="underline-offset-2 underline "
                >
                  Забули пароль?
                </Link>
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}

export default AuthForm

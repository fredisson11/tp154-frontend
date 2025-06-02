'use client'

import { useState } from 'react'
import MainButton from '@/components/ui/MainButton'
import NavigateButton from '@/components/ui/NavigateButton'
import { loginSchema } from '@/utils/schemas/authSchemas'
import { resetPassword, resetPasswordConfirm } from '@/services/authApi'
import { z } from 'zod'
import { Check, Eye, EyeClosed } from 'lucide-react'

type Props = {
  token?: string
}

function PasswordReset({ token }: Props) {
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    try {
      setIsLoading(true)

      // if no token send email otherwise send password
      if (!token) {
        // email check
        loginSchema.pick({ email: true }).parse({ email })

        const response = await resetPassword(email)

        if (!response.success) {
          throw new Error(response.message)
        }

        setFormSuccess('Лист для скидання паролю надіслано. Перевірте пошту.')
      } else {
        // password check
        loginSchema.pick({ password: true }).parse({ password })

        if (password !== confirmPassword) {
          throw new Error('Паролі не співпадають')
        }

        const response = await resetPasswordConfirm(
          token,
          password,
          confirmPassword
        )

        if (!response.success) {
          throw new Error(response.message)
        }

        setFormSuccess(
          'Пароль успішно змінено. Тепер ви можете увійти з новим паролем.'
        )
      }
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        setFormError(error.errors[0]?.message || 'Помилка валідації')
      } else if (error instanceof Error) {
        setFormError(error.message || 'Сталася невідома помилка')
      } else {
        setFormError('Сталася невідома помилка')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative bg-primary m-2 md:mx-auto p-10 md:w-1/2 rounded-2xl text-white flex items-center justify-center flex-col gap-5">
      <NavigateButton
        showHome
        className="absolute top-0 left-0 md:-translate-x-[200%] -translate-y-[150%] md:translate-y-0"
      />

      <h2>Скидання паролю</h2>

      <form onSubmit={handleSubmit} className="w-full">
        {!token && (
          <input
            className="form-input mt-5 w-full"
            type="email"
            name="email"
            id="email"
            placeholder="Введіть свій email"
            required
            autoComplete="email"
          />
        )}
        {token && !formSuccess && (
          <>
            <div className="relative">
              <input
                className="form-input mt-5 w-full"
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Введіть новий пароль"
                required
                autoComplete="new-password"
              />

              <button
                type="button"
                className="absolute top-9 right-2 p-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>

            <div className="relative">
              <input
                className="form-input mt-5 w-full"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Підтвердіть новий пароль"
                required
                autoComplete="new-password"
              />

              <button
                type="button"
                className="absolute top-9 right-2 p-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>
          </>
        )}
        {formError && (
          <p role="alert" className="form-alert mt-5">
            {formError}
          </p>
        )}

        {formSuccess && (
          <p
            role="status"
            className="flex flex-col-reverse text-center md:text-left md:flex-row items-center gap-2 text-green-500 mt-5 p-2 px-4 bg-green-200 rounded-md font-semibold text-base md:text-lg"
          >
            <Check className="h-7 w-7" /> {formSuccess}
          </p>
        )}

        {formSuccess && token && (
          <MainButton href="/login" className="mt-5 mx-auto" secondaryStyle>
            Увійти
          </MainButton>
        )}

        {!formSuccess && (
          <MainButton
            className="mt-5 mx-auto"
            secondaryStyle
            disabled={isLoading}
          >
            {isLoading ? 'Зачекайте...' : 'Відправити'}
          </MainButton>
        )}
      </form>
    </section>
  )
}

export default PasswordReset

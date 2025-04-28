'use client'

import MainButton from '@/components/ui/MainButton'
import Logo from '@/components/ui/Logo'
import Link from 'next/link'

type AuthFormProps = {
  isRegister?: boolean
}

function AuthForm({ isRegister = false }: AuthFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Тут логіка обробки реєстрації:
    // Наприклад, відправити дані на бекенд або показати помилки

    console.log('Форма відправлена')
  }

  return (
    <section className="px-4 py-8 md:w-[85%] lg:h-[80%] flex flex-col lg:flex-row items-center gap-14 lg:gap-[10%]">
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

      {/* form */}
      <div className="lg:w-1/2 h-full w-full">
        <form
          onSubmit={handleSubmit}
          className="h-full flex flex-col gap-8 form-block"
        >
          <h2 className="text-3xl lg:text-4xl">
            {isRegister ? 'Реєстрація' : 'Вхід в акаунт'}
          </h2>

          {isRegister && (
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  className="w-5 h-5"
                />
                Реєструюсь як учень
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  className="w-5 h-5"
                />
                Реєструюсь як вчитель
              </label>
            </div>
          )}

          <div className="w-full relative">
            <label className="form-label" htmlFor="email">
              Пошта<span className="text-red-500">*</span>
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

          <div className="w-full relative">
            <label className="form-label" htmlFor="password">
              Пароль<span className="text-red-500">*</span>
            </label>
            <input
              className="form-input"
              type="password"
              name="password"
              id="password"
              placeholder="Введіть свій пароль"
              required
              autoComplete={isRegister ? 'new-password' : 'current-password'}
            />
          </div>

          <MainButton type="submit" className="w-full" secondaryStyle={true}>
            {isRegister ? 'Створити акаунт' : 'Увійти'}
          </MainButton>

          <span className="text-gray-300 text-center">
            {isRegister && (
              <>
                Створюючи обліковий запис, ви приймаєте 
                <Link href="/login" className="underline-offset-4 underline">
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
              className="underline-offset-4 underline"
            >
              {isRegister ? 'Увійти' : 'Зареєструватися'}
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default AuthForm

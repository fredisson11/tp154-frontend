'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { activateUser, getUser } from '@/services/authApi'
import { Frown } from 'lucide-react'
import { Role, useAuthStore } from '@/store/useAuthStore'
import { Spinner } from '@material-tailwind/react'

type Props = {
  token: string
}

export default function ActivateClient({ token }: Props) {
  const router = useRouter()

  const setUserData = useAuthStore((state) => state.setUserData)

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  )

  const [message, setMessage] = useState('')

  useEffect(() => {
    const getData = async () => {
      // activate
      const data = await activateUser(token)

      if (!data.success) {
        setStatus('error')
        setMessage(data.message || 'Activation failed')

        return
      }

      const redirectUrl = data.redirect_to
      const parts = redirectUrl.split('/')
      const role = parts[parts.length - 3] as Role // Get the role from the last part of the URL

      if (role === 'teacher') {
        sessionStorage.setItem('teacherToken', data.access_token)
        sessionStorage.setItem('teacherRefreshToken', data.refresh_token)

        router.push('/teacher-complete')

        return
      }

      // Note: function decodeToken is not used here because the access token returned by activateUser does not contain the role.
      // The role is extracted from the redirect_to URL instead.
      const userData = await getUser(data.access_token, role)

      if (!userData.success) {
        setStatus('error')
        setMessage('User data failed, you will be redirected to login page')

        setTimeout(() => {
          router.push('/login')
        }, 2000)
        return
      }

      setUserData(
        // set user data to store
        {
          id: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          phone: userData.phone,
          photo: userData.photo,
          email: userData.email,
          role: role,
          token: data.access_token,
        },

        data.refresh_token
      )

      setStatus('success')

      setTimeout(() => {
        router.push(`/${role}`)
      }, 2000)
    }

    getData()
  }, [token, router, setUserData])

  if (status === 'loading') {
    return (
      <section className="flex justify-center">
        <p className="bg-primary p-4 rounded-2xl text-white">
          Активація акаунта...
        </p>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section>
        <p className="mx-4 bg-red-300 max-w-[500px] text-white p-8 border-4 border-red-400 rounded-2xl flex flex-col items-center gap-4">
          <span className="flex gap-2">
            <Frown /> Щось пішло не так:
          </span>
          {message}
        </p>
      </section>
    )
  }

  return (
    <section className="flex justify-center">
      <p className="bg-primary max-w-md text-white p-5 rounded-2xl text-center flex flex-col items-center gap-2 mx-4">
        <span className="text-xl">
          Активація успішна! <br />
          Вас буде перенаправлено...
        </span>

        <Spinner className="h-8 w-8 text-white/70 animate-spin" />
      </p>
    </section>
  )
}

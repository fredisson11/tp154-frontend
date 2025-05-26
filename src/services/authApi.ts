import { Role } from '@/store/useAuthStore'
import { TeacherProfileData } from '@/utils/schemas/authSchemas'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const registerUser = async (userData: {
  email: string
  password: string
  role: Role
}) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        Object.values(data).flat().join(', ') ||
          'Server error, please try again'
      )
    }

    return {
      success: true,
      message: 'Перевірте вашу пошту для активації акаунта',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Виникла помилка під час виконання запиту',
      error,
    }
  }
}

export const loginUser = async (userData: {
  email: string
  password: string
}) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.error ||
          data.detail ||
          'Wrong data or server error, please try again'
      )
    }

    return {
      ...data, // access, refresh
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Виникла помилка під час виконання запиту',
      error,
    }
  }
}

export const activateUser = async (
  token: string
): Promise<
  | {
      access_token: string
      refresh_token: string
      redirect_to: string
      message: string
      success: true
    }
  | {
      success: false
      message: string
    }
> => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/activate/${token}`, {
      method: 'GET',
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.error ||
          data.detail ||
          'Wrong data or server error, please try again'
      )
    }

    return {
      ...data, // access_token, refresh_token, redirect_to, message
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Unknown error during activation',
    }
  }
}

export const completeTeacher = async (
  data: TeacherProfileData,
  token: string
): Promise<{
  success: boolean
  message?: string
  errors?: Record<string, string[]>
}> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/user/profile/teacher/complete/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )

    const resData = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: resData.detail || resData.error || 'Server error',
        errors: typeof resData === 'object' ? resData : undefined,
      }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getUser = async (
  token: string,
  role: Role,
  redirectUrl: string = ''
): Promise<
  | {
      id: number
      first_name: string
      last_name: string
      phone: string | null
      photo: string | null
      email: string
      success: boolean
    }
  | {
      success: false
      message: string
    }
> => {
  try {
    const res = await fetch(
      redirectUrl || `${BASE_URL}/api/user/profile/${role}/me/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    const data = await res.json()

    if (!res.ok)
      throw new Error(`${data.code}: ${data.detail || 'Unauthorized'}`)

    return {
      ...data,
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Unknown error during activation',
    }
  }
}

export const refreshUser = async (
  refresjToken: string
): Promise<
  | {
      access: string
      refresh: string
      success: boolean
    }
  | { message: string; success: boolean }
> => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refresjToken }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        `${data.code}: ${
          data.detail || 'Wrong data or server error, please try again'
        }`
      )
    }

    return {
      access: data.access,
      refresh: data.refresh,
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Unknown error during activation',
    }
  }
}

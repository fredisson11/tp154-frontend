'use client'

import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  teacherProfileSchema,
  TeacherProfileData,
} from '@/utils/schemas/authSchemas'
import { completeTeacher, getUser } from '@/services/authApi'
import MainButton from '../ui/MainButton'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import {
  getCities,
  getLanguages,
  getCategories,
  getSubjects,
} from '@/services/userApi'
import { Category, City, Language, Subject } from '@/types/index'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import { Spinner } from '@material-tailwind/react'

function TeacherProfileForm() {
  const [step, setStep] = useState(1)
  const [cities, setCities] = useState<City[]>([])
  const [languages, setLanguages] = useState<Language[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const setUserData = useAuthStore((state) => state.setUserData)

  const router = useRouter()

  const methods = useForm<TeacherProfileData>({
    resolver: zodResolver(teacherProfileSchema),
    mode: 'onChange',
    defaultValues: {
      photo: null,
      teaching_experience: null,
      lesson_price: null,
    },
  })

  const { handleSubmit, trigger } = methods

  const nextStep = async () => {
    // Remove focus from button to prevent it from triggering again
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }

    let valid = false

    switch (step) {
      case 1:
        valid = await trigger([
          'first_name',
          'last_name',
          'age',
          'city',
          'teaching_experience',
          'categories',
          'languages',
        ])
        break
      case 2:
      case 3:
        valid = true
        break

      case 4:
        valid = await trigger([
          'photo',
          'phone',
          'subjects',
          'telegram',
          'whatsapp',
          'viber',
          'instagram',
        ])
        break
    }

    if (valid && step < 4) {
      setStep(step + 1)
    }
  }
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          citiesResult,
          languagesResult,
          categoriesResult,
          subjectsResult,
        ] = await Promise.all([
          getCities(),
          getLanguages(),
          getCategories(),
          getSubjects(),
        ])

        if ('success' in citiesResult && !citiesResult.success) {
          setFetchError(citiesResult.message)
        } else {
          setCities(citiesResult as { id: number; name: string }[])
        }

        if ('success' in languagesResult && !languagesResult.success) {
          setFetchError(languagesResult.message)
        } else {
          setLanguages(languagesResult as { id: number; name: string }[])
        }

        if ('success' in categoriesResult && !categoriesResult.success) {
          setFetchError(categoriesResult.message)
        } else {
          setCategories(
            categoriesResult as {
              id: number
              name: string
              name_display: string
            }[]
          )
        }

        if ('success' in subjectsResult && !subjectsResult.success) {
          setFetchError(subjectsResult.message)
        } else {
          setSubjects(subjectsResult as { id: number; name: string }[])
        }
      } catch (error) {
        setFetchError('Помилка при завантаженні даних')
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const onSubmit = async (data: TeacherProfileData) => {
    // sets values to numbers for backend
    const fixedData = {
      ...data,
      languages: data.languages.map(Number),
      categories: data.categories.map(Number),
      subjects: data.subjects.map(Number),
    }

    const token = sessionStorage.getItem('teacherToken') || ''
    const result = await completeTeacher(fixedData, token)

    if (!result.success) {
      console.error(result.errors && result.message)

      setFetchError(result.message ?? 'Помилка при завантаженні даних')

      return
    }

    // fetches user data
    const userData = await getUser(token, 'teacher')

    if (!userData.success) {
      setFetchError(
        'Something went wrong, you will be redirected to login page'
      )

      setTimeout(() => {
        router.push('/login')
      }, 2000)

      return
    }

    const refreshToken = sessionStorage.getItem('teacherRefreshToken') || ''

    setUserData(
      {
        id: userData.id,
        firstName: userData.first_name,
        lastName: userData.last_name,
        phone: userData.phone,
        photo: userData.photo,
        email: userData.email,
        role: 'teacher',
        token: token,
      },

      refreshToken
    )

    setIsSuccess(true)

    setTimeout(() => {
      router.push('/teacher')
    }, 2000)
  }

  return (
    <>
      {/* Form */}
      {!isSuccess && (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form-block mx-4 lg:mx-auto lg:w-1/2 2xl:w-1/3 p-5 md:p-10"
          >
            <h2 className="text-3xl lg:text-4xl" id="form-title">
              Реєстрація вчителя
            </h2>

            <p>Крок {step}/4</p>

            {fetchError && <div className="text-error mb-4">{fetchError}</div>}

            {step === 1 && (
              <StepOne
                cities={cities}
                languages={languages}
                categories={categories}
              />
            )}

            {step === 2 && <StepTwo />}

            {step === 3 && <StepThree />}

            {step === 4 && <StepFour subjects={subjects} />}

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
              {step < 4 ? (
                <MainButton type="button" onClick={nextStep} secondaryStyle>
                  Вперед
                </MainButton>
              ) : (
                <MainButton type="submit" secondaryStyle>
                  Зберегти
                </MainButton>
              )}
              {step > 1 && (
                <MainButton
                  className="bg-gray-300"
                  secondaryStyle
                  type="button"
                  onClick={prevStep}
                >
                  Назад
                </MainButton>
              )}
            </div>
          </form>
        </FormProvider>
      )}

      {/* Success */}
      {isSuccess && (
        <section className="bg-primary m-2 md:mx-auto p-10 md:w-1/3 rounded-2xl text-white flex items-center justify-center flex-col">
          <h2 className="text-2xl font-semibold mb-4">
            Дані успішно збережені!
          </h2>

          <p className="text-center">Вас буде перенаправлено</p>

          <Spinner className="h-8 w-8 text-white/70 mt-4 animate-spin" />
        </section>
      )}
    </>
  )
}

export default TeacherProfileForm

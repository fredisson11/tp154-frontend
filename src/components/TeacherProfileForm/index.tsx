'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  teacherProfileSchema,
  TeacherProfileData,
} from '@/utils/schemas/authSchemas'
import { completeTeacher } from '@/services/authApi'
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

function TeacherProfileForm() {
  const [step, setStep] = useState(1)
  const [cities, setCities] = useState<{ id: number; name: string }[]>([])
  const [languages, setLanguages] = useState<{ id: number; name: string }[]>([])
  const [categories, setCategories] = useState<
    { id: number; name: string; name_display: string }[]
  >([])
  const [subjects, setSubjects] = useState<{ id: number; name: string }[]>([])
  const [fetchError, setFetchError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
  } = useForm<TeacherProfileData>({
    resolver: zodResolver(teacherProfileSchema),
    mode: 'onChange',
  })

  const nextStep = async () => {
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

    if (valid) setStep((prev) => Math.min(prev + 1, 4))
  }
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          watch('first_name') &&
          watch('last_name') &&
          watch('categories')?.length > 0 &&
          watch('languages')?.length > 0
        )
      case 2:
      case 3:
        return true
      case 4:
        return watch('subjects')?.length > 0
      default:
        return false
    }
  }

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
    const token = localStorage.getItem('access_token') || ''
    const result = await completeTeacher(data, token)

    if (!result.success) {
      console.error(result.errors || result.message)
    } else {
      console.log('Успіх')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-block mx-4 lg:mx-auto lg:w-1/2 2xl:w-1/3 p-5 md:p-10"
    >
      <h2 className="text-3xl lg:text-4xl" id="form-title">
        Реєстрація вчителя
      </h2>

      <p>Крок {step}/4</p>

      {fetchError && <div className="text-red-500 mb-4">{fetchError}</div>}

      {step === 1 && (
        <StepOne
          register={register}
          errors={errors}
          cities={cities}
          languages={languages}
          categories={categories}
        />
      )}

      {step === 2 && <StepTwo register={register} errors={errors} />}

      {step === 3 && <StepThree register={register} errors={errors} />}

      {step === 4 && (
        <StepFour
          register={register}
          errors={errors}
          subjects={subjects.map((s) => ({
            id: s.id.toString(),
            name: s.name,
          }))}
        />
      )}

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
        {step < 4 ? (
          <MainButton
            type="button"
            onClick={nextStep}
            secondaryStyle
            disabled={!isStepValid()}
          >
            Вперед
          </MainButton>
        ) : (
          <MainButton type="submit" secondaryStyle disabled={!isValid}>
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
  )
}

export default TeacherProfileForm

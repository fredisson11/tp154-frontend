import { TeacherProfileData } from '@/utils/schemas/authSchemas'
import { useFormContext } from 'react-hook-form'

function StepThree() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TeacherProfileData>()

  return (
    <section aria-labelledby="step-three-title">
      <div className="space-y-6">
        {/* Education */}
        <div className="relative">
          <label htmlFor="education" className="form-label">
            Моя освіта
          </label>

          <textarea
            className="form-input min-h-[200px]"
            id="education"
            aria-invalid={errors.education ? true : false}
            aria-describedby="education-error"
            {...register('education')}
            placeholder="У 2018 році закінчила КНУ імені Тараса Шевченка..."
          />

          {errors.education && (
            <p id="education-error" className="text-error text-sm" role="alert">
              {errors.education.message}
            </p>
          )}
        </div>

        {/* Lesson flow */}
        <div className="relative">
          <label htmlFor="lesson_flow" className="form-label">
            Як проходить урок
          </label>

          <textarea
            className="form-input min-h-[200px] md:min-w-[500px]"
            id="lesson_flow"
            aria-invalid={errors.lesson_flow ? true : false}
            aria-describedby="lesson-flow-error"
            {...register('lesson_flow')}
            placeholder="Тривалість уроку, технічні інструменти"
          />

          {errors.lesson_flow && (
            <p
              id="lesson-flow-error"
              className="text-error text-sm"
              role="alert"
            >
              {errors.lesson_flow.message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default StepThree

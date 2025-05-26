import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { TeacherProfileData } from '@/utils/schemas/authSchemas'

interface StepTwoProps {
  register: UseFormRegister<TeacherProfileData>
  errors: FieldErrors<TeacherProfileData>
}

function StepTwo({ register, errors }: StepTwoProps) {
  return (
    <section className="w-full space-y-10">
      <div className="relative">
        <label className="form-label" htmlFor="about_me">
          Про себе
        </label>
        <textarea
          id="about_me"
          className="form-input min-h-[200px]"
          {...register('about_me')}
          placeholder="Моя основна мета як репетитора - це..."
          aria-describedby="aboutMeHelp"
        />
        {errors.about_me && (
          <p id="aboutMeHelp" className="text-red-500 text-sm">
            {errors.about_me.message}
          </p>
        )}
      </div>

      <div className="relative">
        <label className="form-label" htmlFor="hobbies">
          Мої хобі
        </label>

        <textarea
          id="hobbies"
          className="form-input min-h-[200px]"
          {...register('hobbies')}
          placeholder="У вільний час люблю займатися..."
          aria-describedby="hobbiesHelp"
        />
        {errors.hobbies && (
          <p id="hobbiesHelp" className="text-red-500 text-sm">
            {errors.hobbies.message}
          </p>
        )}
      </div>
    </section>
  )
}

export default StepTwo

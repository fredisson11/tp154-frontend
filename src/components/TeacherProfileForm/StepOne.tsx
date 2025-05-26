'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { TeacherProfileData } from '@/utils/schemas/authSchemas'
import FormSelect from '@/components/TeacherProfileForm/FormSelect'
import FormCheckbox from '@/components/TeacherProfileForm/FormCheckbox'

interface StepOneProps {
  register: UseFormRegister<TeacherProfileData>
  errors: FieldErrors<TeacherProfileData>
  cities: { id: number; name: string }[]
  languages: { id: number; name: string }[]
  categories: { id: number; name: string; name_display: string }[]
}

function StepOne({
  register,
  errors,
  cities,
  languages,
  categories,
}: StepOneProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* First Name */}
      <div className="relative">
        <label className="form-label" htmlFor="first_name">
          Ім&apos;я<span className="text-red-500">*</span>
        </label>
        <input
          className="form-input w-full"
          {...register('first_name')}
          placeholder="Ім'я"
          aria-invalid={!!errors.first_name}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.first_name.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="relative">
        <label className="form-label" htmlFor="last_name">
          Прізвище<span className="text-red-500">*</span>
        </label>

        <input
          className="form-input w-full"
          {...register('last_name')}
          placeholder="Прізвище"
          aria-invalid={!!errors.last_name}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        {errors.last_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.last_name.message}
          </p>
        )}
      </div>

      {/* Age */}
      <div className="relative">
        <label className="form-label" htmlFor="age">
          Вік
        </label>

        <input
          className="form-input w-full"
          type="number"
          {...register('age', { min: 1 })}
          placeholder="Вік"
          aria-invalid={!!errors.age}
          inputMode="numeric"
          pattern="[0-9]*"
        />

        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
        )}
      </div>

      {/* City Select */}
      <FormSelect
        label="Місто"
        options={cities.map((city) => ({
          value: city.name,
          label: city.name,
        }))}
        placeholder="Виберіть місто"
        {...register('city')}
        error={errors.city?.message}
        className="col-span-1 md:col-span-2"
      />

      {/* Teaching Experience */}
      <div className="relative">
        <label className="form-label" htmlFor="teaching_experience">
          Стаж викладання (роки)
        </label>

        <input
          className="form-input w-full"
          type="number"
          {...register('teaching_experience')}
          placeholder="Наприклад: 3"
          aria-invalid={!!errors.teaching_experience}
          inputMode="numeric"
          pattern="[0-9]*"
        />

        {errors.teaching_experience && (
          <p className="text-red-500 text-sm mt-1">
            {errors.teaching_experience.message}
          </p>
        )}
      </div>

      {/* Categories Select */}
      <FormSelect
        label="Класи викладання"
        options={categories.map((cat) => ({
          value: cat.name,
          label: cat.name_display,
        }))}
        placeholder="Оберіть клас"
        {...register('categories')}
        error={errors.categories?.message}
        className="col-span-1 md:col-span-2"
        required
      />

      {/* Languages Checkboxes */}
      <FormCheckbox
        name="languages"
        items={languages}
        register={register}
        errors={errors}
        title="Оберіть мови, якими ви володієте:"
        required
      />
    </div>
  )
}

export default StepOne

'use client'

import { useFormContext } from 'react-hook-form'
import { TeacherProfileData } from '@/utils/schemas/authSchemas'
import FormSelect from '@/components/TeacherProfileForm/FormSelect'
import FormCheckbox from '@/components/TeacherProfileForm/FormCheckbox'
import { Category, City, Language } from '@/types/index'
import classNames from 'classnames'

interface StepOneProps {
  cities: City[]
  languages: Language[]
  categories: Category[]
}

function StepOne({ cities, languages, categories }: StepOneProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TeacherProfileData>()

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* First Name */}
      <div className="relative">
        <label className="form-label" htmlFor="first_name">
          Ім&apos;я<span className="text-error">*</span>
        </label>

        <input
          className={classNames('form-input w-full', {
            'border-error': errors.first_name,
          })}
          {...register('first_name')}
          placeholder="Ім'я"
          aria-invalid={!!errors.first_name}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        {errors.first_name && (
          <p className="text-error text-sm mt-1">{errors.first_name.message}</p>
        )}
      </div>

      {/* Last Name */}
      <div className="relative">
        <label className="form-label" htmlFor="last_name">
          Прізвище<span className="text-error">*</span>
        </label>

        <input
          className={classNames('form-input w-full', {
            'border-error': errors.first_name,
          })}
          {...register('last_name')}
          placeholder="Прізвище"
          aria-invalid={!!errors.last_name}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        {errors.last_name && (
          <p className="text-error text-sm mt-1">{errors.last_name.message}</p>
        )}
      </div>

      {/* Age */}
      <div className="relative">
        <label className="form-label" htmlFor="age">
          Вік<span className="text-error">*</span>
        </label>

        <input
          className={classNames('form-input w-full', {
            'border-error': errors.age,
          })}
          type="number"
          {...register('age', {
            min: 1,
          })}
          placeholder="Вік"
          aria-invalid={!!errors.age}
          inputMode="numeric"
          required
        />

        {errors.age && (
          <p className="text-error text-sm mt-1">{errors.age.message}</p>
        )}
      </div>

      {/* City Select */}
      <FormSelect
        label="Місто"
        options={cities.map((city) => ({
          value: city.id.toString(),
          label: city.name,
        }))}
        placeholder="Виберіть місто"
        {...register('city')}
        error={errors.city?.message}
        className="col-span-1 md:col-span-2"
        required
      />

      {/* Teaching Experience */}
      <div className="relative">
        <label className="form-label" htmlFor="teaching_experience">
          Стаж викладання (роки)
        </label>

        <input
          className="form-input w-full"
          type="number"
          {...register('teaching_experience', {
            setValueAs: (value) => (value === '' ? null : value),
          })}
          placeholder="Наприклад: 3"
          aria-invalid={!!errors.teaching_experience}
          inputMode="numeric"
        />

        {errors.teaching_experience && (
          <p className="text-error text-sm mt-1">
            {errors.teaching_experience.message}
          </p>
        )}
      </div>

      {/* Categories Checkboxes */}
      <FormCheckbox
        name="categories"
        items={categories}
        title="Класи викладання:"
        required
      />

      {/* Languages Checkboxes */}
      <FormCheckbox
        name="languages"
        items={languages}
        title="Оберіть мови, якими ви володієте:"
        required
      />
    </div>
  )
}

export default StepOne

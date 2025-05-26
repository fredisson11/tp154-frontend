import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { TeacherProfileData } from '@/utils/schemas/authSchemas'

interface FormCheckboxProps {
  name: keyof TeacherProfileData
  items: { id: number; name: string }[]
  register: UseFormRegister<TeacherProfileData>
  errors: FieldErrors<TeacherProfileData>
  title: string
  required?: boolean
}

function FormCheckbox({
  name,
  items,
  register,
  errors,
  title,
  required = false,
}: FormCheckboxProps) {
  return (
    <div className="relative col-span-1 md:col-span-2 mt-4">
      <fieldset>
        <legend className="form-label">
          {title}

          {required && <span className="text-red-500">*</span>}
        </legend>

        <div className="form-checkbox-block gap-3 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center">
              <input
                type="checkbox"
                id={`${name}-${item.id}`}
                value={item.name}
                {...register(name)}
                className="form-checkbox"
                aria-invalid={!!errors[name]}
              />
              <label
                htmlFor={`${name}-${item.id}`}
                className="ml-2 cursor-pointer"
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  )
}

export default FormCheckbox

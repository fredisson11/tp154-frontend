import { TeacherProfileData } from '@/utils/schemas/authSchemas'
import { useFormContext } from 'react-hook-form'

interface FormCheckboxProps {
  name: keyof TeacherProfileData
  items: { id: number; name: string }[]
  title: string
  required?: boolean
}
function FormCheckbox({
  name,
  items,
  title,
  required = false,
}: FormCheckboxProps) {
  const {
    // register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<TeacherProfileData>()

  return (
    <div className="relative col-span-1 md:col-span-2 mt-4">
      <fieldset>
        <legend className="form-label">
          {title}

          {required && <span className="text-error">*</span>}
        </legend>

        <div className="form-checkbox-block gap-4 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center">
              <input
                type="checkbox"
                id={`${name}-${item.id}`}
                value={item.id}
                onChange={(e) => {
                  const checked = e.target.checked
                  const value = e.target.value

                  const rawValues = getValues(name)
                  const currentValues = Array.isArray(rawValues)
                    ? rawValues
                    : []

                  const newValues = checked
                    ? [...currentValues, value]
                    : currentValues.filter((v) => v !== value)

                  setValue(name, newValues)
                }}
                className="form-checkbox"
                aria-invalid={!!errors[name]}
              />

              <label
                htmlFor={`${name}-${item.id}`}
                className="ml-2 cursor-pointer text-base"
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      {errors[name] && (
        <p className="text-error text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  )
}

export default FormCheckbox

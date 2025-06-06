import { forwardRef, SelectHTMLAttributes } from 'react'

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        {label && (
          <label className="form-label">
            {label}

            {props.required && <span className="text-error">*</span>}
          </label>
        )}

        <div className="form-select">
          <select
            ref={ref}
            className={`${className} ${error ? 'border-error' : ''}`}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-error text-sm mt-1">{error}</p>}
      </div>
    )
  }
)

FormSelect.displayName = 'FormSelect'

export default FormSelect

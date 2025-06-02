import { TeacherProfileData } from '@/utils/schemas/authSchemas'
import FormCheckbox from '@/components/TeacherProfileForm/FormCheckbox'
import { Subject } from '@/types/index'
import PhotoUploader from '../PhotoUploader'
import { useFormContext } from 'react-hook-form'

interface StepFourProps {
  subjects: Subject[]
}

function StepFour({ subjects }: StepFourProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TeacherProfileData>()

  return (
    <section aria-labelledby="step-four-title" className="w-full">
      <h2 id="step-four-title" className="sr-only">
        Контактні дані
      </h2>

      {/* Form */}
      <div className="space-y-6 w-full">
        {/* photo */}
        <PhotoUploader />

        {/* lesson_price */}
        <div className="relative">
          <label htmlFor="lesson_price" className="form-label">
            Ціна уроку (за годину)
          </label>

          <input
            className="form-input block w-full"
            type="number"
            {...register('lesson_price', {
              setValueAs: (value) => (value === '' ? null : value),
            })}
            placeholder="Наприклад: 250"
            aria-invalid={errors.lesson_price ? true : false}
            aria-describedby="lesson-price-error"
          />

          {errors.lesson_price && (
            <p
              id="lesson-price-error"
              className="text-error text-sm mt-1"
              role="alert"
            >
              {errors.lesson_price.message}
            </p>
          )}
        </div>

        {/* phone */}
        <div className="relative">
          <label htmlFor="phone" className="form-label">
            Телефон
          </label>
          <input
            className="form-input block w-full"
            {...register('phone', { required: true })}
            placeholder="Телефон"
            aria-invalid={errors.phone ? true : false}
            aria-describedby="phone-error"
          />
          {errors.phone && (
            <p
              id="phone-error"
              className="text-error text-sm mt-1"
              role="alert"
            >
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* subjects */}
        <FormCheckbox
          title="Оберіть сфери надання послуг:"
          name="subjects"
          items={subjects}
          required
        />

        {/* socials */}
        <div className="grid grid-cols-2 gap-4">
          {/* telegram */}
          <div className="relative ">
            <label htmlFor="telegram" className="form-label">
              Telegram
            </label>
            <input
              className="form-input block w-full"
              {...register('telegram')}
              placeholder="Telegram"
              aria-invalid={errors.telegram ? true : false}
              aria-describedby="telegram-error"
            />
            {errors.telegram && (
              <p
                id="telegram-error"
                className="text-error text-sm mt-1"
                role="alert"
              >
                {errors.telegram.message}
              </p>
            )}
          </div>

          {/* whatsapp */}
          <div className="relative">
            <label htmlFor="whatsapp" className="form-label">
              WhatsApp
            </label>
            <input
              className="form-input block w-full"
              {...register('whatsapp')}
              placeholder="WhatsApp"
              aria-invalid={errors.whatsapp ? true : false}
              aria-describedby="whatsapp-error"
            />
            {errors.whatsapp && (
              <p
                id="whatsapp-error"
                className="text-error text-sm mt-1"
                role="alert"
              >
                {errors.whatsapp.message}
              </p>
            )}
          </div>

          {/* viber */}
          <div className="relative">
            <label htmlFor="viber" className="form-label">
              Viber
            </label>
            <input
              className="form-input block w-full"
              {...register('viber')}
              placeholder="Viber"
              aria-invalid={errors.viber ? true : false}
              aria-describedby="viber-error"
            />
            {errors.viber && (
              <p
                id="viber-error"
                className="text-error text-sm mt-1"
                role="alert"
              >
                {errors.viber.message}
              </p>
            )}
          </div>

          {/* instagram */}
          <div className="relative">
            <label htmlFor="instagram" className="form-label">
              Instagram
            </label>
            <input
              className="form-input block w-full"
              {...register('instagram')}
              placeholder="Instagram"
              aria-invalid={errors.instagram ? true : false}
              aria-describedby="instagram-error"
            />
            {errors.instagram && (
              <p
                id="instagram-error"
                className="text-error text-sm mt-1"
                role="alert"
              >
                {errors.instagram.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StepFour

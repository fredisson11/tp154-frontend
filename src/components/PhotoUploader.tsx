'use client'

import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { TeacherProfileData } from '@/utils/schemas/authSchemas'
import Image from 'next/image'

export default function PhotoUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const {
    setValue,
    formState: { errors },
  } = useFormContext<TeacherProfileData>()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('Розмір фото не повинен перевищувати 5MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      setValue('photo', base64, { shouldValidate: true })
      setImageSrc(base64)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col items-start gap-2 relative">
      <label className="mx-auto">Фото профілю</label>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer mx-auto w-34 h-34 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-blue-500 transition"
      >
        {!imageSrc ? (
          <span className="text-3xl">+</span>
        ) : (
          <Image
            src={imageSrc}
            alt="Uploaded image"
            width={136}
            height={136}
            style={{ objectFit: 'cover', borderRadius: '50%' }}
            className="w-33 h-33"
          />
        )}
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {errors.photo && (
        <p className="text-error text-sm">{errors.photo.message}</p>
      )}
    </div>
  )
}

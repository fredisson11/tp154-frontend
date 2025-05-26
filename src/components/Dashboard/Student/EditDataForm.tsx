'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import DashboardButton from '@/components/Dashboard/DashboardUi/DashboardButton'

const EditDataForm = () => {
  const [formData, setFormData] = useState({
    firstName: 'Андрій',
    lastName: 'Астроплюсов',
    email: 'andrew_pro@gmail.com',
    password: '123123',
    confirmPassword: '123123',
    phone: '+380 76 537 3842',
  })

  const [passwordError, setPasswordError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError(
        name === 'password'
          ? value !== formData.confirmPassword
          : value !== formData.password
      )
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true)
      return
    }
    console.log(formData)
  }

  return (
    <div className="w-full md:w-3/4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-500">Ім&apos;я:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="dashboard-input"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500">Прізвище:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="dashboard-input"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500">Номер телефону:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="dashboard-input"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500">Електронна пошта:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="dashboard-input"
              />
            </div>

            <div className="flex flex-col relative">
              <label className="text-gray-500">Пароль:</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="dashboard-input pr-8"
              />
              <button
                type="button"
                className="absolute right-0 bottom-2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Image
                  src={
                    showPassword ? '/eye-open-icon.svg' : '/eye-closed-icon.svg'
                  }
                  alt="eye icon"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </button>
            </div>

            <div className="flex flex-col relative">
              <label className="text-gray-500">Підтвердіть пароль:</label>

              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`dashboard-input ${
                  passwordError ? 'border-red-500' : ''
                } pr-8`}
              />
              <button
                type="button"
                className="absolute right-0 bottom-2"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <Image
                  src={
                    showConfirmPassword
                      ? '/eye-open-icon.svg'
                      : '/eye-closed-icon.svg'
                  }
                  alt="eye icon"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </button>
              {passwordError && (
                <span className="absolute bottom-0 translate-y-6 text-red-500 text-sm mt-1 flex items-center">
                  <X className="w-6 h-6 mr-1" /> Паролі не співпадають
                </span>
              )}
            </div>
          </div>

          <DashboardButton
            type="submit"
            className="mt-[5%] md:mt-[3%] ml-auto w-full md:max-w-1/3"
            disabled={passwordError}
          >
            Зберегти
          </DashboardButton>
        </div>
      </form>
    </div>
  )
}

export default EditDataForm

'use client'

import MainButton from '@/components/ui/MainButton'
import Image from 'next/image'
import CustomSelect from '@/components/ui/CustomSelect'
import Calendar from '@/components/Calendar'
import TimePicker from '../ui/TimePicker'
import { useState } from 'react'

interface BookingModalProps {
  name: string
  onClose: () => void
}

const BookingModal = ({ name, onClose }: BookingModalProps) => {
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])

  const subjectOptions = [
    'Математика',
    'Фізика',
    'Хімія',
    'Українська мова',
    'Англійська мова',
  ]

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTimeSlots([]) // Скидаємо вибір часу при зміні дати
  }

  const handleTimeSelect = (time: string) => {
    if (selectedTimeSlots.length >= 2 && !selectedTimeSlots.includes(time))
      return
    setSelectedTimeSlots((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    )
  }

  const handleBookLesson = () => {
    if (!selectedSubject || !selectedDate || selectedTimeSlots.length === 0) {
      alert('Будь ласка, заповніть всі поля')
      return
    }

    console.log('Бронювання:', {
      teacher: name,
      subject: selectedSubject,
      date: selectedDate,
      timeSlots: selectedTimeSlots,
    })

    // Тут буде логіка відправки на сервер
    onClose()
  }

  return (
    <div className="py-6 md:py-10">
      <div className="text-center mb-6">
        <h2 className="mb-2">Записатися на урок до:</h2>
        <h1 className="hidden md:block">{name}</h1>
      </div>

      <div className="flex flex-col md:flex-row md:justify-around gap-8 lg:gap-12 m-8">
        <Image
          src="/icon-user.png"
          alt={name}
          className="rounded-3xl mx-auto md:mx-0"
          width={200}
          height={200}
        />

        <h1 className="md:hidden">{name}</h1>

        <div className="mb-6 flex flex-col items-center min-w-[200px] w-1/2 lg:w-1/3 mx-auto lg:mx-0">
          <h3 className="mb-2 text-center">
            Обрати предмет <span className="text-red-500">*</span>
          </h3>

          <CustomSelect
            options={subjectOptions}
            defaultOption="Виберіть предмет"
            onSelect={handleSubjectSelect}
            className="md:w-full"
            buttonClassName="py-2 w-full text-xl"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8 lg:w-[80%] lg:mx-auto px-2">
        <div>
          <h3 className="text-lg font-medium mb-4 text-center">Обрати день</h3>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 text-center">Обрати час</h3>
          <div className="flex flex-col justify-between">
            <TimePicker
              selectedDate={selectedDate}
              selectedTimeSlots={selectedTimeSlots}
              onTimeSelect={handleTimeSelect}
            />

            <MainButton className="w-full mt-8" onClick={handleBookLesson}>
              Забронювати урок
            </MainButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingModal

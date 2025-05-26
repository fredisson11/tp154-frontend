'use client'

interface TimePickerProps {
  selectedDate: Date | null
  selectedTimeSlots: string[]
  onTimeSelect: (time: string) => void
}

const TimePicker = ({
  selectedDate,
  selectedTimeSlots,
  onTimeSelect,
}: TimePickerProps) => {
  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ]

  const monthNames = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ]

  const formatDate = (date: Date | null) => {
    if (!date) return 'Оберіть день'
    const day = date.getDate()
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
  }

  // Форматуємо вибрані слоти для відображення (наприклад: "13:00 - 14:00")
  const formatBookedSlots = () => {
    return selectedTimeSlots
      .sort()
      .map((time) => `${time} - ${parseInt(time.split(':')[0]) + 1}:00`)
      .join(', ')
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="mb-4">
        <p className="font-medium text-center">{formatDate(selectedDate)}</p>
        {selectedTimeSlots.length > 0 && (
          <p className="text-gray-500 text-sm text-center">
            Зайнятий час: {formatBookedSlots()}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {timeSlots.map((time) => {
          const isSelected = selectedTimeSlots.includes(time)

          return (
            <button
              key={time}
              onClick={() => onTimeSelect(time)}
              className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                isSelected
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
            >
              {time}
            </button>
          )
        })}
      </div>

      {/* {selectedTimeSlots.length > 0 && (
        <p className="text-sm text-center mb-4">
          Вибрано: {selectedTimeSlots.sort().join(', ')}
        </p>
      )} */}
    </div>
  )
}

export default TimePicker

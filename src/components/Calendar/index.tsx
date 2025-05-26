'use client'

import classNames from 'classnames'
import MonthSelector from './MonthSelector'
import { useCalendar } from '@/hooks/useCalendar'

interface CalendarProps {
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
  className?: string
}

const Calendar = ({ selectedDate, onDateSelect, className }: CalendarProps) => {
  const { currentDate, prevMonth, nextMonth, renderCalendarDays } =
    useCalendar()
  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']

  const handleDateClick = (date: Date) => {
    onDateSelect(date)
  }

  const weeks = renderCalendarDays()

  return (
    <div className={classNames('border rounded-lg p-4', className)}>
      {/* Month selector */}
      <MonthSelector
        currentDate={currentDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />

      {/* Calendar */}
      <table className="w-full">
        {/* Week days */}
        <thead>
          <tr>
            {dayNames.map((day) => (
              <th key={day} className="p-2 text-center font-normal">
                {day}
              </th>
            ))}
          </tr>
        </thead>

        {/* Calendar days */}
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={`week-${weekIndex}`}>
              {week.map((day, dayIndex) => {
                const isSelected =
                  selectedDate?.getDate() === day.day &&
                  selectedDate?.getMonth() === currentDate.getMonth() &&
                  selectedDate?.getFullYear() === currentDate.getFullYear()

                return (
                  // Calendar day
                  <td
                    key={`day-${weekIndex}-${dayIndex}`}
                    className={classNames(
                      'p-2 text-center cursor-pointer rounded-full',
                      {
                        'bg-blue-500 text-white':
                          day.isCurrentMonth && isSelected,
                        'hover:bg-gray-100': day.isCurrentMonth && !isSelected,
                        'text-gray-400': !day.isCurrentMonth,
                      }
                    )}
                    onClick={() => handleDateClick(day.date)}
                  >
                    {day.day}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Calendar

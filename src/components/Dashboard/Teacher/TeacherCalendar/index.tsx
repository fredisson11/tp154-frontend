'use client'

import { useState } from 'react'
import classNames from 'classnames'
import MonthSelector from '@/components/Calendar/MonthSelector'
import WeekDays from '@/components/Dashboard/Teacher/TeacherCalendar/WeekDays'
import { useCalendar } from '@/hooks/useCalendar'

interface TeacherCalendarProps {
  className?: string
}

function TeacherCalendar({}: TeacherCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const { currentDate, prevMonth, nextMonth, renderCalendarDays } =
    useCalendar()

  const weeks = renderCalendarDays()

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    // Тут можна додати додаткову логіку при виборі дати
  }

  return (
    <>
      <div className="flex gap-12">
        {/* Date type selector */}
        <div className="flex items-center gap-2 text-xl font-medium">
          <span className="text-gray-400 p-2 border-b-2 cursor-pointer">
            Тиждень
          </span>

          <span className="p-2 border-b-2 cursor-pointer">Місяць</span>
        </div>

        {/* Month selector */}
        <MonthSelector
          currentDate={currentDate}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
          ChevronSize={8}
        />
      </div>

      {/* Week days */}
      <WeekDays />

      {/* Calendar days grid */}
      <div className="grid grid-cols-7 gap-[3px]">
        {weeks.flat().map((day, index) => (
          <div
            key={`day-${index}`}
            className={classNames(
              'min-h-24 px-[2px] py-1 rounded-sm cursor-pointer',
              {
                'bg-[#EFEFEF]':
                  day.isCurrentMonth && selectedDate?.getDate() !== day.day,

                'bg-primary':
                  day.isCurrentMonth && selectedDate?.getDate() === day.day,

                'border-gray-200': day.isCurrentMonth,
                'border-gray-100 text-gray-400': !day.isCurrentMonth,
              }
            )}
            onClick={() => handleDateClick(day.date)}
          >
            <div className="font-medium mb-1">{day.day}</div>
            {/* Вміст плитки */}

            <div className="space-y-1">
              {/* Приклад учня - замініть на реальні дані */}
              {day.isCurrentMonth && (
                <>
                  {/* Student */}
                  <div
                    className={classNames(
                      'text-xs p-1 rounded cursor-pointer bg-white ',
                      {
                        'hover:bg-primary hover:text-white group':
                          selectedDate?.getDate() !== day.day,
                      }
                    )}
                  >
                    {/* Time */}
                    <span className={classNames('block', {})}>14:00</span>

                    {/* Name */}
                    <span className={classNames('', {})}>Іваненко Денис</span>
                  </div>

                  {/* Free time */}
                  <div className="text-xs p-1 rounded cursor-pointer bg-white">
                    15:00 вільний слот
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TeacherCalendar

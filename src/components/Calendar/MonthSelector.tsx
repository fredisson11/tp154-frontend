import classNames from 'classnames'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MonthSelectorProps {
  currentDate: Date
  onPrevMonth: () => void
  onNextMonth: () => void
  ChevronSize?: number
  className?: string
}

const MonthSelector = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  ChevronSize = 5,
  className,
}: MonthSelectorProps) => {
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

  return (
    <div className={classNames('flex gap-2 items-center', className)}>
      <button
        onClick={onPrevMonth}
        className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
      >
        <ChevronLeft className={`w-${ChevronSize} h-${ChevronSize}`} />
      </button>

      {/* Months */}
      <div className="flex justify-around items-center gap-4">
        <h3 className="font-medium p-2 border-b-2 text-gray-400">
          {monthNames[currentDate.getMonth() - 1]}, {currentDate.getFullYear()}
        </h3>

        <h3 className="font-medium p-2 border-b-2">
          {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
        </h3>

        <h3 className="font-medium p-2 border-b-2 text-gray-400">
          {monthNames[currentDate.getMonth() + 1]}, {currentDate.getFullYear()}
        </h3>
      </div>

      <button
        onClick={onNextMonth}
        className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
      >
        <ChevronRight className={`w-${ChevronSize} h-${ChevronSize}`} />
      </button>
    </div>
  )
}

export default MonthSelector

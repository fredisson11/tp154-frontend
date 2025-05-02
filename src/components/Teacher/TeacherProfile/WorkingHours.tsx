import classNames from 'classnames'

const WorkingHours = ({ className }: { className?: string }) => {
  const workingDays = [
    { day: 'Понеділок', hours: '09:00 - 18:00' },
    { day: 'Вівторок', hours: '09:00 - 18:00' },
    { day: 'Середа', hours: '09:00 - 18:00' },
    { day: 'Четвер', hours: '09:00 - 18:00' },
    { day: 'Пʼятниця', hours: '09:00 - 18:00' },
    { day: 'Субота', hours: 'Вихідний' },
    { day: 'Неділя', hours: 'Вихідний' },
  ]

  return (
    <div className={classNames('text-lg lg:text-base	', className)}>
      <p className="mb-2 text-gray-500">Години роботи:</p>

      <ul className="list-none space-y-1">
        {workingDays.map(({ day, hours }) => (
          <li key={day} className="flex gap-8 justify-between">
            <span className="font-medium">{day}:</span>
            {hours.includes('Вихідний') ? (
              <span>{hours}</span>
            ) : (
              <span>
                <span className="text-gray-500">з</span> {hours.split(' - ')[0]}{' '}
                <span className="text-gray-500 pl-4">до</span>{' '}
                {hours.split(' - ')[1]}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WorkingHours

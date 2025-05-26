const weekDays = [
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четвер',
  'Пʼятниця',
  'Субота',
  'Неділя',
]

function WeekDays() {
  return (
    <div className="my-6 grid grid-cols-7 gap-[3px]">
      {weekDays.map((day, index) => (
        <div
          key={index}
          className="bg-white py-2 text-center rounded-sm font-semibold shadow-md/3"
        >
          {day}
        </div>
      ))}
    </div>
  )
}

export default WeekDays

import { ClassInfo } from '@/types/index'
import ClassRow from '@/components/Dashboard/Student/ClassRow'

const ClassTable = () => {
  const classes: ClassInfo[] = [
    {
      teacher: 'Марія Дорошевська',
      subject: 'Англійська мова',
      dateTime: 'Пт, 25 квітня, 19:00',
    },
    {
      teacher: 'Іван Калюжний',
      subject: 'Математика',
      dateTime: 'Пн, 28 квітня, 15:00',
    },
  ]

  return (
    <table className="w-full border-separate border-spacing-y-3">
      <thead>
        <tr className="text-left text-gray-400">
          <th className="hidden md:table-cell py-2 pl-6 font-normal">
            Вчитель
          </th>
          <th className="hidden lg:table-cell py-2 font-normal">Предмет</th>
          <th className="hidden md:table-cell py-2 font-normal">Дата і час</th>
          <th className="hidden lg:table-cell py-2"></th>
        </tr>
      </thead>

      <tbody>
        {classes.map((classInfo, index) => (
          <ClassRow key={index} classInfo={classInfo} />
        ))}
      </tbody>
    </table>
  )
}

export default ClassTable

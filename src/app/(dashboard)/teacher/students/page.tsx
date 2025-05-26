import { Search } from 'lucide-react'

const students = [
  { lastName: 'Іванов', firstName: 'Іван' },
  { lastName: 'Петренко', firstName: 'Ігор' },
  { lastName: 'Петренко', firstName: 'Іван' },
  { lastName: 'Дорошенко', firstName: 'Аліса' },
  { lastName: 'Гринько', firstName: 'Дмитро' },
]

function TeacherStudentsPage() {
  return (
    <section className="dashboard-container space-y-12">
      {/* Search */}
      <div className="lg:w-1/2 py-2 border-b-2 border-gray-400 flex items-center">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          className="flex-1 text-lg ml-2"
          type="text"
          placeholder="Пошук учня"
        />
      </div>

      {/* Table */}
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-400 text-left">
            <th className="p-6">Прізвище</th>
            <th className="p-6">Ім&apos;я</th>
            <th className="p-6"></th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={`${student.lastName}-${student.firstName}`}
              className="group transition-colors delay-30 shadow-lg/5 p-6 bg-white hover:bg-primary hover:text-white cursor-pointer"
            >
              <td className="p-6 rounded-l-sm">{student.lastName}</td>
              <td className="p-6">{student.firstName}</td>

              <td className="p-6 rounded-r-sm text-right">
                <span className="p-2 text-red-500 group-hover:text-white underline underline-offset-2">
                  Видалити учня
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default TeacherStudentsPage

import ClassTable from '@/components/Dashboard/Student/ClassTable'
import Link from 'next/link'

function StudentPage() {
  return (
    <>
      <div className="dashboard-container dashboard-block mt-10">
        <h2 className="text-left font-semibold mb-5">
          Уроки <span className="text-gray-400">(2)</span>
        </h2>

        <ClassTable />
      </div>

      <div className="mx-auto text-center space-y-2 pb-120 lg:pb-0">
        <p className="mt-10">Хочете почати вивчати щось нове?</p>

        <Link href={'/search'} className="link text-2xl">
          Перейти до пошуку
        </Link>
      </div>
    </>
  )
}

export default StudentPage

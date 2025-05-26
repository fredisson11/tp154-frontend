'use client'

import { useAsideMenuStore } from '@/store/useAsideMenuStore'
import { ClassInfo } from '@/types/index'
import Image from 'next/image'
import LessonDetailsContent from '@/components/Dashboard/LessonDetailsContent'

const ClassRow = ({ classInfo }: { classInfo: ClassInfo }) => {
  const openDetails = () => {
    useAsideMenuStore
      .getState()
      .openMenu(<LessonDetailsContent data={classInfo} />)
  }

  return (
    <tr className="bg-background py-6">
      <td className="py-6 pl-6 rounded-l-sm">
        <div className="flex flex-col gap-4">
          <div className="flex">
            <Image
              src="/icon-user.png"
              alt={classInfo.teacher}
              className="rounded-full mr-4"
              width={64}
              height={64}
            />

            <span className="font-semibold flex flex-col my-auto">
              {classInfo.teacher}

              {/* Subject to md */}
              <span className="lg:hidden dashboard-subject inline-block">
                {classInfo.subject}
              </span>
            </span>
          </div>

          {/* Teacher info on mobile */}
          <span className="md:hidden flex gap-2 justify-between">
            {classInfo.dateTime}

            <button onClick={openDetails} className="link px-4 lg:hidden">
              Деталі уроку
            </button>
          </span>
        </div>
      </td>

      {/* Subject on desktop */}
      <td className="hidden lg:table-cell">
        <span className="bg-dashboard-subject px-3 py-1.5 rounded-sm inline-block">
          {classInfo.subject}
        </span>
      </td>

      {/* Date and time on md+ */}
      <td className="hidden md:table-cell">
        <span className="flex flex-col">
          {classInfo.dateTime}
          {/* Link to lesson details on md */}
          <button
            onClick={openDetails}
            className="link p-2 pl-0 lg:hidden text-left"
          >
            Деталі уроку
          </button>
        </span>
      </td>

      {/* Link to lesson details on desktop */}
      <td className="hidden lg:table-cell pr-6 rounded-r-lg text-center">
        <button onClick={openDetails} className="link p-2">
          Деталі уроку
        </button>
      </td>
    </tr>
  )
}

export default ClassRow

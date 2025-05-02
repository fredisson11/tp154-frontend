import Image from 'next/image'
import SubjectsList from '@/components/Teacher/SubjectsList'

interface TeacherInfoProps {
  name: string
  age: number
  city: string
  classes: string
  experience: number
  subjects: string[]
}

const TeacherInfo = ({
  name,
  age,
  city,
  classes,
  experience,
  subjects,
}: TeacherInfoProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10">
      <Image
        src="/icon-user.png"
        alt={name}
        className="rounded-3xl w-[139px] h-[139px] object-cover"
        width={139}
        height={139}
      />

      <div>
        {/* Teacher Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-center md:text-left w-[500px]">
          <h3>
            {name}, <span className="font-normal">{age}</span>
          </h3>
          <h3>
            Місто: <span className="font-normal">{city}</span>
          </h3>
          <h3>
            Класи: <span className="font-normal">{classes}</span>
          </h3>
          <h3>
            Стаж: <span className="font-normal">{experience} років</span>
          </h3>
        </div>

        {/* Subjects */}
        <SubjectsList className="mt-4" subjects={subjects} />
      </div>
    </div>
  )
}

export default TeacherInfo

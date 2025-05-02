interface SubjectsListProps {
  subjects: string[]
  className?: string
}

const SubjectsList = ({ subjects, className }: SubjectsListProps) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center flex-wrap gap-4 text-center ${className}`}
    >
      {subjects.map((subject, index) => (
        <span
          key={index}
          className="bg-yellow-300 font-bold rounded-full px-4 py-2 flex-shrink-0"
        >
          {subject}
        </span>
      ))}
    </div>
  )
}

export default SubjectsList

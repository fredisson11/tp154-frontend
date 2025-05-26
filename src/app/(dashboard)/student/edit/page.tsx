import ChangeUserPhoto from '@/components/Dashboard/DashboardUi/ChangeUserPhoto'
import EditDataForm from '@/components/Dashboard/Student/EditDataForm'
import StudentTeachers from '@/components/Dashboard/Student/StudentTeachers'
import NavigateButton from '@/components/ui/NavigateButton'

function StudentEditPage() {
  return (
    <>
      <NavigateButton className="my-10 md:ml-10" />

      {/* user info */}
      <section className="dashboard-container dashboard-block flex flex-col justify-around md:flex-row items-center gap-8">
        <ChangeUserPhoto />

        <EditDataForm />
      </section>

      <StudentTeachers />
    </>
  )
}

export default StudentEditPage

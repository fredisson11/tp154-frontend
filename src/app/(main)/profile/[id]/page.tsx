import TeacherProfile from '@/components/Teacher/TeacherProfile'

async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <section className="section-container card-container">
      <h3 className="absolute top-30 left-10">Profile id: {id}</h3>

      <TeacherProfile />
    </section>
  )
}

export default Profile

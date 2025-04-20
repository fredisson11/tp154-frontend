async function Profile({ params }: { params: { id: string } }) {
  const { id } = await params

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <h1 className="text-center">Profile id: {id}</h1>
    </div>
  )
}

export default Profile

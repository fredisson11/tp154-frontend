import Image from 'next/image'

function ChangeUserPhoto() {
  return (
    <div className="relative max-w-[160px]">
      <Image
        className="rounded-full"
        src="/icon-user.png"
        alt="User-photo"
        width={160}
        height={160}
      />

      <div className="cursor-pointer absolute right-0 bottom-0 rounded-full bg-primary hover:bg-primary/85 w-10 h-10 text-center">
        <span className="text-white text-3xl">+</span>
      </div>
    </div>
  )
}

export default ChangeUserPhoto

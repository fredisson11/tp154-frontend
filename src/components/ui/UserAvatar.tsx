import Image from 'next/image'
import { CircleUserRound } from 'lucide-react'
import classNames from 'classnames'

type Props = {
  photo?: string | null
  className?: string
  spanClassName?: string
}

function UserAvatar({ photo, className, spanClassName }: Props) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt="profile"
        width={60}
        height={60}
        className={classNames('rounded-full object-cover', className)}
      />
    )
  }

  return (
    <div className="flex flex-col items-center">
      <CircleUserRound className={classNames('text-primary', className)} />

      <span
        className={classNames(
          'text-primary text-lg font-semibold',
          spanClassName
        )}
      >
        Профіль
      </span>
    </div>
  )
}

export default UserAvatar

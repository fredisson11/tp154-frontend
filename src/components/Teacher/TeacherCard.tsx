import { TeacherCardProps } from '@/components/Teacher/types'
import TeacherInfo from '@/components/Teacher/TeacherInfo'
import RatingStars from '@/components/Teacher/RatingStars'
import PriceBlock from '@/components/Teacher/PriceBlock'
import MainButton from '@/components/ui/MainButton'

const TeacherCard = ({
  teacherId,
  name,
  age,
  city,
  classes,
  experience,
  subjects,
  rating,
  reviews,
  bio,
  price,
}: TeacherCardProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-5 md:p-10 bg-background rounded-3xl">
      {/* Left */}
      <div className="flex flex-col w-full lg:w-2/3 gap-6">
        {/* Profile Info */}
        <TeacherInfo
          name={name}
          age={age}
          city={city}
          classes={classes}
          experience={experience}
          subjects={subjects}
        />

        <div className="flex flex-col md:flex-row gap-4">
          {/* Rating and Reviews */}
          <RatingStars rating={rating} reviews={reviews} />
          {/* Bio */}
          <p className="text-center md:text-left">{bio}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-center justify-between w-full lg:w-1/4 gap-4 lg:gap-6">
        {/* Price */}
        <PriceBlock price={price} />

        {/* Button with dynamic link */}
        <MainButton
          href={`/profile/${teacherId}`}
          className="w-full lg:max-w-[273px]"
        >
          Детальніше
        </MainButton>
      </div>
    </div>
  )
}

export default TeacherCard

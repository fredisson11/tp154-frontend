import Image from 'next/image'
import SubjectsList from '@/components/Teacher/SubjectsList'
import RatingStars from '@/components/Teacher/RatingStars'
import WorkingHours from '@/components/Teacher/TeacherProfile/WorkingHours'
import ContactComponent from '@/components/Teacher/TeacherProfile/ContactComponent'
import PriceBlock from '@/components/Teacher/PriceBlock'
import MainButton from '@/components/ui/MainButton'
import OpenParagraph from '@/components/ui/OpenParagraph'

const TeacherProfile = () => {
  const name = 'Олександр'
  const age = 35
  const city = 'Київ'
  const classes = '5-11 клас'
  const experience = 5
  const subjects = [
    'українська література',
    'українська мова',
    'англійська мова',
    'німецька мова',
  ]
  const rating = 4.5
  const reviews = 20
  const bio =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'
  const country = 'Україна'
  const languages = ['українська', 'англійська']
  const price = 100

  return (
    <>
      <div className="lg:flex justify-between px-4">
        {/* Main */}
        <div>
          {/* Top */}
          <div className="flex flex-col md:flex-row items-center gap-5 lg:gap-10">
            {/* Photo + Rating(md+) */}
            <div className="flex flex-col gap-4 mb-auto lg:mt-3">
              <Image
                src="/icon-user.png"
                alt={name}
                className="rounded-3xl w-[139px] h-[139px] object-cover"
                width={139}
                height={139}
              />

              {/* Rating and Reviews md+*/}
              <RatingStars
                className="gap-2 hidden md:flex"
                rating={rating}
                reviews={reviews}
              />
            </div>

            {/* Deatils */}
            <div>
              {/* Name */}
              <h3 className="font-bold text-center md:text-left">{name}</h3>

              {/* Subjects */}
              <SubjectsList
                className="border-b-2 border-gray-200 pb-6 md:pb-4 w-full mt-3"
                subjects={subjects}
              />

              {/* Rating and Reviews mobile*/}
              <RatingStars
                className="gap-2 md:hidden my-4"
                rating={rating}
                reviews={reviews}
              />

              {/* More Info */}
              <div className="mr-auto md:mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg lg:text-base text-gray-500">
                <span>
                  Вік: <span className="text-main-dark">{age}</span>
                </span>
                <span>
                  Місто: <span className="text-main-dark">{city}</span>
                </span>
                <span>
                  Класи: <span className="text-main-dark">{classes}</span>
                </span>
                <span>
                  Стаж:{' '}
                  <span className="text-main-dark">{experience} років</span>
                </span>
                <span>
                  Країна: <span className="text-main-dark">{country}</span>
                </span>
                <span>
                  Мови:
                  <span className="text-main-dark">{languages.join(', ')}</span>
                </span>
              </div>

              {/* Contact from lg*/}
              <ContactComponent className="hidden lg:grid grid-cols-2 gap-2 mt-5" />
            </div>
          </div>

          {/* Working Hours, Price and Contact to md*/}
          <div className="lg:hidden flex flex-col md:flex-row gap-[25%] mt-10">
            {/* Working Hours to md*/}
            <WorkingHours className="mr-auto md:mr-0" />

            <div className="flex flex-col justify-between gap-8 mt-8 md:mt-0">
              {/* Contact to md*/}
              <ContactComponent className="flex flex-col items-center md:items-start gap-4" />

              {/* Price to md*/}
              <PriceBlock className="text-center" price={price} />
            </div>
          </div>

          {/* Button to md */}
          <MainButton className="w-full mt-4 md:mt-8 lg:hidden">
            Записатися на урок
          </MainButton>
        </div>

        {/* Working Hours, Price, Button from lg*/}
        <div className="hidden lg:flex flex-col gap-4">
          <WorkingHours className="mr-auto md:mr-0" />

          <PriceBlock price={price} />

          <MainButton className="w-full max-h-[48px]">
            Записатися на урок
          </MainButton>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-10 mt-10 px-4	">
        <OpenParagraph title="Про репетитора">{bio}</OpenParagraph>

        <OpenParagraph title="Хобі">{bio}</OpenParagraph>

        <OpenParagraph title="Освіта">{bio}</OpenParagraph>

        <OpenParagraph title="Як проходить урок?">{bio}</OpenParagraph>
      </div>
    </>
  )
}

export default TeacherProfile

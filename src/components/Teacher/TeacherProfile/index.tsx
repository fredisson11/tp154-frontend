'use client'

import Image from 'next/image'
import { useState } from 'react'
import SubjectsList from '@/components/Teacher/SubjectsList'
import RatingStars from '@/components/Teacher/RatingStars'
import WorkingHours from '@/components/Teacher/TeacherProfile/WorkingHours'
import ContactComponent from '@/components/Teacher/TeacherProfile/ContactComponent'
import PriceBlock from '@/components/Teacher/PriceBlock'
import MainButton from '@/components/ui/MainButton'
import OpenParagraph from '@/components/ui/OpenParagraph'
import BasicInfo from '@/components/Teacher/TeacherProfile/BasicInfo'
import Modal from '@/components/Modal'
import BookingModal from '@/components/Modal/BookingModal'
import VerificationInfo from '@/components/ui/VerificationInfo'

const TeacherProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const teacherData = {
    name: 'Олександр',
    age: 35,
    city: 'Київ',
    classes: '5-11 клас',
    experience: 5,
    subjects: [
      'українська література',
      'українська мова',
      'англійська мова',
      'німецька мова',
      'французька мова',
    ],
    rating: 4.5,
    reviews: 20,
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    country: 'Україна',
    languages: ['українська', 'англійська', 'французька', 'німецька'],
    price: 100,
  }

  const {
    name,
    age,
    city,
    classes,
    experience,
    subjects,
    rating,
    reviews,
    bio,
    country,
    languages,
    price,
  } = teacherData

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <div className="px-4">
      {/* Main Profile Section */}
      <div className="lg:flex justify-between gap-6">
        {/* Left Column */}
        <div className="flex-1">
          {/* Teacher Info */}
          <div className="flex flex-col md:flex-row items-center gap-5 lg:gap-10">
            {/* Photo + Rating */}
            <div className="flex flex-col gap-4 mb-auto lg:mt-3">
              <Image
                src="/icon-user.png"
                alt={name}
                className="rounded-3xl object-cover w-[200px] h-[200px] md:w-[140px] md:h-[140px] lg:w-[200px] lg:h-[200px]"
                width={200}
                height={200}
              />
              <RatingStars
                className="gap-2 hidden md:flex"
                rating={rating}
                reviews={reviews}
              />
            </div>
            {/* Details */}
            <div className="flex-1">
              {/* Name */}
              <VerificationInfo isVerified={true}>
                <h2 className="font-bold text-center md:text-left">{name}</h2>
              </VerificationInfo>

              <SubjectsList
                className="border-b-2 border-gray-200 pb-6 md:pb-4 w-full mt-3"
                subjects={subjects}
              />

              <RatingStars
                className="gap-2 md:hidden my-4"
                rating={rating}
                reviews={reviews}
              />

              <div className="mr-auto md:mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg lg:text-base text-gray-500">
                <BasicInfo label="Вік" value={age} />
                <BasicInfo label="Місто" value={city} />
                <BasicInfo label="Класи" value={classes} />
                <BasicInfo label="Стаж" value={`${experience} років`} />
                <BasicInfo label="Країна" value={country} />
                <BasicInfo label="Мови" value={languages.join(', ')} />
              </div>

              <ContactComponent className="hidden lg:grid grid-cols-2 gap-2 mt-5" />
            </div>
          </div>

          {/* Mobile/Tablet View - Bottom Section */}
          <div className="lg:hidden flex flex-col md:flex-row gap-[25%] mt-10">
            <WorkingHours className="mr-auto md:mr-0" />
            <div className="flex flex-col justify-between gap-8 mt-8 md:mt-0">
              <ContactComponent className="flex flex-col items-center md:items-start gap-4" />
              <PriceBlock className="text-center" price={price} />
            </div>
          </div>

          {/* Button to md */}
          <MainButton
            onClick={handleOpenModal}
            className="w-full mt-4 md:mt-8 lg:hidden"
          >
            Записатися на урок
          </MainButton>
        </div>

        {/* Desktop View - Right Column */}
        <div className="hidden lg:flex flex-col gap-4 w-[300px]">
          <WorkingHours />
          <PriceBlock price={price} />
          <MainButton onClick={handleOpenModal} className="w-full max-h-[48px]">
            Записатися на урок
          </MainButton>
        </div>
      </div>

      {/* Teacher Details Sections */}
      <div className="gap-10 mt-12">
        <OpenParagraph title="Про репетитора">{bio}</OpenParagraph>

        <OpenParagraph title="Хобі">{bio}</OpenParagraph>

        <OpenParagraph title="Освіта">{bio}</OpenParagraph>

        <OpenParagraph title="Як проходить урок?">{bio}</OpenParagraph>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <BookingModal name={name} onClose={handleCloseModal} />
      </Modal>
    </div>
  )
}

export default TeacherProfile

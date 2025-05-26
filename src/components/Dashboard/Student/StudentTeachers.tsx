'use client'

import Modal from '@/components/Modal'
import RateTeacherModal from '@/components/Modal/RateTeacherModal'
import Image from 'next/image'
import { useState } from 'react'

function StudentTeachers() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="dashboard-container space-y-6">
      <h3 className="text-2xl">Мої вчителі</h3>

      <ul className="space-y-6 w-full md:w-[70%] lg:w-[40%]">
        <li className="flex items-center gap-6">
          <Image
            src="/icon-user.png"
            alt="teacher1"
            width={64}
            height={64}
            className="rounded-full"
          />
          <div className="w-full justify-between flex flex-col md:flex-row">
            <p>Іван Калюжний</p>
            <button onClick={() => setIsOpen(true)} className="link text-left">
              Написати відгук
            </button>
          </div>
        </li>

        <li className="flex items-center gap-6">
          <Image
            src="/icon-user.png"
            alt="teacher2"
            width={64}
            height={64}
            className="rounded-full"
          />
          <div className="w-full flex flex-col justify-between md:flex-row">
            <p>Марія Дорошевська</p>

            <button onClick={() => setIsOpen(true)} className="link text-left">
              Написати відгук
            </button>
          </div>
        </li>
      </ul>

      <Modal
        type="dashboard-modal"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <RateTeacherModal />
      </Modal>
    </div>
  )
}

export default StudentTeachers

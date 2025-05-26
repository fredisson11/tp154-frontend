import WorkingHours from '@/components/Teacher/TeacherProfile/WorkingHours'
import Image from 'next/image'
import DashboardButton from '../DashboardUi/DashboardButton'
import VerificationInfo from '@/components/ui/VerificationInfo'

interface TeacherInfoItem {
  label: string
  value: string
}

const teacherInfoItems: TeacherInfoItem[] = [
  { label: 'Вік', value: '30 років' },
  { label: 'Місто', value: 'Київ' },
  { label: 'Класи', value: 'до 9 класу' },
  { label: 'Мови викладання', value: 'Українська, Англійська' },
  { label: 'Пошта', value: '1YHt9@example.com' },
  { label: 'Телефон', value: '+380961234567' },
]

const subjects = ['Математика', 'Геометрія', 'Алгебра', 'Фізика']

const socials = [
  {
    icon: '/whatsapp-icon.svg',
    name: 'WhatsApp',
    contact: '+380992600000',
  },
  {
    icon: '/insta-icon.svg',
    name: 'Instagram',
    contact: '@maria_dorosh',
  },
  {
    icon: '/telegram-icon.svg',
    name: 'Telegram',
    contact: '@maria_dorosh',
  },
  {
    icon: '/viber-icon.svg',
    name: 'Viber',
    contact: '+380992600000',
  },
]

function TeacherDashboardInfo() {
  return (
    <div className="dashboard-block p-6">
      <div className="2xl:max-w-1/2 mx-auto">
        {/* Top */}
        <div className="flex flex-col md:flex-row items-center gap-2 justify-between lg:gap-6">
          {/* left */}
          <div className="order-2 md:order-1">
            {/* Teacher name + verification tick*/}
            <VerificationInfo isVerified={true}>
              <h3 className="text-center md:text-left">Марія Дорошевська</h3>
            </VerificationInfo>

            {/* Subjects */}
            <div className="flex flex-wrap mt-2 gap-2 order-1 md:order-2 md:justify-start">
              {subjects.map((subject, index) => (
                <span key={index} className="dashboard-subject">
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <Image
            src="/icon-user.png"
            alt="User-photo"
            className="rounded-full order-1 md:order-2"
            width={150}
            height={150}
          />
        </div>

        {/* Info */}
        <div className="mt-6">
          {/* Teacher info */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <ul className="flex-1 space-y-4">
              {teacherInfoItems.map((item, index) => (
                <li key={index} className="whitespace-pre-wrap text-lg h-full">
                  <span className="text-gray-500">{item.label}:</span>{' '}
                  {item.value}
                </li>
              ))}
            </ul>

            <div className="flex flex-col flex-1">
              <WorkingHours />

              <p className="mt-4 text-gray-500 text-lg">
                Ціна уроку:
                <span className="mt-2 font-bold text-main-dark block">
                  150 грн/год
                </span>
              </p>
            </div>
          </div>

          {/* Socials */}
          <h4 className="my-4 flex items-center gap-2 text-gray-500 text-lg">
            Соціальні мережі:
          </h4>

          <ul className="grid grid-cols-2 gap-6">
            {socials.map((social, index) => (
              <li key={index} className="text-lg">
                <div className="flex items-center">
                  <Image
                    src={social.icon}
                    width={24}
                    height={24}
                    alt={social.name}
                    className="mr-2"
                  />
                  {social.name}
                </div>

                <div className="dashboard-input text-base md:text-lg">
                  {social.contact}
                </div>
              </li>
            ))}
          </ul>

          {/* Button */}
          <DashboardButton href="/teacher/edit" className="mt-6 w-full">
            Редагувати профіль
          </DashboardButton>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboardInfo

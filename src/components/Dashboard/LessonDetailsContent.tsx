import { Calendar, Clock, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAsideMenuStore } from '@/store/useAsideMenuStore'
import { ClassInfo } from '@/types/index'

function LessonDetailsContent({ data }: { data: ClassInfo }) {
  const closeMenu = useAsideMenuStore((state) => state.closeMenu)

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 flex items-center gap-4 p-6 bg-white border-b border-gray-100 z-10">
        <button
          onClick={closeMenu}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-6 h-6 text-gray-500 cursor-pointer" />
        </button>
        <h3 className="text-lg font-semibold">Деталі уроку</h3>
      </div>

      {/* Scrollable content container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Main lesson info */}
        <div className="space-y-4">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-gray-500">Дата та час проведення</h4>
              <p className="flex items-center gap-2 text-gray-800">
                <Calendar className="w-5 h-5" />
                25 квітня 2025
              </p>
              <p className="flex items-center gap-2 text-gray-800">
                <Clock className="w-5 h-5" />
                19:00 - 20:00
              </p>
            </motion.div>

            <motion.div
              className="dashboard-block px-4 py-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-gray-500">Вчитель:</h4>
              <p className="text-gray-800 mt-1">{data.teacher}</p>

              <p className="w-2/3 py-2 mt-2 text-center bg-dashboard-subject text-gray-800">
                {data.subject}
              </p>

              <h4 className="text-gray-500 mt-4">Контакт:</h4>
              <p className="text-gray-800 mt-2">+380 67 735 3932</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="w-full bg-green-200 py-3 font-medium text-center">
                Сплачено
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Homework section */}
        <motion.div
          className="dashboard-block px-4 py-2 pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-gray-500 mb-2">Домашнє завдання:</h4>
          <p className="text-gray-800">На стр. 165 вправа</p>
          <p className="text-gray-800">3-6, 10-12</p>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="sticky bottom-0 p-4 bg-white border-t border-gray-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <button className="cursor-pointer w-full py-3 px-4 bg-red-400 hover:bg-red-500 text-white rounded-sm transition-colors">
          Відмінити урок
        </button>
      </motion.div>
    </>
  )
}

export default LessonDetailsContent

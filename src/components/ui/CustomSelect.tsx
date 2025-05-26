'use client'

import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import useClickOutside from '@/hooks/useClickOutside'

interface CustomSelectProps {
  options: string[]
  defaultOption?: string
  label?: string
  className?: string
  buttonClassName?: string
  onSelect?: (option: string) => void
}

const CustomSelect = ({
  options,
  defaultOption = '',
  label = '',
  className = '',
  buttonClassName = '',
  onSelect,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const [selectedOption, setSelectedOption] = useState(
    defaultOption || options[0]
  )

  const selectOption = (option: string) => {
    setSelectedOption(option)
    setIsOpen(false)
    if (onSelect) onSelect(option)
  }

  useClickOutside(isOpen, ref, () => setIsOpen(false))

  return (
    <div
      className={`relative flex items-center text-center md:text-left ${className}`}
      ref={ref}
    >
      <span className="text-lg">{label}</span>

      <button
        className={`outline-none flex items-center justify-between border-b-2 border-main-dark ${buttonClassName}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption}</span>
        <ChevronDown
          className={`w-6 h-6 ml-1 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute z-10 top-full mt-2 w-full bg-white shadow-xl rounded-xl border border-gray-200"
          >
            {options.map((option) => (
              <motion.li
                key={option}
                className={`px-4 py-3 hover:bg-gray-100 cursor-pointer ${
                  option !== options[options.length - 1]
                    ? 'border-b border-gray-200'
                    : ''
                }`}
                onClick={() => selectOption(option)}
              >
                {option}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CustomSelect

'use client'

import { useEffect, useState } from 'react'
import { useRef } from 'react'

const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Рейтингу')

  const sortOptions = [
    'Рейтингу',
    'Верифікованим',
    'Від дорожчих до дешевших',
    'Від дешевших до дорожчих',
  ]

  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)
  const selectOption = (option: string) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className="relative w-full lg:w-3/4 flex flex-col lg:flex-row items-center gap-4 justify-center"
      ref={dropdownRef}
    >
      <span className="text-lg">Сортувати по:</span>

      <button
        className="underline underline-offset-4 flex items-center"
        onClick={toggleDropdown}
      >
        <span>{selectedOption}</span>
        <svg
          className={`w-4 h-4 ml-1 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 top-20 lg:top-10 w-full md:w-[70%] bg-white shadow-xl rounded-xl border border-gray-200">
          {sortOptions.map((option) => (
            <li
              key={option}
              className={`px-4 py-5 hover:bg-gray-200 rounded-xl cursor-pointer text-center md:text-left ${
                option !== sortOptions[sortOptions.length - 1]
                  ? 'border-b border-gray-200'
                  : ''
              }`}
              onClick={() => selectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SortDropdown

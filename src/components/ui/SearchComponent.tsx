'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import PrimaryButton from '@/components/ui/MainButton'
import classNames from 'classnames'

type Option = {
  label: string
  options: string[]
}

type SearchComponentProps = {
  color?: string
}

const SearchComponent = ({ color = 'white' }: SearchComponentProps) => {
  const options: Option[] = useMemo(
    () => [
      {
        label: 'Предмет',
        options: ['Німецька мова', 'Інший предмет'],
        optionStyles: { fontSize: '1.2rem' },
      },
      { label: 'Класи', options: ['Для дорослих', 'Для дітей'] },
      { label: 'Місто', options: ['Київ', 'Львів'] },
    ],
    []
  )

  const [isOpen, setIsOpen] = useState(options.map(() => false))
  const [selected, setSelected] = useState(options.map(() => ''))
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggleOpen = (index: number) => {
    setIsOpen((prevIsOpen) =>
      prevIsOpen.map((open, i) => (i === index ? !open : false))
    )
  }

  const handleSelect = (index: number, option: string) => {
    setSelected((prevSelected) =>
      prevSelected.map((selectedOption, i) =>
        i === index ? option : selectedOption
      )
    )
    toggleOpen(index)
  }

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutsideAll = dropdownRefs.current.every(
        (ref) => ref && !ref.contains(event.target as Node)
      )

      if (clickedOutsideAll) {
        setIsOpen(options.map(() => false))
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [options])

  return (
    <div
      className={classNames(
        'container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5',
        `bg-${color}`
      )}
    >
      {options.map(({ label, options }, index) => (
        <div
          key={index}
          className="relative"
          ref={(el) => {
            dropdownRefs.current[index] = el
          }}
        >
          {/* label */}
          <label
            className={classNames(
              'absolute top-0 left-2 -translate-y-1/2 text-sm font-medium px-1',
              `bg-${color}`
            )}
          >
            {label}
          </label>

          {/* dropdown */}
          <button
            className={classNames(
              'border-2 rounded-xl px-6 py-5 w-full appearance-none cursor-pointer',
              'flex items-center justify-between transition-all duration-200',
              {
                'rounded-b-none border-b-2': isOpen[index],
              }
            )}
            onClick={() => toggleOpen(index)}
          >
            {selected[index] || label}
            <Image
              src="/arrow-icon.svg"
              alt="arrow"
              width={16}
              height={16}
              className={classNames(
                'transition-transform duration-200 w-4 h-4',
                {
                  'rotate-180': isOpen[index],
                }
              )}
            />
          </button>

          {/* dropdown options */}
          <ul
            className={classNames(
              'absolute top-full left-0 right-0 bg-background border-2 border-t-0 rounded-b-xl z-10 overflow-hidden transition-all duration-300',
              {
                'max-h-48 opacity-100 translate-y-0': isOpen[index],
                'max-h-0 opacity-0 -translate-y-1': !isOpen[index],
              }
            )}
          >
            {options.map((option) => (
              <li
                key={option}
                className={classNames(
                  'px-6 py-2 cursor-pointer hover:bg-gray-200',
                  `bg-${color}`
                )}
                onClick={() => handleSelect(index, option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <PrimaryButton href="/search">Пошук</PrimaryButton>
    </div>
  )
}

export default SearchComponent

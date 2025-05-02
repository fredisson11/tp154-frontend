'use client'

import classNames from 'classnames'
import { useState } from 'react'

interface OpenParagraphProps {
  title: string
  children: React.ReactNode
  maxHeight?: string
  className?: string
}

const OpenParagraph: React.FC<OpenParagraphProps> = ({
  title,
  children,
  maxHeight = '150px',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={classNames('relative', className)}>
      <h2 className="font-semibold text-left mb-5">{title}</h2>

      <div
        className="relative overflow-hidden"
        style={{ maxHeight: isOpen ? 'none' : maxHeight }}
      >
        <p className="pb-4">{children}</p>

        {!isOpen && (
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {/* Кнопка */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-500 hover:text-blue-700 text-lg underline"
        >
          {isOpen ? 'Згорнути' : 'Більше'}
        </button>
      </div>
    </div>
  )
}

export default OpenParagraph

'use client'

import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

interface OpenParagraphProps {
  title: string
  children: React.ReactNode
  maxHeight?: string
  className?: string
  gradientColor?: string
}

const OpenParagraph: React.FC<OpenParagraphProps> = ({
  title,
  children,
  maxHeight = '150px',
  className,
  gradientColor = 'white',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [needsCollapse, setNeedsCollapse] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkIfCollapseNeeded = () => {
      if (!contentRef.current) return

      const scrollHeight = contentRef.current.scrollHeight
      const max = parseInt(maxHeight, 10)

      setNeedsCollapse(scrollHeight > max)
    }

    checkIfCollapseNeeded()

    window.addEventListener('resize', checkIfCollapseNeeded)
    return () => {
      window.removeEventListener('resize', checkIfCollapseNeeded)
    }
  }, [maxHeight])

  return (
    <div className={classNames('relative', className)}>
      {/* Title */}
      <h2 className="font-semibold text-left mb-5">{title}</h2>

      {/* Paragraph */}
      <div
        ref={contentRef}
        className="relative overflow-hidden"
        style={{ maxHeight: isOpen ? 'none' : maxHeight }}
      >
        <p className="pb-4">{children}</p>

        {!isOpen && needsCollapse && (
          <div
            style={{
              backgroundImage: `linear-gradient(to top, var(--color-${gradientColor}), transparent)`,
            }}
            className="absolute bottom-0 left-0 w-full h-16 pointer-events-none"
          />
        )}
      </div>

      {/* Button */}
      {needsCollapse && (
        <div className="flex justify-end">
          <button onClick={() => setIsOpen(!isOpen)} className="link">
            {isOpen ? 'Згорнути' : 'Більше'}
          </button>
        </div>
      )}
    </div>
  )
}

export default OpenParagraph

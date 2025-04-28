'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const subjects = [
  'математиці',
  'українській',
  'англійській',
  'історії',
  'географії',
  'інформатиці',
]

function Card() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Declare a variable to store the timeout ID
    let timeoutId: NodeJS.Timeout

    // Set up an interval that runs every 2.5 seconds
    const intervalId = setInterval(() => {
      // Trigger fading effect
      setIsFading(true)

      // Set a timeout to update the current index and disable fading
      timeoutId = setTimeout(() => {
        // Update the current index to show the next subject
        setCurrentIndex((prev) => (prev + 1) % subjects.length)
        // Disable fading effect
        setIsFading(false)
      }, 300) // Delay to allow fading animation
    }, 2500) // Interval duration

    // Cleanup function to clear the interval and timeout
    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="ml-3 relative w-[300px] md:w-[400px] h-[120px]">
      <Image
        src={'/card.svg'}
        alt="card"
        className="object-contain hidden lg:block"
        fill
      />
      <Image
        src={'/card-mobile.svg'}
        alt="card"
        className="object-contain lg:hidden"
        fill
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-300"
        style={{ opacity: isFading ? 0 : 1 }}
      >
        <span className="font-semibold text-4xl md:text-5xl text-white lg:text-main-dark">
          {subjects[currentIndex]}
        </span>
      </div>
    </div>
  )
}

export default Card

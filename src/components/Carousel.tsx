'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

interface Profile {
  id: number
  image: string
  name: string
  subject: string
  rating: number
  age: number
}

const profiles: Profile[] = [
  {
    id: 1,
    image: '/icon-user.png',
    name: 'John Doe',
    subject: 'mathematics',
    rating: 5,
    age: 25,
  },
  {
    id: 2,
    image: '/icon-user.png',
    name: 'Jane Smith',
    subject: 'Ukrainian',
    rating: 4,
    age: 28,
  },
  {
    id: 3,
    image: '/icon-user.png',
    name: 'Mike Johnson',
    subject: 'English',
    rating: 4,
    age: 30,
  },
  {
    id: 4,
    image: '/icon-user.png',
    name: 'Sarah Williams',
    subject: 'physics',
    rating: 5,
    age: 22,
  },
  {
    id: 5,
    image: '/icon-user.png',
    name: 'Emily Davis',
    subject: 'biology',
    rating: 4,
    age: 24,
  },
  {
    id: 6,
    image: '/icon-user.png',
    name: 'Oliver Brown',
    subject: 'chemistry',
    rating: 5,
    age: 26,
  },
  {
    id: 7,
    image: '/icon-user.png',
    name: 'Lily Taylor',
    subject: 'history',
    rating: 4,
    age: 27,
  },
  {
    id: 8,
    image: '/icon-user.png',
    name: 'Alexander Jackson',
    subject: 'informatics',
    rating: 5,
    age: 29,
  },
  {
    id: 9,
    image: '/icon-user.png',
    name: 'Mia Martin',
    subject: 'geography',
    rating: 4,
    age: 23,
  },
  {
    id: 10,
    image: '/icon-user.png',
    name: 'Logan Lewis',
    subject: 'philosophy',
    rating: 5,
    age: 25,
  },
  {
    id: 11,
    image: '/icon-user.png',
    name: 'Evelyn Hall',
    subject: 'mathematics',
    rating: 5,
    age: 21,
  },
  {
    id: 12,
    image: '/icon-user.png',
    name: 'Harold Brooks',
    subject: 'informatics',
    rating: 4,
    age: 31,
  },
  {
    id: 13,
    image: '/icon-user.png',
    name: 'Isabella Lee',
    subject: 'English',
    rating: 5,
    age: 19,
  },
]

function Carousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>(null)
  const lastTimeRef = useRef<number>(0)
  const [isPaused, setIsPaused] = useState(false)
  const [needsScroll, setNeedsScroll] = useState(false)

  const speed = 0.5
  const profileWidth = 157 + 32 // width + gap
  const totalWidth = profileWidth * profiles.length

  useEffect(() => {
    const checkIfScrollNeeded = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        setNeedsScroll(totalWidth > containerWidth)
      }
    }

    checkIfScrollNeeded()
    window.addEventListener('resize', checkIfScrollNeeded)

    return () => {
      window.removeEventListener('resize', checkIfScrollNeeded)
    }
  }, [totalWidth])

  const animate = useCallback(
    (time: number) => {
      if (!trackRef.current) return

      if (!needsScroll || isPaused) {
        lastTimeRef.current = time
        requestRef.current = requestAnimationFrame(animate)
        return
      }

      if (!lastTimeRef.current) lastTimeRef.current = time

      const deltaTime = time - lastTimeRef.current
      lastTimeRef.current = time

      const moveBy = speed * (deltaTime / 16)

      const currentTransform =
        trackRef.current.style.transform || 'translateX(0px)'
      const currentX = parseFloat(
        currentTransform.match(/-?\d+\.?\d*/)?.[0] || '0'
      )

      let newX = currentX - moveBy
      if (Math.abs(newX) >= totalWidth) {
        newX = 0
      }

      trackRef.current.style.transform = `translateX(${newX}px)`

      requestRef.current = requestAnimationFrame(animate)
    },
    [isPaused, speed, totalWidth, needsScroll]
  )

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [animate])

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className={classNames('flex gap-8 py-2', {
          'will-change-transform': needsScroll,
          'justify-center': !needsScroll,
        })}
        style={{
          width: needsScroll ? `${totalWidth * 2}px` : 'auto',
        }}
      >
        {(needsScroll ? [...profiles, ...profiles] : profiles).map(
          (profile, index) => (
            <div
              key={`${profile.id}-${index}`}
              className="w-[157px] h-[272px] flex-shrink-0 space-y-4 hover:scale-105 transition-transform cursor-pointer"
            >
              <Image
                src={profile.image}
                alt={profile.name}
                className="object-contain rounded-xl"
                width={157}
                height={157}
                priority={index < 10}
              />
              <div className="text-center">
                <h3 className="font-medium">
                  {profile.name}, {profile.age}
                </h3>
                <span className="text-gray-400 text-sm">{profile.subject}</span>
                <p className="text-base mt-2">
                  {profile.rating}{' '}
                  {[...Array(profile.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      &#11088;
                    </span>
                  ))}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Carousel

'use client'

import React, { useState } from 'react'
import {
  Accordion as MAccordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react'

type IconProps = {
  id: number
  open: number
}

function Icon({ id, open }: IconProps) {
  const isOpen = id === open

  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      {isOpen ? (
        // if open - minus
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
      ) : (
        // if closed - plus
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      )}
    </svg>
  )
}

function Accordion() {
  const [open, setOpen] = useState<number>(0)

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value)

  const accordionStyle = (isOpen: boolean) =>
    `text-left cursor-pointer bg-white rounded-2xl px-10 py-7 ${
      isOpen ? 'bg-primary text-white' : ''
    }`

  const accordionHeaderStyle =
    'cursor-pointer p-0 focus:outline-none focus:ring-0'
  const accordionBodyStyle = 'pt-4 pb-0 text-base'

  return (
    <div className="space-y-4">
      {/* @ts-expect-error Material Tailwind types might be incomplete */}

      <MAccordion
        className={accordionStyle(open === 1)}
        open={open === 1}
        icon={<Icon id={1} open={open} />}
        onClick={() => handleOpen(1)}
      >
        {/* @ts-expect-error Material Tailwind types m	ight be incomplete */}
        <AccordionHeader className={accordionHeaderStyle}>
          What is Material Tailwind?
        </AccordionHeader>
        <AccordionBody className={accordionBodyStyle}>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </MAccordion>

      {/* @ts-expect-error Material Tailwind types might be incomplete */}
      <MAccordion
        className={accordionStyle(open === 2)}
        open={open === 2}
        icon={<Icon id={2} open={open} />}
        onClick={() => handleOpen(2)}
      >
        {/* @ts-expect-error Material Tailwind types might be incomplete */}
        <AccordionHeader className={accordionHeaderStyle}>
          How to use Material Tailwind?
        </AccordionHeader>
        <AccordionBody className={accordionBodyStyle}>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </MAccordion>

      {/* @ts-expect-error Material Tailwind types might be incomplete */}
      <MAccordion
        className={accordionStyle(open === 3)}
        open={open === 3}
        icon={<Icon id={3} open={open} />}
        onClick={() => handleOpen(3)}
      >
        {/* @ts-expect-error Material Tailwind types might be incomplete */}
        <AccordionHeader className={accordionHeaderStyle}>
          What can I do with Material Tailwind?
        </AccordionHeader>

        <AccordionBody className={accordionBodyStyle}>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </MAccordion>

      {/* @ts-expect-error Material Tailwind types might be incomplete */}
      <MAccordion
        className={accordionStyle(open === 4)}
        open={open === 4}
        icon={<Icon id={4} open={open} />}
        onClick={() => handleOpen(4)}
      >
        {/* @ts-expect-error Material Tailwind types might be incomplete */}
        <AccordionHeader className={accordionHeaderStyle}>
          Lorem ipsum dolor sit amet.
        </AccordionHeader>

        <AccordionBody className={accordionBodyStyle}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum qui,
          animi sapiente reiciendis quod alias iure laudantium explicabo illo
          error! dreams.
        </AccordionBody>
      </MAccordion>
    </div>
  )
}

export default Accordion

// global.d.ts
import React from 'react'
import { MotionProps as OriginalMotionProps } from 'framer-motion'

declare module 'framer-motion' {
  interface MotionProps
    extends OriginalMotionProps,
      React.HTMLAttributes<HTMLElement> {
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
  }
}

declare module '@material-tailwind/react' {
  interface SpinnerProps {
    onPointerEnterCapture?: never
    onPointerLeaveCapture?: never
  }
}

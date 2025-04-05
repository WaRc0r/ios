"use client"

import { useState, useRef, type ReactNode } from "react"
import { motion, type PanInfo } from "framer-motion"

interface SwipeToActionProps {
  children: ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  leftAction?: ReactNode
  rightAction?: ReactNode
  threshold?: number
  className?: string
}

export default function SwipeToAction({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction,
  rightAction,
  threshold = 100,
  className = "",
}: SwipeToActionProps) {
  const [offset, setOffset] = useState(0)
  const constraintsRef = useRef(null)

  const handleDragEnd = (_: any, info: PanInfo) => {
    const { offset, velocity } = info

    // Check if swipe was fast enough or far enough
    if (offset.x < -threshold || velocity.x < -0.5) {
      if (onSwipeLeft) onSwipeLeft()
    } else if (offset.x > threshold || velocity.x > 0.5) {
      if (onSwipeRight) onSwipeRight()
    }

    // Reset position
    setOffset(0)
  }

  const handleDrag = (_: any, info: PanInfo) => {
    setOffset(info.offset.x)
  }

  return (
    <div className={`relative overflow-hidden ${className}`} ref={constraintsRef}>
      {/* Left action */}
      {leftAction && (
        <div
          className="absolute inset-y-0 right-0 flex items-center justify-center"
          style={{
            opacity: Math.min(Math.abs(Math.min(offset, 0)) / threshold, 1),
            width: Math.abs(Math.min(offset, 0)),
          }}
        >
          {leftAction}
        </div>
      )}

      {/* Right action */}
      {rightAction && (
        <div
          className="absolute inset-y-0 left-0 flex items-center justify-center"
          style={{
            opacity: Math.min(Math.max(offset, 0) / threshold, 1),
            width: Math.max(offset, 0),
          }}
        >
          {rightAction}
        </div>
      )}

      {/* Main content */}
      <motion.div
        drag="x"
        dragConstraints={constraintsRef}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        animate={{ x: 0 }}
        style={{ x: offset }}
        className="touch-pan-y"
      >
        {children}
      </motion.div>
    </div>
  )
}


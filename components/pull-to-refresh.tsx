"use client"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import LoadingSpinner from "./loading-spinner"

interface PullToRefreshProps {
  children: ReactNode
  onRefresh: () => Promise<void>
  pullDistance?: number
  className?: string
}

export default function PullToRefresh({ children, onRefresh, pullDistance = 80, className = "" }: PullToRefreshProps) {
  const [refreshing, setRefreshing] = useState(false)
  const [pulled, setPulled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)
  const controls = useAnimation()

  const pullProgress = useTransform(y, [0, pullDistance], [0, 1])
  const spinnerOpacity = useTransform(pullProgress, [0, 0.2, 1], [0, 0.2, 1])
  const spinnerScale = useTransform(pullProgress, [0, 1], [0.5, 1])

  const handleDragEnd = async () => {
    if (y.get() >= pullDistance && !refreshing) {
      setRefreshing(true)

      // Animate to show loading state
      await controls.start({
        y: 60,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      })

      try {
        await onRefresh()
      } catch (error) {
        console.error("Refresh failed:", error)
      }

      // Wait a bit to show the spinner
      await new Promise((resolve) => setTimeout(resolve, 800))

      setRefreshing(false)

      // Animate back to original position
      controls.start({
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      })
    } else {
      // If not pulled enough, just animate back
      controls.start({
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      })
    }

    setPulled(false)
  }

  const handleDrag = (_: any, info: any) => {
    // Only allow pulling down
    if (info.offset.y > 0) {
      y.set(info.offset.y)

      if (info.offset.y >= pullDistance && !pulled) {
        // Add haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate(10)
        }
        setPulled(true)
      } else if (info.offset.y < pullDistance && pulled) {
        setPulled(false)
      }
    }
  }

  return (
    <div className={`overflow-hidden ${className}`} ref={containerRef}>
      {/* Pull indicator */}
      <motion.div
        className="flex justify-center items-center h-16 -mt-16"
        style={{ opacity: spinnerOpacity, scale: spinnerScale }}
      >
        <LoadingSpinner size={30} color="#E30513" />
      </motion.div>

      {/* Content container */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        animate={controls}
        style={{ y }}
        className="min-h-full touch-pan-x"
      >
        {children}
      </motion.div>
    </div>
  )
}


"use client"

import { type ReactNode, useEffect, useState } from "react"
import { motion } from "framer-motion"
import LoadingSpinner from "./loading-spinner"

interface PageSlideTransitionProps {
  children: ReactNode
  direction?: "left" | "right" | "up" | "down"
  loadingTime?: number
  showSpinner?: boolean
}

export default function PageSlideTransition({
  children,
  direction = "left",
  loadingTime = 800,
  showSpinner = true,
}: PageSlideTransitionProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate loading time
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
      // Start animation after loading
      setTimeout(() => setIsVisible(true), 50)
    }, loadingTime)

    return () => clearTimeout(loadingTimer)
  }, [loadingTime])

  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: 300, opacity: 0 }
      case "right":
        return { x: -300, opacity: 0 }
      case "up":
        return { y: 300, opacity: 0 }
      case "down":
        return { y: -300, opacity: 0 }
      default:
        return { x: 300, opacity: 0 }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">{showSpinner && <LoadingSpinner />}</div>
    )
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}


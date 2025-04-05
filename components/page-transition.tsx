"use client"

import { type ReactNode, useEffect, useState } from "react"
import LoadingSpinner from "./loading-spinner"

interface PageTransitionProps {
  children: ReactNode
  loadingTime?: number
  showSpinner?: boolean
}

export default function PageTransition({ children, loadingTime = 800, showSpinner = true }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate loading time
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
      // Start fade-in animation after loading
      setTimeout(() => setIsVisible(true), 50)
    }, loadingTime)

    return () => clearTimeout(loadingTimer)
  }, [loadingTime])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">{showSpinner && <LoadingSpinner />}</div>
    )
  }

  return (
    <div className={`transition-opacity duration-300 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
      {children}
    </div>
  )
}


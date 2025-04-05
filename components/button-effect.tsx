"use client"

import { type ReactNode, useState } from "react"

interface ButtonEffectProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  activeScale?: number
  activeDuration?: number
}

export default function ButtonEffect({
  children,
  onClick,
  className = "",
  activeScale = 0.97,
  activeDuration = 150,
}: ButtonEffectProps) {
  const [isActive, setIsActive] = useState(false)

  const handlePress = () => {
    setIsActive(true)
    setTimeout(() => setIsActive(false), activeDuration)
    if (onClick) onClick()
  }

  return (
    <div
      className={`transition-transform ${className}`}
      style={{ transform: isActive ? `scale(${activeScale})` : "scale(1)" }}
      onClick={handlePress}
    >
      {children}
    </div>
  )
}


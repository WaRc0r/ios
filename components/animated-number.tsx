"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface AnimatedNumberProps {
  value: number
  duration?: number
  formatOptions?: Intl.NumberFormatOptions
  className?: string
  prefix?: string
  suffix?: string
}

export default function AnimatedNumber({
  value,
  duration = 1,
  formatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  className = "",
  prefix = "",
  suffix = "",
}: AnimatedNumberProps) {
  const [isClient, setIsClient] = useState(false)

  // Définir la fonction formatNumber avant son utilisation
  const formatNumber = (num: number, options: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat("fr-FR", options).format(num)
  }

  const springValue = useSpring(0, { duration: duration * 1000 })
  const displayValue = useTransform(springValue, (val) => {
    return formatNumber(val, formatOptions)
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    springValue.set(value)
  }, [springValue, value])

  if (!isClient) {
    return (
      <span className={className}>
        {prefix}
        {formatNumber(value, formatOptions)}
        {suffix}
      </span>
    )
  }

  return (
    <span className={className}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  )
}


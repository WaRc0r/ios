import type { CSSProperties } from "react"

interface LoadingSpinnerProps {
  size?: number
  color?: string
  className?: string
  style?: CSSProperties
}

export default function LoadingSpinner({
  size = 40,
  color = "#E30513",
  className = "",
  style = {},
}: LoadingSpinnerProps) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: `${color} transparent ${color} transparent`,
        ...style,
      }}
      role="status"
    >
      <span className="sr-only">Chargement...</span>
    </div>
  )
}


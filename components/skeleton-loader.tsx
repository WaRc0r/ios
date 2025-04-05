interface SkeletonLoaderProps {
  width?: string | number
  height?: string | number
  className?: string
  rounded?: string
}

export default function SkeletonLoader({
  width = "100%",
  height = "1rem",
  className = "",
  rounded = "rounded-md",
}: SkeletonLoaderProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${rounded} ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  )
}


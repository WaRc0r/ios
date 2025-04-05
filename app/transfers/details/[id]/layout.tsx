import type React from "react"
export function generateStaticParams() {
  return [
    { id: "t1" },
    { id: "t2" },
    { id: "t3" },
    { id: "t4" },
    { id: "t5" },
    { id: "t6" },
    { id: "t7" },
    { id: "t8" },
    { id: "t9" },
    { id: "t10" },
  ]
}

export default function TransferDetailsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


import type React from "react"
export function generateStaticParams() {
  return [{ id: "perso" }, { id: "joint" }]
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


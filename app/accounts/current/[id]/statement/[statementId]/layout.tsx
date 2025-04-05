import type React from "react"
export function generateStaticParams() {
  return [
    { id: "current-account", statementId: "statement-1" },
    { id: "current-account", statementId: "statement-2" },
  ]
}

export default function StatementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


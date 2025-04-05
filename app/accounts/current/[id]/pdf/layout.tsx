export function generateStaticParams() {
    return [
      { id: "perso" },
      { id: "joint" }
    ]
  }
  
  export default function PdfLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return children
  }
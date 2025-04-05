"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      router.push("/home")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-white p-8">
      <div className="flex-1"></div>

      <div className="flex flex-col items-center justify-center">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sg-laydernier-logo-png_seeklogo-466871-OwRAdmK2nB0Fl2YEca8Fwxb2bL5fgZ.png"
          alt="SG Laydernier Logo"
          width={180}
          height={36}
          className="mb-4"
        />
      </div>

      <div className="flex flex-col items-center mb-16">
        <div className="flex items-start mb-2">
          <div className="text-6xl font-bold">1</div>
          <div className="flex flex-col">
            <div className="text-6xl font-bold text-red-600">6</div>
            <div className="text-6xl font-bold">0</div>
          </div>
        </div>
        <div className="text-center text-xs uppercase font-semibold tracking-wide">
          <p>FAIRE GRANDIR</p>
          <p>LES IDÉES</p>
          <p>DEPUIS 160 ANS</p>
        </div>
        <p className="text-xs text-gray-600 mt-1">GROUPE SOCIÉTÉ GÉNÉRALE</p>
      </div>

      <div className="w-3 h-3 rounded-full border border-gray-300 mb-8"></div>
    </div>
  )
}


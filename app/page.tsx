"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import MobileDeviceDetector from "@/components/mobile-device-detector"

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/splash")
  }, [router])

  return (
    <MobileDeviceDetector>
      {/* Le contenu sera redirigé vers la page splash */}
      <div className="hidden">Redirection...</div>
    </MobileDeviceDetector>
  )
}


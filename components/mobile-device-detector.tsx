"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface MobileDeviceDetectorProps {
  children: React.ReactNode
}

export default function MobileDeviceDetector({ children }: MobileDeviceDetectorProps) {
  const [isNative, setIsNative] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Vérifier si l'application s'exécute dans un environnement natif
    const checkNativeEnvironment = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      const isIOS = /iphone|ipad|ipod/.test(userAgent)
      const isAndroid = /android/.test(userAgent)

      // Vérifier si l'application s'exécute dans Capacitor
      const isCapacitor = window.hasOwnProperty("Capacitor")

      setIsNative(isCapacitor || isIOS || isAndroid)
      setIsReady(true)
    }

    checkNativeEnvironment()
  }, [])

  if (!isReady) {
    return null // Ou un écran de chargement
  }

  // Si ce n'est pas un appareil mobile et pas en environnement natif, afficher un message
  if (!isNative && typeof window !== "undefined" && window.innerWidth > 768) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Application Mobile</h1>
          <p className="text-gray-600 mb-4">
            Cette application est conçue pour les appareils mobiles. Veuillez y accéder depuis un smartphone ou une
            tablette.
          </p>
          <div className="bg-gray-200 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              Redimensionnez votre navigateur pour simuler un appareil mobile ou scannez ce QR code avec votre
              téléphone.
            </p>
            <div className="mt-4 bg-white p-2 inline-block rounded">
              {/* Placeholder pour un QR code */}
              <div className="w-32 h-32 bg-gray-300 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Sur mobile ou en environnement natif, afficher l'application normalement
  return <>{children}</>
}


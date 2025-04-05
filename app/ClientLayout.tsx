"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { useEffect } from "react"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Ajout d'un effet pour initialiser Capacitor si disponible
  useEffect(() => {
    const initCapacitor = async () => {
      if (typeof window !== "undefined") {
        try {
          // Dynamically import Capacitor plugins
          const { SplashScreen } = await import("@capacitor/splash-screen")
          const { StatusBar, Style } = await import("@capacitor/status-bar")

          // Hide the splash screen
          await SplashScreen.hide()

          // Set status bar style
          await StatusBar.setStyle({ style: Style.Dark })
          if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            await StatusBar.setStyle({ style: Style.Light })
          }

          // Set status bar background color (iOS only)
          await StatusBar.setBackgroundColor({ color: "#E30513" })
        } catch (e) {
          // Not running in Capacitor environment
          console.log("Not running in Capacitor environment")
        }
      }
    }

    initCapacitor()
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}


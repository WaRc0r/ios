"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import BottomNavigation from "@/components/bottom-navigation"
import PageSlideTransition from "@/components/page-slide-transition"
import ButtonEffect from "@/components/button-effect"

interface PlaceholderPageProps {
  title: string
  backPath?: string
  showBottomNav?: boolean
}

export default function PlaceholderPage({ title, backPath = "/accounts", showBottomNav = true }: PlaceholderPageProps) {
  const router = useRouter()

  return (
    <PageSlideTransition>
      <div className="flex flex-col min-h-screen bg-white pb-16">
        {/* Header */}
        <header className="bg-[#E30513] text-white px-4 pt-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <ButtonEffect activeScale={0.9}>
              <button onClick={() => router.push(backPath)} className="focus:outline-none">
                <ChevronLeft className="h-6 w-6" />
              </button>
            </ButtonEffect>
            <motion.h1
              className="text-xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {title.toUpperCase()}
            </motion.h1>
            <div className="w-6"></div> {/* Empty div for spacing */}
          </div>

          {/* White underline below title */}
          <motion.div
            className="w-32 h-0.5 bg-white mx-auto mb-4"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </header>

        {/* Main content */}
        <div className="flex-1 px-4 py-6 bg-gray-50 flex flex-col items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4">Page en construction</h2>
            <p className="text-gray-600 mb-6">Cette fonctionnalité sera bientôt disponible.</p>
            <ButtonEffect>
              <button onClick={() => router.push(backPath)} className="px-6 py-3 bg-[#E30513] text-white rounded-full">
                Retour
              </button>
            </ButtonEffect>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        {showBottomNav && <BottomNavigation />}
      </div>
    </PageSlideTransition>
  )
}


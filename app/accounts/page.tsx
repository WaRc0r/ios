"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Settings, ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import BottomNavigation from "@/components/bottom-navigation"
import PageTransition from "@/components/page-transition"
import ButtonEffect from "@/components/button-effect"
import SkeletonLoader from "@/components/skeleton-loader"
import SwipeToAction from "@/components/swipe-to-action"
import PullToRefresh from "@/components/pull-to-refresh"
import AnimatedNumber from "@/components/animated-number"

export default function AccountsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("courants")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
  }

  const handleBackClick = () => {
    router.push("/home")
  }

  const handleAccountClick = (accountType: string, id: string) => {
    router.push(`/accounts/${accountType}/${id}`)
  }

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-white pb-16">
        {/* Header - Red background with title and icons */}
        <header className="bg-[#E30513] text-white px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-4">
            <ButtonEffect activeScale={0.9}>
              <button onClick={handleBackClick} className="focus:outline-none">
                <ChevronLeft className="h-6 w-6" />
              </button>
            </ButtonEffect>
            <motion.h1
              className="text-xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              MES COMPTES
            </motion.h1>
            <ButtonEffect activeScale={0.9}>
              <button className="focus:outline-none" onClick={() => router.push("/accounts/settings")}>
                <Settings className="h-6 w-6" />
              </button>
            </ButtonEffect>
          </div>

          {/* White underline below title */}
          <motion.div
            className="w-32 h-0.5 bg-white mx-auto mb-4"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />

          {/* Tabs */}
          <div className="flex text-sm">
            <ButtonEffect className="flex-1">
              <button
                className={`w-full py-2 ${activeTab === "courants" ? "font-semibold" : "opacity-80"}`}
                onClick={() => setActiveTab("courants")}
              >
                Comptes courants
              </button>
            </ButtonEffect>
            <ButtonEffect className="flex-1">
              <button
                className={`w-full py-2 ${activeTab === "epargne" ? "font-semibold" : "opacity-80"}`}
                onClick={() => setActiveTab("epargne")}
              >
                Épargne
              </button>
            </ButtonEffect>
            <ButtonEffect className="flex-1">
              <button
                className={`w-full py-2 ${activeTab === "credits" ? "font-semibold" : "opacity-80"}`}
                onClick={() => setActiveTab("credits")}
              >
                Crédits
              </button>
            </ButtonEffect>
          </div>
        </header>

        {/* Account list with pull to refresh */}
        <PullToRefresh onRefresh={handleRefresh} className="flex-1 bg-gray-50">
          <div className="px-4 py-4">
            <h2 className="text-sm font-medium text-gray-500 mb-3">Mes comptes courants</h2>

            {isLoading ? (
              // Skeleton loaders for accounts
              <>
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden p-3 mb-3">
                    <div className="flex items-center">
                      <SkeletonLoader width={40} height={40} rounded="rounded" className="mr-3" />
                      <div className="flex-1">
                        <SkeletonLoader width="60%" height={20} className="mb-2" />
                        <SkeletonLoader width="40%" height={16} />
                      </div>
                      <SkeletonLoader width={80} height={24} />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {/* Compte Perso */}
                <SwipeToAction
                  leftAction={
                    <div className="h-full bg-red-600 flex items-center justify-center px-6">
                      <span className="text-white font-medium">Masquer</span>
                    </div>
                  }
                  rightAction={
                    <div className="h-full bg-yellow-500 flex items-center justify-center px-6">
                      <span className="text-white font-medium">Favori</span>
                    </div>
                  }
                  className="mb-3"
                >
                  <ButtonEffect>
                    <motion.div
                      className="bg-white rounded-lg shadow-sm overflow-hidden"
                      whileHover={{ scale: 1.01 }}
                      onClick={() => handleAccountClick("current", "perso")}
                    >
                      <div className="flex items-center p-3">
                        <div className="w-10 h-10 rounded overflow-hidden mr-3">
                          <Image
                            src="/images/sg-logo.png"
                            alt="SG Logo"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">Compte Eliot Xavier R.G.</p>
                              <p className="text-xs text-gray-500">N° •••• 3379</p>
                            </div>
                            <div className="flex items-center">
                              <AnimatedNumber value={25553.78} className="font-semibold text-green-600" suffix=" €" />
                              <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </ButtonEffect>
                </SwipeToAction>

                {/* Carte Visa Premier */}
                <SwipeToAction
                  leftAction={
                    <div className="h-full bg-red-600 flex items-center justify-center px-6">
                      <span className="text-white font-medium">Masquer</span>
                    </div>
                  }
                  className="mb-3"
                >
                  <ButtonEffect>
                    <motion.div
                      className="bg-white rounded-lg shadow-sm overflow-hidden"
                      whileHover={{ scale: 1.01 }}
                      onClick={() => router.push("/cards")}
                    >
                      <div className="flex items-center p-3">
                        <div className="w-10 h-10 rounded overflow-hidden mr-3">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carte.jpg-EmAdVm6ZeeZaf104cpAn1kWnSC4cH7.jpeg"
                            alt="Carte Visa Premier"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">Carte Visa Premier</p>
                              <div className="flex items-center">
                                <p className="text-xs text-gray-500">N° •••• 1694</p>
                                <span className="text-xs text-gray-500 ml-2 px-1 bg-gray-100 rounded">
                                  Débit différé
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <AnimatedNumber value={-5.0} className="font-semibold text-red-600" suffix=" €" />
                              <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </ButtonEffect>
                </SwipeToAction>
              </>
            )}
          </div>
        </PullToRefresh>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </PageTransition>
  )
}


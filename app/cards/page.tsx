"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, Settings, Lock, CreditCard } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import BottomNavigation from "@/components/bottom-navigation"
import PageTransition from "@/components/page-transition"
import ButtonEffect from "@/components/button-effect"
import AnimatedNumber from "@/components/animated-number"

export default function CardsPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/accounts")
  }

  const handleBlockCard = () => {
    alert("Votre carte a été temporairement bloquée.")
  }

  const handleOpposition = () => {
    router.push("/cards/opposition")
  }

  const handleIncreaseLimit = () => {
    router.push("/cards/increase-limit")
  }

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-white pb-16">
        {/* Header - Red background with title and icons */}
        <header className="bg-[#E30513] text-white px-4 pt-4 pb-4">
          <div className="flex items-center justify-between mb-2">
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
              CB VISA PREMIER
            </motion.h1>
            <ButtonEffect activeScale={0.9}>
              <button className="focus:outline-none">
                <Settings className="h-6 w-6" />
              </button>
            </ButtonEffect>
          </div>
          <p className="text-sm opacity-80 text-center">Carte n° •••• 1694</p>
          <p className="text-sm opacity-80 text-center">Débit différé</p>
        </header>

        {/* Main Content */}
        <div className="flex-1 px-4 py-4 bg-white">
          {/* Card Display */}
          <motion.div
            className="flex justify-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="rounded-xl shadow-xl overflow-hidden w-64 relative bg-gradient-to-br from-gray-800 to-black"
              initial={{ scale: 0.9, rotateY: -15, rotateX: 5 }}
              animate={{ scale: 1, rotateY: 0, rotateX: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 25 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: -5,
                boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
                boxShadow: "0 15px 30px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.1)",
                transform: "perspective(1000px)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-10 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carte.jpg-EmAdVm6ZeeZaf104cpAn1kWnSC4cH7.jpeg"
                alt="Carte Visa Premier"
                width={256}
                height={162}
                className="w-full h-auto relative z-0"
              />
            </motion.div>
          </motion.div>

          {/* Action buttons */}
          <div className="flex justify-center space-x-8 mb-6">
            <ButtonEffect>
              <div className="flex flex-col items-center" onClick={handleBlockCard}>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                  <Lock className="h-5 w-5 text-gray-600" />
                </div>
                <span className="text-xs text-gray-700">Bloquer</span>
              </div>
            </ButtonEffect>
            <ButtonEffect>
              <div className="flex flex-col items-center" onClick={handleOpposition}>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                </div>
                <span className="text-xs text-gray-700">Opposition</span>
              </div>
            </ButtonEffect>
          </div>

          {/* Encours carte */}
          <motion.div
            className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                  <Image
                    src="/images/carte-visa-premier.jpg"
                    alt="Carte Visa Premier"
                    width={24}
                    height={16}
                    className="w-6 h-4 object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Encours carte</p>
                  <p className="text-xs text-gray-500">Date d'arrêté : 1er du mois</p>
                </div>
              </div>
              <AnimatedNumber value={-5.0} className="font-semibold text-red-600" suffix=" €" />
            </div>
          </motion.div>

          {/* Gérer mes plafonds */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-2"
          >
            <h3 className="text-base font-semibold text-blue-900 mb-1">Gérer mes plafonds</h3>
            <div className="h-0.5 w-16 bg-red-500"></div>
          </motion.div>

          {/* Plafond de paiement */}
          <motion.div
            className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <p className="font-medium text-gray-800">Plafond de paiement</p>
                  <p className="text-xs text-gray-500">Mensuel (jusqu'au 23/05/25)</p>
                </div>
                <p className="font-semibold text-gray-800">3 000,00 €</p>
              </div>

              <div className="flex items-center mb-1">
                <p className="text-sm text-green-600 font-medium">Utilisé : 1 095,60 €</p>
                <div className="ml-2 w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">i</span>
                </div>
              </div>

              <div className="flex items-center mb-3">
                <p className="text-sm text-gray-600">Restant : 1 904,40 €</p>
                <div className="ml-2 w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">i</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                <motion.div
                  className="h-2 bg-[#E30513] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "36.5%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </div>

              <ButtonEffect>
                <button
                  onClick={handleIncreaseLimit}
                  className="w-32 mx-auto py-2 px-4 border border-gray-300 rounded-full text-gray-700 text-sm font-medium flex items-center justify-center"
                >
                  Augmenter
                </button>
              </ButtonEffect>
            </div>
          </motion.div>

          {/* Plafond de retrait */}
          <motion.div
            className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">Plafond de retrait</p>
                  <p className="text-xs text-gray-500">Hebdomadaire</p>
                </div>
                <p className="font-semibold text-gray-800">1 500,00 €</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </PageTransition>
  )
}


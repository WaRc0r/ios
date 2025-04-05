"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import PageTransition from "@/components/page-transition"
import ButtonEffect from "@/components/button-effect"

export default function PrincipalePage() {
  const [showBalance, setShowBalance] = useState(false)
  const [isBalanceLoading, setIsBalanceLoading] = useState(false)
  const router = useRouter()
  const [isAppLoaded, setIsAppLoaded] = useState(false)

  useEffect(() => {
    // Simuler le chargement initial de l'application
    const timer = setTimeout(() => {
      setIsAppLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Function to handle accounts access - now redirects directly to login-code
  const handleAccountsAccess = () => {
    router.push("/login-code")
  }

  const handleShowBalance = () => {
    if (!showBalance) {
      setIsBalanceLoading(true)
      // Simulate loading balance data
      setTimeout(() => {
        setIsBalanceLoading(false)
        setShowBalance(true)
      }, 800)
    } else {
      setShowBalance(false)
    }
  }

  return (
    <PageTransition loadingTime={1500}>
      <div className="flex flex-col min-h-screen bg-white overflow-hidden">
        {/* Using the actual image for perfect reproduction, but cropping the bottom bar */}
        <div className="relative w-full h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isAppLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/sg-courtois-full.png"
              alt="SG Courtois Interface"
              fill
              style={{
                objectFit: "contain",
                objectPosition: "top",
                clipPath: "inset(0 0 20px 0)", // Crop the bottom 20px to remove black bar
              }}
              priority
            />
          </motion.div>

          {/* Interactive overlay for the "Afficher le solde" button */}
          <AnimatePresence>
            {isAppLoaded && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <ButtonEffect>
                  <button
                    onClick={handleShowBalance}
                    className="w-40 h-40 mt-16 opacity-0"
                    aria-label="Afficher le solde"
                  >
                    {/* This is an invisible button overlay */}
                  </button>
                </ButtonEffect>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Balance display that appears when clicked - positioned ABOVE the text */}
          {isBalanceLoading && (
            <motion.div
              className="absolute top-[34%] left-0 right-0 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
            </motion.div>
          )}

          <AnimatePresence>
            {showBalance && !isBalanceLoading && (
              <motion.div
                className="absolute top-[34%] left-0 right-0 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <p className="text-2xl font-bold text-gray-800">25.553,78 €</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive overlay for the "Accéder à mes comptes" button - positioned lower and slightly bigger */}
          <AnimatePresence>
            {isAppLoaded && (
              <motion.div
                className="absolute bottom-[80px] inset-x-0 flex justify-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 25 }}
              >
                <ButtonEffect>
                  <motion.button
                    className="w-52 h-13 py-3 bg-red-600 rounded-full text-white text-lg font-medium z-10"
                    onClick={handleAccountsAccess}
                    aria-label="Accéder à mes comptes"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Accéder à mes comptes
                  </motion.button>
                </ButtonEffect>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive overlay for the notification card */}
          <AnimatePresence>
            {isAppLoaded && (
              <motion.div
                className="absolute top-[52%] inset-x-0 flex justify-center"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 25 }}
              >
                <ButtonEffect>
                  <button
                    className="w-[90%] h-16 opacity-0"
                    onClick={() => alert("Notifications")}
                    aria-label="Voir mes notifications"
                  >
                    {/* This is an invisible button overlay */}
                  </button>
                </ButtonEffect>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive overlay for the question card */}
          <AnimatePresence>
            {isAppLoaded && (
              <motion.div
                className="absolute top-[65%] inset-x-0 flex justify-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 300, damping: 25 }}
              >
                <ButtonEffect>
                  <button
                    className="w-[90%] h-20 opacity-0"
                    onClick={() => alert("Question")}
                    aria-label="Posez-moi une question"
                  >
                    {/* This is an invisible button overlay */}
                  </button>
                </ButtonEffect>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}


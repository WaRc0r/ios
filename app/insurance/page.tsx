"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Home, Car, Heart, Umbrella, FileText } from "lucide-react"
import { motion } from "framer-motion"
import BottomNavigation from "@/components/bottom-navigation"
import PageTransition from "@/components/page-transition"
import ButtonEffect from "@/components/button-effect"

export default function InsurancePage() {
  const router = useRouter()

  const insurances = [
    {
      icon: <Home className="h-5 w-5 text-[#E30513]" />,
      title: "Assurance Habitation",
      description: "Appartement - 75 m²",
      status: "Actif",
      nextPayment: "15/05/2025",
      amount: "28,50 €/mois",
    },
    {
      icon: <Car className="h-5 w-5 text-[#E30513]" />,
      title: "Assurance Auto",
      description: "Renault Clio - AZ-123-XY",
      status: "Actif",
      nextPayment: "10/05/2025",
      amount: "45,75 €/mois",
    },
    {
      icon: <Heart className="h-5 w-5 text-[#E30513]" />,
      title: "Assurance Santé",
      description: "Formule Famille",
      status: "Actif",
      nextPayment: "01/05/2025",
      amount: "89,90 €/mois",
    },
    {
      icon: <Umbrella className="h-5 w-5 text-[#E30513]" />,
      title: "Assurance Prévoyance",
      description: "Protection Accidents de la Vie",
      status: "Actif",
      nextPayment: "20/05/2025",
      amount: "15,30 €/mois",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-white pb-16">
        {/* Header */}
        <header className="bg-[#E30513] text-white px-4 pt-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <ButtonEffect activeScale={0.9}>
              <button onClick={() => router.push("/more")} className="focus:outline-none">
                <ChevronLeft className="h-6 w-6" />
              </button>
            </ButtonEffect>
            <motion.h1
              className="text-xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ASSURANCES
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

        {/* Insurance content */}
        <div className="flex-1 px-4 py-6 bg-gray-50">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold">Vos contrats d'assurance</h2>
            <p className="text-sm text-gray-500 mt-1">Consultez et gérez vos assurances</p>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
            {insurances.map((insurance, index) => (
              <motion.div key={index} variants={item} whileHover={{ scale: 1.01 }}>
                <ButtonEffect>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mr-3">
                            {insurance.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{insurance.title}</h3>
                            <p className="text-xs text-gray-500">{insurance.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-xs text-gray-600">{insurance.status}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Prochain prélèvement: {insurance.nextPayment}</p>
                          <p className="text-sm font-medium">{insurance.amount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ButtonEffect>
              </motion.div>
            ))}
          </motion.div>

          {/* Claims */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Déclarer un sinistre</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Vous pouvez déclarer un sinistre en ligne pour tous vos contrats d'assurance.
              </p>
              <ButtonEffect>
                <button className="w-full py-3 bg-[#E30513] text-white rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Déclarer un sinistre
                </button>
              </ButtonEffect>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Besoin d'aide ?</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Contactez nos conseillers assurance au 09 69 39 33 39 du lundi au vendredi de 8h à 19h et le samedi de
                9h à 17h.
              </p>
              <ButtonEffect>
                <button className="w-full py-3 bg-gray-100 rounded-lg text-gray-700 font-medium">
                  Contacter un conseiller
                </button>
              </ButtonEffect>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </PageTransition>
  )
}


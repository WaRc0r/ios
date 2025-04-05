"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, Gift, Tag, Ticket, Coffee, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"
import BottomNavigation from "@/components/bottom-navigation"
import PageTransition from "@/components/page-transition"
import ButtonEffect from "@/components/button-effect"

export default function BenefitsPage() {
  const router = useRouter()

  const benefits = [
    {
      icon: <Tag className="h-5 w-5 text-white" />,
      title: "20% de réduction",
      description: "Sur votre prochain achat chez Fnac",
      expiry: "Expire le 30/05/2025",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Coffee className="h-5 w-5 text-white" />,
      title: "Café offert",
      description: "Dans tous les Starbucks de France",
      expiry: "Expire le 15/05/2025",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Ticket className="h-5 w-5 text-white" />,
      title: "2 places de cinéma",
      description: "Pour le prix d'une chez Pathé Gaumont",
      expiry: "Expire le 31/05/2025",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <ShoppingBag className="h-5 w-5 text-white" />,
      title: "15€ offerts",
      description: "Dès 100€ d'achat sur Amazon",
      expiry: "Expire le 10/05/2025",
      color: "from-yellow-500 to-yellow-600",
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
              AVANTAGES
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

        {/* Benefits content */}
        <div className="flex-1 px-4 py-6 bg-gray-50">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold">Vos avantages exclusifs</h2>
            <p className="text-sm text-gray-500 mt-1">En tant que client Société Générale</p>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={item} whileHover={{ scale: 1.02 }}>
                <ButtonEffect>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-lg flex items-center justify-center mr-4`}
                        >
                          {benefit.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{benefit.title}</h3>
                          <p className="text-sm text-gray-600">{benefit.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{benefit.expiry}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ButtonEffect>
              </motion.div>
            ))}
          </motion.div>

          {/* Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Vos points fidélité</h3>
                <div className="bg-[#E30513] text-white px-3 py-1 rounded-full text-sm font-medium">1250 pts</div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">Vous êtes à 250 points de la récompense suivante !</p>
              <div className="w-full h-2 bg-gray-100 rounded-full mb-4">
                <motion.div
                  className="h-2 bg-[#E30513] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "83%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </div>
              <ButtonEffect>
                <button className="w-full py-3 bg-gray-100 rounded-lg text-gray-700 font-medium">
                  Échanger mes points
                </button>
              </ButtonEffect>
            </div>
          </motion.div>

          {/* Discover more */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Découvrir plus d'avantages</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Explorez toutes les offres et avantages disponibles pour les clients Société Générale.
              </p>
              <ButtonEffect>
                <button className="w-full py-3 bg-[#E30513] text-white rounded-lg flex items-center justify-center">
                  <Gift className="h-5 w-5 mr-2" />
                  Voir tous les avantages
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


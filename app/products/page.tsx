"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, CreditCard, Wallet, Landmark, PiggyBank, Plus } from "lucide-react"
import { motion } from "framer-motion"
import BottomNavigation from "@/components/bottom-navigation"
import PageTransition from "@/components/page-transition"
import ButtonEffect from "@/components/button-effect"

export default function ProductsPage() {
  const router = useRouter()

  const products = [
    {
      icon: <CreditCard className="h-5 w-5 text-[#E30513]" />,
      title: "Cartes bancaires",
      description: "Gérez vos cartes et leurs plafonds",
      count: 2,
    },
    {
      icon: <Wallet className="h-5 w-5 text-[#E30513]" />,
      title: "Comptes courants",
      description: "Consultez vos comptes et leurs opérations",
      count: 3,
    },
    {
      icon: <PiggyBank className="h-5 w-5 text-[#E30513]" />,
      title: "Épargne",
      description: "Livrets, PEL, assurance vie",
      count: 2,
    },
    {
      icon: <Landmark className="h-5 w-5 text-[#E30513]" />,
      title: "Crédits",
      description: "Prêts immobiliers et à la consommation",
      count: 1,
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
              MES PRODUITS
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

        {/* Products content */}
        <div className="flex-1 px-4 py-6 bg-gray-50">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold">Vos produits bancaires</h2>
            <p className="text-sm text-gray-500 mt-1">Consultez et gérez tous vos produits</p>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
            {products.map((product, index) => (
              <motion.div key={index} variants={item} whileHover={{ scale: 1.01 }}>
                <ButtonEffect>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mr-3">
                          {product.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{product.title}</h3>
                          <p className="text-xs text-gray-500">{product.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-100 rounded-full px-2 py-0.5 text-xs font-medium text-gray-600 mr-2">
                          {product.count}
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </ButtonEffect>
              </motion.div>
            ))}
          </motion.div>

          {/* Add new product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6"
          >
            <ButtonEffect>
              <button className="w-full py-3 bg-[#E30513] text-white rounded-lg flex items-center justify-center">
                <Plus className="h-5 w-5 mr-2" />
                Souscrire à un nouveau produit
              </button>
            </ButtonEffect>
          </motion.div>

          {/* Offers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Offres personnalisées</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Découvrez nos offres adaptées à votre profil et à vos besoins.
              </p>
              <ButtonEffect>
                <button className="w-full py-3 bg-gray-100 rounded-lg text-gray-700 font-medium">
                  Voir mes offres
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


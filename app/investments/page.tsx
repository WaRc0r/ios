"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, TrendingUp, PieChart, BarChart, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { motion } from "framer-motion"
import BottomNavigation from "@/components/bottom-navigation"
import PageTransition from "@/components/page-transition"
import ButtonEffect from "@/components/button-effect"

export default function InvestmentsPage() {
  const router = useRouter()

  const investments = [
    {
      name: "Assurance Vie",
      value: 25680.45,
      performance: 3.2,
      isPositive: true,
      allocation: [
        { name: "Fonds euros", percentage: 60 },
        { name: "Actions", percentage: 30 },
        { name: "Obligations", percentage: 10 },
      ],
    },
    {
      name: "PEA",
      value: 12450.78,
      performance: -1.5,
      isPositive: false,
      allocation: [
        { name: "Actions françaises", percentage: 45 },
        { name: "Actions européennes", percentage: 35 },
        { name: "ETF", percentage: 20 },
      ],
    },
    {
      name: "Compte Titres",
      value: 8750.32,
      performance: 2.8,
      isPositive: true,
      allocation: [
        { name: "Actions", percentage: 70 },
        { name: "Obligations", percentage: 20 },
        { name: "Liquidités", percentage: 10 },
      ],
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
              MES INVESTISSEMENTS
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

        {/* Investments content */}
        <div className="flex-1 px-4 py-6 bg-gray-50">
          {/* Total investments */}
          <motion.div
            className="bg-white rounded-lg shadow-sm overflow-hidden mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Valeur totale</h3>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+2.4%</span>
                </div>
              </div>
              <p className="text-2xl font-bold">46 881,55 €</p>
              <p className="text-xs text-gray-500">Dernière mise à jour: 05/04/2025</p>
            </div>
          </motion.div>

          {/* Allocation chart */}
          <motion.div
            className="bg-white rounded-lg shadow-sm overflow-hidden mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Répartition globale</h3>
            </div>
            <div className="p-4 flex items-center justify-center">
              <div className="w-32 h-32 relative rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <PieChart className="h-12 w-12 text-gray-400" />
              </div>
              <div className="ml-4">
                <div className="mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#E30513] rounded-sm mr-2"></div>
                    <span className="text-sm">Actions (45%)</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                    <span className="text-sm">Fonds euros (35%)</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-sm mr-2"></div>
                    <span className="text-sm">Obligations (15%)</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-sm mr-2"></div>
                    <span className="text-sm">Liquidités (5%)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Investment list */}
          <h3 className="font-medium mb-4">Mes investissements</h3>
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
            {investments.map((investment, index) => (
              <motion.div key={index} variants={item} whileHover={{ scale: 1.01 }}>
                <ButtonEffect>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{investment.name}</h3>
                        <div
                          className={`flex items-center ${investment.isPositive ? "text-green-600" : "text-red-600"}`}
                        >
                          {investment.isPositive ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          <span className="text-sm font-medium">
                            {investment.isPositive ? "+" : ""}
                            {investment.performance}%
                          </span>
                        </div>
                      </div>
                      <p className="text-xl font-bold mb-2">
                        {investment.value.toLocaleString("fr-FR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        €
                      </p>
                      <div className="flex items-center">
                        <BarChart className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="flex-1">
                          <div className="w-full h-2 bg-gray-100 rounded-full">
                            <div className="flex h-full rounded-full overflow-hidden">
                              {investment.allocation.map((alloc, i) => (
                                <div
                                  key={i}
                                  className={`h-full ${i === 0 ? "bg-[#E30513]" : i === 1 ? "bg-blue-500" : "bg-yellow-500"}`}
                                  style={{ width: `${alloc.percentage}%` }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ButtonEffect>
              </motion.div>
            ))}
          </motion.div>

          {/* Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Performance annuelle</h3>
            </div>
            <div className="p-4 flex items-center justify-center h-40">
              <TrendingUp className="h-16 w-16 text-gray-300" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </PageTransition>
  )
}


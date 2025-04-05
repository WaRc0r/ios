"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ChevronLeft, Download, Filter, ArrowDown, ArrowUp, FileText, Calendar, Printer } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import BottomNavigation from "@/components/bottom-navigation"
import PageSlideTransition from "@/components/page-slide-transition"
import ButtonEffect from "@/components/button-effect"
import SkeletonLoader from "@/components/skeleton-loader"
import AnimatedNumber from "@/components/animated-number"
import SwipeToAction from "@/components/swipe-to-action"

type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  category?: string
}

type StatementData = {
  id: string
  name: string
  startDate: string
  endDate: string
  startBalance: number
  endBalance: number
  transactions: Transaction[]
}

export default function StatementDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [statement, setStatement] = useState<StatementData | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const transactionsPerPage = 20

  useEffect(() => {
    // Reset to first page when filter changes
    setCurrentPage(1)
  }, [filter])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      // Mock data based on statement ID
      const statementId = params.statementId as string
      const id = params.id as string

      if (statementId === "statement-1") {
        setStatement({
          id: "statement-1",
          name: "Relevé du 23/01/2025 au 22/02/2025",
          startDate: "23/01/2025",
          endDate: "22/02/2025",
          startBalance: 24553.78,
          endBalance: 25553.78,
          transactions: [
            // Same transactions as in the main account page
            {
              id: "1",
              date: "21 Fév",
              description: "FRAIS PAIEMENT HORS ZONE EURO CARTE X1694 19/02 4,70 EUR SUISSE",
              amount: -0.13,
              category: "Frais bancaires",
            },
            {
              id: "2",
              date: "21 Fév",
              description: "CARTE X1694 20/02 MERVEILLES DE VA",
              amount: -5.0,
              category: "Achats",
            },
            {
              id: "3",
              date: "21 Fév",
              description: "VIR RECU5186370585S - M.J.C. DU VUACHE",
              amount: 221.36,
              category: "Revenus",
            },
            // ... more transactions
          ],
        })
      } else if (statementId === "statement-2") {
        setStatement({
          id: "statement-2",
          name: "Relevé du 23/12/2024 au 22/01/2025",
          startDate: "23/12/2024",
          endDate: "22/01/2025",
          startBalance: 22553.78,
          endBalance: 24553.78,
          transactions: [
            // Transactions for this statement
            {
              id: "38",
              date: "22 Jan",
              description: "CARTE X1694 21/01 PAYPAL *cliniqueesthetiq",
              amount: -300.0,
              category: "Bien-être",
            },
            {
              id: "39",
              date: "22 Jan",
              description: "CARTE X1694 21/01 aliexpress",
              amount: -33.05,
              category: "Achats",
            },
            // ... more transactions
          ],
        })
      }
      // Add more statement data as needed

      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [params.statementId])

  // Filter transactions
  const filteredTransactions =
    filter === "all"
      ? statement?.transactions || []
      : filter === "in"
        ? (statement?.transactions || []).filter((t) => t.amount > 0)
        : (statement?.transactions || []).filter((t) => t.amount < 0)

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage)
  const indexOfLastTransaction = currentPage * transactionsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction)

  // Calculate statement summary
  const calculateStatementSummary = () => {
    if (!statement) return { totalIn: "0.00", totalOut: "0.00", balance: "0.00" }

    const totalIn = statement.transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

    const totalOut = statement.transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)

    return {
      totalIn: totalIn.toFixed(2),
      totalOut: totalOut.toFixed(2),
      balance: (totalIn + totalOut).toFixed(2),
    }
  }

  const statementSummary = calculateStatementSummary()

  return (
    <PageSlideTransition direction="right">
      <div className="flex flex-col min-h-screen bg-white pb-16">
        {/* Header */}
        <header className="bg-[#E30513] text-white px-4 pt-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <ButtonEffect activeScale={0.9}>
              <button onClick={() => router.back()} className="focus:outline-none">
                <ChevronLeft className="h-6 w-6" />
              </button>
            </ButtonEffect>
            <motion.h1
              className="text-xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              RELEVÉ
            </motion.h1>
            <ButtonEffect activeScale={0.9}>
              <button className="focus:outline-none" onClick={() => router.push(`/accounts/current/${params.id}/pdf`)}>
                <FileText className="h-6 w-6" />
              </button>
            </ButtonEffect>
          </div>

          {/* Statement info */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isLoading ? (
              <div className="flex flex-col items-center">
                <SkeletonLoader width={200} height={20} className="bg-white/20 mb-2" />
                <SkeletonLoader width={120} height={16} className="bg-white/20" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center mb-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <p className="text-sm">{statement?.name}</p>
                </div>
                <div className="flex justify-center space-x-4 mt-2">
                  <div>
                    <p className="text-xs opacity-70">Solde initial</p>
                    <p className="font-medium">
                      {statement?.startBalance.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-70">Solde final</p>
                    <p className="font-medium">
                      {statement?.endBalance.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </header>

        {/* Statement summary */}
        {!isLoading && (
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500">Entrées</p>
                <p className="font-medium text-green-600">+{statementSummary.totalIn} €</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Sorties</p>
                <p className="font-medium">{statementSummary.totalOut} €</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Solde</p>
                <p
                  className={`font-medium ${Number.parseFloat(statementSummary.balance) >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {statementSummary.balance} €
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex justify-around">
          <ButtonEffect>
            <button className="flex flex-col items-center py-2">
              <Download className="h-5 w-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-600">Télécharger</span>
            </button>
          </ButtonEffect>
          <ButtonEffect>
            <button className="flex flex-col items-center py-2">
              <Printer className="h-5 w-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-600">Imprimer</span>
            </button>
          </ButtonEffect>
          <ButtonEffect>
            <button
              className="flex flex-col items-center py-2"
              onClick={() => router.push(`/accounts/current/${params.id}/pdf`)}
            >
              <FileText className="h-5 w-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-600">Version PDF</span>
            </button>
          </ButtonEffect>
        </div>

        {/* Transactions */}
        <div className="flex-1 bg-gray-50">
          {/* Filters */}
          <div className="flex p-4 bg-white border-b">
            <ButtonEffect className="flex-1">
              <button
                className={`w-full py-2 px-3 rounded-full text-sm font-medium ${filter === "all" ? "bg-gray-100 text-gray-800" : "text-gray-500"}`}
                onClick={() => setFilter("all")}
              >
                Toutes
              </button>
            </ButtonEffect>
            <ButtonEffect className="flex-1">
              <button
                className={`w-full py-2 px-3 rounded-full text-sm font-medium flex items-center justify-center ${filter === "in" ? "bg-gray-100 text-gray-800" : "text-gray-500"}`}
                onClick={() => setFilter("in")}
              >
                <ArrowDown className="h-4 w-4 mr-1" /> Entrées
              </button>
            </ButtonEffect>
            <ButtonEffect className="flex-1">
              <button
                className={`w-full py-2 px-3 rounded-full text-sm font-medium flex items-center justify-center ${filter === "out" ? "bg-gray-100 text-gray-800" : "text-gray-500"}`}
                onClick={() => setFilter("out")}
              >
                <ArrowUp className="h-4 w-4 mr-1" /> Sorties
              </button>
            </ButtonEffect>
          </div>

          {/* Transaction list */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold">Opérations</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">{filteredTransactions.length} opérations</span>
                <ButtonEffect>
                  <button className="flex items-center text-sm text-gray-600">
                    <Filter className="h-4 w-4 mr-1" /> Filtrer
                  </button>
                </ButtonEffect>
              </div>
            </div>

            <AnimatePresence>
              {isLoading ? (
                // Skeleton loaders for transactions
                <>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm p-3 mb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <SkeletonLoader width={80} height={16} className="mb-2" />
                          <SkeletonLoader width={160} height={20} />
                        </div>
                        <SkeletonLoader width={80} height={20} />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="space-y-3">
                  {currentTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <SwipeToAction
                        leftAction={
                          <div className="h-full bg-blue-500 flex items-center justify-center px-6">
                            <Download className="h-6 w-6 text-white" />
                          </div>
                        }
                      >
                        <div className="bg-white rounded-lg shadow-sm p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <p className="text-sm text-gray-500">{transaction.date}</p>
                                {transaction.category && (
                                  <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                                    {transaction.category}
                                  </span>
                                )}
                              </div>
                              <p className="font-medium mt-1">{transaction.description}</p>
                            </div>
                            <AnimatedNumber
                              value={transaction.amount}
                              className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-gray-800"}`}
                              prefix={transaction.amount > 0 ? "+" : ""}
                              suffix=" €"
                            />
                          </div>
                        </div>
                      </SwipeToAction>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </PageSlideTransition>
  )
}


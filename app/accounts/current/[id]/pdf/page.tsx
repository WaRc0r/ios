"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ChevronLeft, Download, Printer, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import PageSlideTransition from "@/components/page-slide-transition"
import ButtonEffect from "@/components/button-effect"
import SkeletonLoader from "@/components/skeleton-loader"

export default function StatementPdfPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [statementData, setStatementData] = useState<{
    period: string
    accountName: string
    accountNumber: string
    startDate: string
    endDate: string
    startBalance: number
    endBalance: number
  } | null>(null)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      const id = params.id as string

      if (id === "perso") {
        setStatementData({
          period: "Relevé du 23/01/2025 au 22/02/2025",
          accountName: "Compte Perso",
          accountNumber: "•••• 3379",
          startDate: "23/01/2025",
          endDate: "22/02/2025",
          startBalance: 24553.78,
          endBalance: 25553.78,
        })
      } else if (id === "joint") {
        setStatementData({
          period: "Relevé du 23/03/2025 au 22/04/2025",
          accountName: "Compte Joint",
          accountNumber: "•••• 7890",
          startDate: "23/03/2025",
          endDate: "22/04/2025",
          startBalance: 1200.0,
          endBalance: 1350.0,
        })
      }
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [params.id])

  return (
    <PageSlideTransition direction="right">
      <div className="flex flex-col min-h-screen bg-white">
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
              RELEVÉ PDF
            </motion.h1>
            <ButtonEffect activeScale={0.9}>
              <button className="focus:outline-none">
                <Download className="h-6 w-6" />
              </button>
            </ButtonEffect>
          </div>
        </header>

        {/* PDF Viewer */}
        <div className="flex-1 bg-gray-100 p-4">
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center">
              <SkeletonLoader width="100%" height={400} className="mb-4" />
              <SkeletonLoader width="60%" height={20} className="mb-2" />
              <SkeletonLoader width="40%" height={20} />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* PDF Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 18H17V16H7V18Z" fill="#E30513" />
                        <path d="M17 14H7V12H17V14Z" fill="#E30513" />
                        <path d="M7 10H11V8H7V10Z" fill="#E30513" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM5 5C5 4.44772 5.44772 4 6 4H14C16.7614 4 19 6.23858 19 9V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5Z"
                          fill="#E30513"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="font-semibold">{statementData?.period}</h2>
                      <p className="text-sm text-gray-500">
                        {statementData?.accountName} - N° {statementData?.accountNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <ButtonEffect>
                      <button className="p-2 bg-gray-100 rounded-full">
                        <Printer className="h-5 w-5 text-gray-600" />
                      </button>
                    </ButtonEffect>
                    <ButtonEffect>
                      <button className="p-2 bg-gray-100 rounded-full">
                        <Share2 className="h-5 w-5 text-gray-600" />
                      </button>
                    </ButtonEffect>
                  </div>
                </div>
              </div>

              {/* PDF Content Preview */}
              <div className="p-6">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Solde au {statementData?.startDate}</span>
                    <span className="font-medium">
                      {statementData?.startBalance.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Solde au {statementData?.endDate}</span>
                    <span className="font-medium">
                      {statementData?.endBalance.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                    </span>
                  </div>
                </div>

                {/* Simulated PDF content */}
                <div className="space-y-4">
                  <div className="h-12 bg-gray-100 w-full rounded"></div>
                  <div className="h-40 bg-gray-100 w-full rounded"></div>
                  <div className="h-60 bg-gray-100 w-full rounded"></div>
                  <div className="h-40 bg-gray-100 w-full rounded"></div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">Page 1 sur 3</p>
                </div>
              </div>

              {/* Download button */}
              <div className="p-4 border-t border-gray-200">
                <ButtonEffect>
                  <button className="w-full py-3 bg-[#E30513] text-white rounded-lg flex items-center justify-center">
                    <Download className="h-5 w-5 mr-2" />
                    Télécharger le PDF
                  </button>
                </ButtonEffect>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageSlideTransition>
  )
}


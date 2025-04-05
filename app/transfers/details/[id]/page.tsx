"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { ChevronLeft, Download, Share2, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import PageSlideTransition from "@/components/page-slide-transition"
import ButtonEffect from "@/components/button-effect"

type Transfer = {
  id: string
  date: string
  beneficiary: string
  beneficiaryAccount: string
  beneficiaryBank: string
  amount: number
  status: "completed" | "pending" | "failed"
  reference?: string
  transactionId: string
}

export default function TransferDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [transfer, setTransfer] = useState<Transfer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      // Trouver le transfert correspondant à l'ID
      const transferId = params.id as string

      // Données fictives pour la démonstration
      const transferData: Record<string, Transfer> = {
        t1: {
          id: "t1",
          date: "04/02/2025",
          beneficiary: "Gerald Dumont",
          beneficiaryAccount: "FR76 •••• •••• •••• 5432",
          beneficiaryBank: "Crédit Agricole",
          amount: 1045.0,
          status: "completed",
          reference: "LOYER FEVRIER 2025",
          transactionId: "VIR5839274619",
        },
        t2: {
          id: "t2",
          date: "12/02/2025",
          beneficiary: "Benjamin Thon",
          beneficiaryAccount: "FR76 •••• •••• •••• 1234",
          beneficiaryBank: "BNP Paribas",
          amount: 500.0,
          status: "completed",
          reference: "REMBOURSEMENT VACANCES",
          transactionId: "VIR7291846352",
        },
        t3: {
          id: "t3",
          date: "18/02/2025",
          beneficiary: "Guillaume Waterlot",
          beneficiaryAccount: "FR76 •••• •••• •••• 6543",
          beneficiaryBank: "Société Générale",
          amount: 59.0,
          status: "completed",
          reference: "REMBOURSEMENT REPAS",
          transactionId: "VIR1928374650",
        },
        t6: {
          id: "t6",
          date: "03/04/2025",
          beneficiary: "Benjamin Thon",
          beneficiaryAccount: "FR76 •••• •••• •••• 1234",
          beneficiaryBank: "BNP Paribas",
          amount: 250.0,
          status: "pending",
          reference: "REMBOURSEMENT COURSES",
          transactionId: "VIR8273645190",
        },
      }

      setTransfer(transferData[transferId] || null)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  // Rendu du statut
  const renderStatus = () => {
    if (!transfer) return null

    switch (transfer.status) {
      case "completed":
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Virement effectué</span>
          </div>
        )
      case "pending":
        return (
          <div className="flex items-center text-orange-500">
            <Clock className="h-5 w-5 mr-2" />
            <span>En cours de traitement</span>
          </div>
        )
      case "failed":
        return (
          <div className="flex items-center text-red-500">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span>Échec du virement</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <PageSlideTransition>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header */}
        <header className="bg-[#E30513] text-white px-4 pt-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <ButtonEffect activeScale={0.9}>
              <button onClick={() => router.push("/transfers")} className="focus:outline-none">
                <ChevronLeft className="h-6 w-6" />
              </button>
            </ButtonEffect>
            <motion.h1
              className="text-xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              DÉTAILS DU VIREMENT
            </motion.h1>
            <div className="w-6"></div> {/* Empty div for spacing */}
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 px-4 py-6 bg-gray-50">
          {isLoading ? (
            // Skeleton loading
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : transfer ? (
            <>
              {/* Status */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-500">Statut</h3>
                  {renderStatus()}
                </div>
              </div>

              {/* Transfer details */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Détails du virement</h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Montant</span>
                    <span className="font-semibold">{transfer.amount.toLocaleString("fr-FR")} €</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Bénéficiaire</span>
                    <span className="font-semibold">{transfer.beneficiary}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Compte</span>
                    <span className="text-sm">{transfer.beneficiaryAccount}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Banque</span>
                    <span className="text-sm">{transfer.beneficiaryBank}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Date d'exécution</span>
                    <span className="text-sm">{transfer.date}</span>
                  </div>

                  {transfer.reference && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Référence</span>
                      <span className="text-sm">{transfer.reference}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">N° de transaction</span>
                    <span className="text-sm">{transfer.transactionId}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 mb-6">
                <ButtonEffect className="flex-1">
                  <button className="w-full py-3 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700">
                    <Download className="h-5 w-5 mr-2" />
                    Télécharger
                  </button>
                </ButtonEffect>
                <ButtonEffect className="flex-1">
                  <button className="w-full py-3 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700">
                    <Share2 className="h-5 w-5 mr-2" />
                    Partager
                  </button>
                </ButtonEffect>
              </div>

              {/* Return button */}
              <ButtonEffect>
                <button
                  onClick={() => router.push("/transfers")}
                  className="w-full py-3 bg-[#E30513] text-white rounded-lg font-medium"
                >
                  Retour aux virements
                </button>
              </ButtonEffect>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <AlertTriangle className="h-16 w-16 text-orange-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">Virement introuvable</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-xs text-center">
                Le virement que vous recherchez n'existe pas ou n'est plus disponible.
              </p>
              <ButtonEffect>
                <button
                  onClick={() => router.push("/transfers")}
                  className="mt-6 px-6 py-2 bg-[#E30513] text-white rounded-full"
                >
                  Retour aux virements
                </button>
              </ButtonEffect>
            </div>
          )}
        </div>
      </div>
    </PageSlideTransition>
  )
}


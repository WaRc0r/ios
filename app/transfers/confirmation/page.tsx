"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, ChevronLeft, Download, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import PageSlideTransition from "@/components/page-slide-transition"
import ButtonEffect from "@/components/button-effect"

type Beneficiary = {
  id: string
  name: string
  accountType: string
  accountNumber: string
  bank?: string
  isCompany?: boolean
}

export default function TransferConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [transferDetails, setTransferDetails] = useState<{
    amount: string
    beneficiary: Beneficiary | null
    reference: string
    date: string
    transactionId: string
  }>({
    amount: "",
    beneficiary: null,
    reference: "",
    date: "",
    transactionId: "",
  })

  // Liste complète des bénéficiaires
  const allBeneficiaries: Beneficiary[] = [
    {
      id: "1",
      name: "Gerald Dumont",
      accountType: "Compte courant",
      accountNumber: "FR76 •••• •••• •••• 5432",
      bank: "Crédit Agricole",
      isCompany: false,
    },
    {
      id: "2",
      name: "M.J.C. du Vuache",
      accountType: "Compte professionnel",
      accountNumber: "FR76 •••• •••• •••• 7890",
      bank: "Société Générale",
      isCompany: true,
    },
    {
      id: "3",
      name: "Benjamin Thon",
      accountType: "Compte courant",
      accountNumber: "FR76 •••• •••• •••• 1234",
      bank: "BNP Paribas",
      isCompany: false,
    },
    {
      id: "4",
      name: "Olympe Rouault",
      accountType: "Compte courant",
      accountNumber: "FR76 •••• •••• •••• 9876",
      bank: "Caisse d'Épargne",
      isCompany: false,
    },
    {
      id: "5",
      name: "Guillaume Waterlot",
      accountType: "Compte courant",
      accountNumber: "FR76 •••• •••• •••• 6543",
      bank: "Société Générale",
      isCompany: false,
    },
    {
      id: "6",
      name: "Veronique Perraud",
      accountType: "Compte courant",
      accountNumber: "FR76 •••• •••• •••• 2109",
      bank: "Crédit Mutuel",
      isCompany: false,
    },
    {
      id: "7",
      name: "FRANCE TRAVAIL",
      accountType: "Compte professionnel",
      accountNumber: "FR76 •••• •••• •••• 3579",
      bank: "Banque de France",
      isCompany: true,
    },
    {
      id: "8",
      name: "SOGEFINANCEMENT",
      accountType: "Compte professionnel",
      accountNumber: "FR76 •••• •••• •••• 4680",
      bank: "Société Générale",
      isCompany: true,
    },
    {
      id: "9",
      name: "GESTION ASSURANCES",
      accountType: "Compte professionnel",
      accountNumber: "FR76 •••• •••• •••• 7821",
      bank: "AXA Banque",
      isCompany: true,
    },
    {
      id: "10",
      name: "Orange SA",
      accountType: "Compte professionnel",
      accountNumber: "FR76 •••• •••• •••• 9354",
      bank: "BNP Paribas",
      isCompany: true,
    },
    {
      id: "11",
      name: "ALLIANZ I.A.R.D.",
      accountType: "Compte professionnel",
      accountNumber: "FR76 •••• •••• •••• 6127",
      bank: "Crédit Mutuel",
      isCompany: true,
    },
    {
      id: "12",
      name: "LOGITEL",
      accountType: "Service de virement",
      accountNumber: "FR76 •••• •••• •••• 8765",
      bank: "Société Générale",
      isCompany: true,
    },
    {
      id: "13",
      name: "PayPal Europe",
      accountType: "Service de paiement",
      accountNumber: "LU96 •••• •••• •••• 4321",
      bank: "PayPal",
      isCompany: true,
    },
    {
      id: "14",
      name: "VESTIAIRE COLLECTIVE",
      accountType: "Compte professionnel",
      accountNumber: "FR76 •••• •••• •••• 2468",
      bank: "HSBC",
      isCompany: true,
    },
    {
      id: "15",
      name: "ibani SA",
      accountType: "Compte professionnel",
      accountNumber: "CH93 •••• •••• •••• 1357",
      bank: "UBS",
      isCompany: true,
    },
  ]

  // Filtrer pour ne garder que les bénéficiaires particuliers
  const beneficiaries = allBeneficiaries.filter((b) => !b.isCompany)

  useEffect(() => {
    // Récupérer les paramètres de l'URL
    const amount = searchParams.get("amount") || ""
    const beneficiaryId = searchParams.get("beneficiary") || ""
    const reference = searchParams.get("reference") || ""
    const date = searchParams.get("date") || ""

    // Trouver le bénéficiaire
    const beneficiary = beneficiaries.find((b) => b.id === beneficiaryId) || null

    // Générer un ID de transaction aléatoire
    const transactionId = generateTransactionId()

    setTransferDetails({
      amount,
      beneficiary,
      reference: decodeURIComponent(reference),
      date: formatDate(date),
      transactionId,
    })
  }, [searchParams])

  // Générer un ID de transaction aléatoire
  const generateTransactionId = () => {
    return (
      "VIR" +
      Math.floor(Math.random() * 10000000000)
        .toString()
        .padStart(10, "0")
    )
  }

  // Formater la date
  const formatDate = (dateString: string) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
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
              CONFIRMATION
            </motion.h1>
            <div className="w-6"></div> {/* Empty div for spacing */}
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 px-4 py-6 bg-gray-50">
          {/* Success message */}
          <motion.div
            className="flex flex-col items-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-center mb-1">Virement effectué</h2>
            <p className="text-sm text-gray-500 text-center">Votre virement a été traité avec succès</p>
          </motion.div>

          {/* Transfer details */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Détails du virement</h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Montant</span>
                <span className="font-semibold">
                  {Number.parseFloat(transferDetails.amount).toLocaleString("fr-FR")} €
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Bénéficiaire</span>
                <span className="font-semibold">{transferDetails.beneficiary?.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Compte</span>
                <span className="text-sm">{transferDetails.beneficiary?.accountNumber}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Banque</span>
                <span className="text-sm">{transferDetails.beneficiary?.bank}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Date d'exécution</span>
                <span className="text-sm">{transferDetails.date}</span>
              </div>

              {transferDetails.reference && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Référence</span>
                  <span className="text-sm">{transferDetails.reference}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">N° de transaction</span>
                <span className="text-sm">{transferDetails.transactionId}</span>
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
        </div>
      </div>
    </PageSlideTransition>
  )
}


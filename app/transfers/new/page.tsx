"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, User, Calendar, Info, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import PageSlideTransition from "@/components/page-slide-transition"
import ButtonEffect from "@/components/button-effect"
import AnimatedNumber from "@/components/animated-number"

type Beneficiary = {
  id: string
  name: string
  accountType: string
  accountNumber: string
  bank?: string
  isFrequent: boolean
  image?: string
  lastTransfer?: string
  isCompany?: boolean
}

export default function NewTransferPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const beneficiaryId = searchParams.get("beneficiary")

  const [amount, setAmount] = useState("")
  const [reference, setReference] = useState("")
  const [date, setDate] = useState(getTodayDate())
  const [isRecurring, setIsRecurring] = useState(false)
  const [frequency, setFrequency] = useState("monthly")
  const [endDate, setEndDate] = useState(getNextYearDate())
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ amount?: string; date?: string }>({})
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null)

  // Liste complète des bénéficiaires
  const allBeneficiaries: Beneficiary[] = [
    {
      id: "1",
      name: "Gerald Dumont",
      accountType: "Compte courant",
      accountNumber: "FR76 •••• •••• •••• 5432",
      bank: "Crédit Agricole",
      isFrequent: true,
      lastTransfer: "04/02/2025",
      isCompany: false,
    },
    {
      id: "2",
      name: "M.J.C. du Vuache",
      accountType: "Compte professionnel",
      accountNumber: "FR76 •••• •••• •••• 7890",
      bank: "Société Générale",
      isFrequent: true,
      lastTransfer: "21/02/2025",
      isCompany: true,
    },
    {
      id: "3",
      name: "Benjamin Thon",
      accountType: "Compte courant",
      accountNumber: "FR76 •••• •••• •••• 1234",
      bank: "BNP Paribas",
      isFrequent: true,
      lastTransfer: "12/02/2025",
      isCompany: false,
    },
    {
      id: "4",
      name: "Olympe Rouault",
      accountType: "Compte courant",
      accountNumber: "FR76 •••• •••• •••• 9876",
      bank: "Caisse d'Épargne",
      isFrequent: false,
      lastTransfer: "04/12/2024",
      isCompany: false,
    },
    {
      id: "5",
      name: "Guillaume Waterlot",
      accountType: "Compte courant",
      accountNumber: "FR76 •••• •••• •••• 6543",
      bank: "Société Générale",
      isFrequent: false,
      lastTransfer: "18/02/2025",
      isCompany: false,
    },
    {
      id: "6",
      name: "Veronique Perraud",
      accountType: "Compte courant",
      accountNumber: "FR76 •••• •••• •••• 2109",
      bank: "Crédit Mutuel",
      isFrequent: false,
      lastTransfer: "22/01/2025",
      isCompany: false,
    },
    {
      id: "7",
      name: "FRANCE TRAVAIL",
      accountType: "Compte professionnel",
      accountNumber: "FR76 •••• •••• •••• 3579",
      bank: "Banque de France",
      isFrequent: true,
      lastTransfer: "03/02/2025",
      isCompany: true,
    },
    {
      id: "8",
      name: "SOGEFINANCEMENT",
      accountType: "Compte professionnel",
      accountNumber: "FR76 •••• •••• •••• 4680",
      bank: "Société Générale",
      isFrequent: true,
      lastTransfer: "20/02/2025",
      isCompany: true,
    },
    {
      id: "9",
      name: "GESTION ASSURANCES",
      accountType: "Compte professionnel",
      accountNumber: "FR76 •••• •••• •••• 7821",
      bank: "AXA Banque",
      isFrequent: true,
      lastTransfer: "05/02/2025",
      isCompany: true,
    },
    {
      id: "10",
      name: "Orange SA",
      accountType: "Compte professionnel",
      accountNumber: "FR76 •••• •••• •••• 9354",
      bank: "BNP Paribas",
      isFrequent: true,
      lastTransfer: "27/01/2025",
      isCompany: true,
    },
    {
      id: "11",
      name: "ALLIANZ I.A.R.D.",
      accountType: "Compte professionnel",
      accountNumber: "FR76 •••• •••• •••• 6127",
      bank: "Crédit Mutuel",
      isFrequent: false,
      lastTransfer: "05/12/2024",
      isCompany: true,
    },
    {
      id: "12",
      name: "LOGITEL",
      accountType: "Service de virement",
      accountNumber: "FR76 •••• •••• •••• 8765",
      bank: "Société Générale",
      isFrequent: true,
      lastTransfer: "18/02/2025",
      isCompany: true,
    },
    {
      id: "13",
      name: "PayPal Europe",
      accountType: "Service de paiement",
      accountNumber: "LU96 •••• •••• •••• 4321",
      bank: "PayPal",
      isFrequent: false,
      lastTransfer: "21/01/2025",
      isCompany: true,
    },
    {
      id: "14",
      name: "VESTIAIRE COLLECTIVE",
      accountType: "Compte professionnel",
      accountNumber: "FR76 •••• •••• •••• 2468",
      bank: "HSBC",
      isFrequent: false,
      lastTransfer: "21/01/2025",
      isCompany: true,
    },
    {
      id: "15",
      name: "ibani SA",
      accountType: "Compte professionnel",
      accountNumber: "CH93 •••• •••• •••• 1357",
      bank: "UBS",
      isFrequent: false,
      lastTransfer: "31/01/2025",
      isCompany: true,
    },
  ]

  // Filtrer pour ne garder que les bénéficiaires particuliers
  const beneficiaries = allBeneficiaries.filter((b) => !b.isCompany)

  // Trouver le bénéficiaire sélectionné
  useEffect(() => {
    if (beneficiaryId) {
      const found = beneficiaries.find((b) => b.id === beneficiaryId)
      if (found) {
        setSelectedBeneficiary(found)
      }
    }
  }, [beneficiaryId])

  // Fonctions utilitaires pour les dates
  function getTodayDate() {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  function getNextYearDate() {
    const today = new Date()
    today.setFullYear(today.getFullYear() + 1)
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Validation du formulaire
  const validateForm = () => {
    const newErrors: { amount?: string; date?: string } = {}

    if (!amount || Number.parseFloat(amount) <= 0) {
      newErrors.amount = "Veuillez saisir un montant valide"
    } else if (Number.parseFloat(amount) > 25553.78) {
      newErrors.amount = "Montant supérieur au solde disponible"
    }

    if (!date) {
      newErrors.date = "Veuillez sélectionner une date"
    } else {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        newErrors.date = "La date ne peut pas être antérieure à aujourd'hui"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      // Simuler l'envoi du virement
      setTimeout(() => {
        setIsLoading(false)
        router.push(
          `/transfers/confirmation?amount=${amount}&beneficiary=${selectedBeneficiary?.id}&reference=${encodeURIComponent(reference)}&date=${date}`,
        )
      }, 1500)
    }
  }

  // Formatage du montant
  const formatAmount = (value: string) => {
    // Supprimer tous les caractères non numériques sauf le point
    let formatted = value.replace(/[^\d.]/g, "")

    // S'assurer qu'il n'y a qu'un seul point décimal
    const parts = formatted.split(".")
    if (parts.length > 2) {
      formatted = parts[0] + "." + parts.slice(1).join("")
    }

    // Limiter à 2 décimales
    if (parts.length > 1 && parts[1].length > 2) {
      formatted = parts[0] + "." + parts[1].substring(0, 2)
    }

    return formatted
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
              NOUVEAU VIREMENT
            </motion.h1>
            <div className="w-6"></div> {/* Empty div for spacing */}
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 px-4 py-6 bg-gray-50">
          <form onSubmit={handleSubmit}>
            {/* Account section */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-sm font-medium text-gray-500 mb-3">Compte à débiter</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Compte Perso</p>
                  <p className="text-xs text-gray-500">N° •••• 3379</p>
                </div>
                <AnimatedNumber value={25553.78} className="font-semibold text-green-600" suffix=" €" />
              </div>
            </div>

            {/* Beneficiary section */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-sm font-medium text-gray-500 mb-3">Bénéficiaire</h2>

              {selectedBeneficiary ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-semibold">{selectedBeneficiary.name}</p>
                      <p className="text-xs text-gray-500">
                        {selectedBeneficiary.accountNumber} • {selectedBeneficiary.bank}
                      </p>
                    </div>
                  </div>
                  <ButtonEffect>
                    <button type="button" className="text-xs text-[#E30513]" onClick={() => router.push("/transfers")}>
                      Modifier
                    </button>
                  </ButtonEffect>
                </div>
              ) : (
                <div className="flex justify-center">
                  <ButtonEffect>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 text-sm"
                      onClick={() => router.push("/transfers")}
                    >
                      Sélectionner un bénéficiaire
                    </button>
                  </ButtonEffect>
                </div>
              )}
            </div>

            {/* Amount section */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-sm font-medium text-gray-500 mb-3">Montant</h2>
              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(formatAmount(e.target.value))}
                  className={`w-full text-2xl font-bold py-3 px-4 border ${errors.amount ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E30513]`}
                  placeholder="0,00"
                  inputMode="decimal"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold">€</span>
              </div>
              {errors.amount && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{errors.amount}</span>
                </div>
              )}
            </div>

            {/* Date section */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-sm font-medium text-gray-500 mb-3">Date d'exécution</h2>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={getTodayDate()}
                  className={`flex-1 py-2 px-3 border ${errors.date ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E30513]`}
                />
              </div>
              {errors.date && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{errors.date}</span>
                </div>
              )}
            </div>

            {/* Recurring option */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-gray-500">Virement permanent</h2>
                <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="toggle"
                    className="opacity-0 w-0 h-0"
                    checked={isRecurring}
                    onChange={() => setIsRecurring(!isRecurring)}
                  />
                  <label
                    htmlFor="toggle"
                    className={`absolute top-0 left-0 right-0 bottom-0 rounded-full cursor-pointer transition-all duration-300 ${isRecurring ? "bg-green-500" : "bg-gray-300"}`}
                  >
                    <span
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${isRecurring ? "transform translate-x-4" : ""}`}
                    ></span>
                  </label>
                </div>
              </div>

              {isRecurring && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-3 mt-3">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Fréquence</label>
                      <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E30513]"
                      >
                        <option value="weekly">Hebdomadaire</option>
                        <option value="monthly">Mensuelle</option>
                        <option value="quarterly">Trimestrielle</option>
                        <option value="yearly">Annuelle</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Date de fin</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={date}
                        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E30513]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Reference section */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="text-sm font-medium text-gray-500 mb-3">Référence (optionnel)</h2>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E30513]"
                placeholder="Ex: Remboursement repas"
                maxLength={35}
              />
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <Info className="h-4 w-4 mr-1" />
                <span>Cette référence apparaîtra sur le relevé du bénéficiaire</span>
              </div>
            </div>

            {/* Submit button */}
            <ButtonEffect>
              <button
                type="submit"
                disabled={isLoading || !selectedBeneficiary}
                className={`w-full py-3 rounded-lg text-white font-medium flex items-center justify-center ${
                  isLoading || !selectedBeneficiary ? "bg-gray-400" : "bg-[#E30513]"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Traitement en cours...
                  </>
                ) : (
                  "Valider"
                )}
              </button>
            </ButtonEffect>
          </form>
        </div>
      </div>
    </PageSlideTransition>
  )
}


"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  Plus,
  User,
  ArrowRight,
  FileText,
  Clock,
  Search,
  ArrowDown,
  ArrowUp,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import BottomNavigation from "@/components/bottom-navigation"
import PageSlideTransition from "@/components/page-slide-transition"
import ButtonEffect from "@/components/button-effect"
import SwipeToAction from "@/components/swipe-to-action"
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

type Transfer = {
  id: string
  date: string
  beneficiary: string
  amount: number
  status: "completed" | "pending" | "failed"
  reference?: string
}

export default function TransfersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("new")
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const transfersPerPage = 5

  // Bénéficiaires extraits du relevé de compte
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

  // Historique des virements envoyés à des particuliers uniquement
  const transferHistory: Transfer[] = [
    // Virements à Gerald Dumont (loyer mensuel)
    {
      id: "t1",
      date: "04/02/2025",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR INSTANTANE EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t8",
      date: "03/01/2025",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t9",
      date: "03/12/2024",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t10",
      date: "03/11/2024",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t11",
      date: "03/10/2024",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t12",
      date: "03/09/2024",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t13",
      date: "03/08/2024",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t14",
      date: "03/07/2024",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t15",
      date: "03/06/2024",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t16",
      date: "03/05/2024",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t17",
      date: "03/04/2024",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t18",
      date: "03/03/2024",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t19",
      date: "03/02/2024",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t20",
      date: "03/01/2024",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t21",
      date: "03/12/2023",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t22",
      date: "03/11/2023",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t23",
      date: "03/10/2023",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },
    {
      id: "t24",
      date: "03/09/2023",
      beneficiary: "Gerald Dumont",
      amount: -1045.0,
      status: "completed",
      reference: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
    },

    // Virements à Guillaume Waterlot
    {
      id: "t3",
      date: "18/02/2025",
      beneficiary: "Guillaume Waterlot",
      amount: -59.0,
      status: "completed",
      reference: "VIR INSTANTANE EMIS LOGITEL - M WATERLOT GUILLAUME",
    },

    // Virements à Veronique Perraud
    {
      id: "t4",
      date: "22/01/2025",
      beneficiary: "Veronique Perraud",
      amount: -396.0,
      status: "completed",
      reference: "VIR INSTANTANE EMIS LOGITEL - Perraud veronique",
    },

    // Virements à Benjamin Thon
    {
      id: "t61",
      date: "03/04/2025",
      beneficiary: "Benjamin Thon",
      amount: -250.0,
      status: "pending",
      reference: "REMBOURSEMENT COURSES",
    },
  ]

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setTransfers(transferHistory)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filtrer les bénéficiaires en fonction de l'onglet actif
  const filteredBeneficiaries = activeTab === "frequent" ? beneficiaries.filter((b) => b.isFrequent) : beneficiaries

  // Filtrer les virements en fonction du filtre et de la recherche
  const filteredTransfers = transfers
    .filter((transfer) => {
      if (filter === "all") return true
      if (filter === "in") return transfer.amount > 0 // Inversé car les montants sont négatifs pour les virements sortants
      if (filter === "out") return transfer.amount < 0 // Virements sortants ont des montants négatifs
      return true
    })
    .filter((transfer) => {
      if (!searchQuery) return true
      return (
        transfer.beneficiary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transfer.reference?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  // Pagination
  const indexOfLastTransfer = currentPage * transfersPerPage
  const indexOfFirstTransfer = indexOfLastTransfer - transfersPerPage
  const currentTransfers = filteredTransfers.slice(indexOfFirstTransfer, indexOfLastTransfer)
  const totalPages = Math.ceil(filteredTransfers.length / transfersPerPage)

  const renderTabContent = () => {
    if (activeTab === "new" || activeTab === "frequent") {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {/* My accounts section */}
          <h2 className="text-sm font-medium text-gray-500 mb-3">Mes comptes</h2>
          <motion.div
            className="bg-white rounded-lg shadow-sm overflow-hidden mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center p-3">
              <div className="w-10 h-10 rounded overflow-hidden mr-3">
                <Image src="/images/sg-logo.png" alt="SG Logo" width={40} height={40} className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Compte Perso</p>
                    <p className="text-xs text-gray-500">N° •••• 3379</p>
                  </div>
                  <AnimatedNumber value={25553.78} className="font-semibold text-green-600" suffix=" €" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Beneficiaries section */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-gray-500">Bénéficiaires</h2>
            <ButtonEffect>
              <button
                className="flex items-center text-xs text-[#E30513] font-medium"
                onClick={() => router.push("/transfers/add-beneficiary")}
              >
                <Plus className="h-4 w-4 mr-1" /> Ajouter
              </button>
            </ButtonEffect>
          </div>

          <div className="space-y-3">
            {filteredBeneficiaries.map((beneficiary, index) => (
              <motion.div
                key={beneficiary.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <SwipeToAction
                  leftAction={
                    <div className="h-full bg-red-600 flex items-center justify-center px-6">
                      <span className="text-white font-medium">Supprimer</span>
                    </div>
                  }
                  rightAction={
                    <div className="h-full bg-green-500 flex items-center justify-center px-6">
                      <span className="text-white font-medium">Virement</span>
                    </div>
                  }
                >
                  <motion.div
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                    whileHover={{ scale: 1.01 }}
                    onClick={() => router.push(`/transfers/new?beneficiary=${beneficiary.id}`)}
                  >
                    <div className="flex items-center p-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{beneficiary.name}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <span>{beneficiary.accountType}</span>
                              {beneficiary.bank && (
                                <>
                                  <span className="mx-1">•</span>
                                  <span>{beneficiary.bank}</span>
                                </>
                              )}
                            </div>
                            {beneficiary.lastTransfer && (
                              <div className="flex items-center text-xs text-gray-400 mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>Dernier virement: {beneficiary.lastTransfer}</span>
                              </div>
                            )}
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwipeToAction>
              </motion.div>
            ))}
          </div>

          {/* Add new beneficiary card */}
          <motion.div
            className="bg-white rounded-lg shadow-sm overflow-hidden mt-3 border border-dashed border-gray-300"
            onClick={() => router.push("/transfers/add-beneficiary")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.01 }}
          >
            <ButtonEffect>
              <div className="flex items-center justify-center p-4">
                <Plus className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Ajouter un bénéficiaire</span>
              </div>
            </ButtonEffect>
          </motion.div>
        </motion.div>
      )
    } else {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4">
          {/* Search and filter */}
          <div className="mb-4">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Rechercher un virement..."
                className="w-full py-2 pl-10 pr-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E30513]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className="flex mb-4">
              <ButtonEffect className="flex-1">
                <button
                  className={`w-full py-2 px-3 rounded-full text-sm font-medium ${filter === "all" ? "bg-gray-100 text-gray-800" : "text-gray-500"}`}
                  onClick={() => setFilter("all")}
                >
                  Tous
                </button>
              </ButtonEffect>
              <ButtonEffect className="flex-1">
                <button
                  className={`w-full py-2 px-3 rounded-full text-sm font-medium flex items-center justify-center ${filter === "in" ? "bg-gray-100 text-gray-800" : "text-gray-500"}`}
                  onClick={() => setFilter("in")}
                >
                  <ArrowDown className="h-4 w-4 mr-1" /> Reçus
                </button>
              </ButtonEffect>
              <ButtonEffect className="flex-1">
                <button
                  className={`w-full py-2 px-3 rounded-full text-sm font-medium flex items-center justify-center ${filter === "out" ? "bg-gray-100 text-gray-800" : "text-gray-500"}`}
                  onClick={() => setFilter("out")}
                >
                  <ArrowUp className="h-4 w-4 mr-1" /> Émis
                </button>
              </ButtonEffect>
            </div>
          </div>

          {isLoading ? (
            // Skeleton loading
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                  <div className="flex justify-between mb-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredTransfers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <FileText className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-500">Aucun virement trouvé</h3>
              <p className="text-sm text-gray-400 mt-2 max-w-xs text-center">
                {searchQuery
                  ? "Aucun virement ne correspond à votre recherche."
                  : "Vous n'avez pas encore effectué de virement."}
              </p>
              <ButtonEffect>
                <motion.button
                  className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("new")}
                >
                  Nouveau virement
                </motion.button>
              </ButtonEffect>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {currentTransfers.map((transfer, index) => (
                  <motion.div
                    key={transfer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <ButtonEffect>
                      <div
                        className="bg-white rounded-lg shadow-sm p-4"
                        onClick={() => router.push(`/transfers/details/${transfer.id}`)}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-500">{transfer.date}</span>
                          <span
                            className={`text-sm font-medium ${transfer.status === "pending" ? "text-orange-500" : transfer.status === "failed" ? "text-red-500" : "text-green-600"}`}
                          >
                            {transfer.status === "pending"
                              ? "En cours"
                              : transfer.status === "failed"
                                ? "Échoué"
                                : "Effectué"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{transfer.beneficiary}</p>
                            {transfer.reference && <p className="text-xs text-gray-500">{transfer.reference}</p>}
                          </div>
                          <p className="font-semibold text-red-600">
                            {Math.abs(transfer.amount).toLocaleString("fr-FR")} €
                          </p>
                        </div>
                      </div>
                    </ButtonEffect>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <div className="flex space-x-2">
                    <ButtonEffect>
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === 1 ? "text-gray-400" : "bg-gray-100 text-gray-700"}`}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                    </ButtonEffect>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <ButtonEffect key={page}>
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-full ${currentPage === page ? "bg-[#E30513] text-white" : "bg-gray-100 text-gray-700"}`}
                        >
                          {page}
                        </button>
                      </ButtonEffect>
                    ))}

                    <ButtonEffect>
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === totalPages ? "text-gray-400" : "bg-gray-100 text-gray-700"}`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </ButtonEffect>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      )
    }
  }

  return (
    <PageSlideTransition>
      <div className="flex flex-col min-h-screen bg-white pb-16">
        {/* Header */}
        <header className="bg-[#E30513] text-white px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-4">
            <ButtonEffect activeScale={0.9}>
              <button onClick={() => router.push("/home")} className="focus:outline-none">
                <ChevronLeft className="h-6 w-6" />
              </button>
            </ButtonEffect>
            <motion.h1
              className="text-xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              VIREMENTS
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

          {/* Tabs */}
          <div className="flex text-sm">
            <ButtonEffect className="flex-1">
              <button
                className={`w-full py-2 relative ${activeTab === "new" ? "font-semibold" : "opacity-80"}`}
                onClick={() => setActiveTab("new")}
              >
                Nouveau virement
                {activeTab === "new" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    layoutId="activeTransferTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            </ButtonEffect>
            <ButtonEffect className="flex-1">
              <button
                className={`w-full py-2 relative ${activeTab === "frequent" ? "font-semibold" : "opacity-80"}`}
                onClick={() => setActiveTab("frequent")}
              >
                Virements fréquents
                {activeTab === "frequent" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    layoutId="activeTransferTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            </ButtonEffect>
            <ButtonEffect className="flex-1">
              <button
                className={`w-full py-2 relative ${activeTab === "history" ? "font-semibold" : "opacity-80"}`}
                onClick={() => setActiveTab("history")}
              >
                Historique
                {activeTab === "history" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    layoutId="activeTransferTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            </ButtonEffect>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 px-4 py-4 bg-gray-50">
          <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </PageSlideTransition>
  )
}


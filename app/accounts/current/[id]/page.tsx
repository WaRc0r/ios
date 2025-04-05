"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ChevronLeft, Download, Filter, ArrowDown, ArrowUp, ChevronRight, Calendar, FileText } from "lucide-react"
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

type StatementPeriod = {
  id: string
  name: string
  startDate: string
  endDate: string
  transactions: Transaction[]
}

export default function AccountDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [statements, setStatements] = useState<StatementPeriod[]>([])
  const [currentStatementIndex, setCurrentStatementIndex] = useState(0)
  const [accountData, setAccountData] = useState<{
    name: string
    number: string
    balance: number
  } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [showStatementSelector, setShowStatementSelector] = useState(false)
  const transactionsPerPage = 15

  // Reset to first page when filter or statement changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filter, currentStatementIndex])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      // Mock data based on account ID
      const id = params.id as string

      if (id === "perso") {
        setAccountData({
          name: "Compte Perso",
          number: "•••• 3379",
          balance: 25553.78,
        })

        // Define statement periods
        const statementData: StatementPeriod[] = [
          {
            id: "statement-1",
            name: "Relevé du 23/01/2025 au 22/02/2025",
            startDate: "23/01/2025",
            endDate: "22/02/2025",
            transactions: [
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
              {
                id: "4",
                date: "20 Fév",
                description: "PRELEVEMENT EUROPEEN 5003187356 - PRET SOGEFINANC",
                amount: -11.2,
                category: "Prêt",
              },
              {
                id: "5",
                date: "20 Fév",
                description: "CARTE X1694 19/02 TPG Transports Publics A",
                amount: -4.7,
                category: "Transport",
              },
              {
                id: "6",
                date: "20 Fév",
                description: "CARTE X1694 19/02 SNCF-VOYAGEURS",
                amount: -3.3,
                category: "Transport",
              },
              { id: "7", date: "18 Fév", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "8",
                date: "18 Fév",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "9", date: "18 Fév", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "10",
                date: "18 Fév",
                description: "FRAIS PAIEMENT HORS ZONE EURO CARTE X1694 12/02 627,30 CHF SUISSE",
                amount: -19.07,
                category: "Frais bancaires",
              },
              {
                id: "11",
                date: "18 Fév",
                description: "VIR INSTANTANE EMIS LOGITEL - M WATERLOT GUILLAUME",
                amount: -59.0,
                category: "Virement",
              },
              {
                id: "12",
                date: "17 Fév",
                description: "CARTE X1694 12/02 ETIHAD AIRW 607240914984",
                amount: -669.21,
                category: "Voyage",
              },
              {
                id: "13",
                date: "15 Fév",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              {
                id: "14",
                date: "14 Fév",
                description: "CARTE X1694 13/02 EASYBIKE AND BEAUTY",
                amount: -21.0,
                category: "Bien-être",
              },
              {
                id: "15",
                date: "14 Fév",
                description: "CARTE X1694 12/02 LeBonCoin",
                amount: -4.9,
                category: "Achats",
              },
              {
                id: "16",
                date: "13 Fév",
                description: "CARTE X1694 12/02 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "17",
                date: "12 Fév",
                description: "CARTE X1694 11/02 ETS LAFORETTE",
                amount: -110.0,
                category: "Achats",
              },
              {
                id: "18",
                date: "12 Fév",
                description: "VIR INST RE 554376620543 - MR THON BENJAMIN",
                amount: 500.0,
                category: "Revenus",
              },
              {
                id: "19",
                date: "12 Fév",
                description: "VIR INST RE 554276009424 - MR THON BENJAMIN",
                amount: 500.0,
                category: "Revenus",
              },
              { id: "20", date: "10 Fév", description: "CHEQUE 293", amount: -118.0, category: "Chèque" },
              {
                id: "21",
                date: "07 Fév",
                description: "CARTE X1694 06/02 Trip.com",
                amount: -682.99,
                category: "Voyage",
              },
              {
                id: "22",
                date: "06 Fév",
                description: "VIR INST RE 553771818677 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
              {
                id: "23",
                date: "05 Fév",
                description: "PRELEVEMENT EUROPEEN 3102583772 - GESTION ASSURANCES",
                amount: -50.14,
                category: "Assurance",
              },
              {
                id: "24",
                date: "05 Fév",
                description: "CARTE X1694 04/02 LeBonCoin",
                amount: -4.9,
                category: "Achats",
              },
              {
                id: "25",
                date: "04 Fév",
                description: "CARTE X1694 03/02 aliexpress",
                amount: -3.36,
                category: "Achats",
              },
              {
                id: "26",
                date: "04 Fév",
                description: "VIR INSTANTANE EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "27",
                date: "03 Fév",
                description: "VIR RECU3492019148S - FRANCE TRAVAIL",
                amount: 567.63,
                category: "Revenus",
              },
              {
                id: "28",
                date: "31 Jan",
                description: "VIR RECU3188130903S - ibani SA",
                amount: 119.74,
                category: "Revenus",
              },
              {
                id: "29",
                date: "30 Jan",
                description: "CARTE X1694 29/01 GIFI BELLEGARDE",
                amount: -27.55,
                category: "Achats",
              },
              {
                id: "30",
                date: "30 Jan",
                description: "CARTE X1694 29/01 Action 4194",
                amount: -15.9,
                category: "Achats",
              },
              {
                id: "31",
                date: "29 Jan",
                description: "CARTE X1694 28/01 CHAROLAISE BIS",
                amount: -5.47,
                category: "Alimentation",
              },
              {
                id: "32",
                date: "28 Jan",
                description: "CARTE X1694 REMBT 20/01 ALIEXPRESS.COM",
                amount: 10.37,
                category: "Remboursement",
              },
              {
                id: "33",
                date: "27 Jan",
                description: "PRELEVEMENT EUROPEEN 2401902490 - Orange SA-ORANGE",
                amount: -21.47,
                category: "Téléphonie",
              },
              {
                id: "34",
                date: "27 Jan",
                description: "CARTE X1694 24/01 MR MRS TRAIT",
                amount: -99.0,
                category: "Achats",
              },
              {
                id: "35",
                date: "27 Jan",
                description: "CARTE X1694 24/01 CARREFOUR VALLEIRY",
                amount: -30.07,
                category: "Alimentation",
              },
              {
                id: "36",
                date: "27 Jan",
                description: "CARTE X1694 24/01 PHARMACIE DE VAL",
                amount: -19.95,
                category: "Santé",
              },
              {
                id: "37",
                date: "24 Jan",
                description: "CARTE X1694 23/01 SNCF-VOYAGEURS",
                amount: -3.3,
                category: "Transport",
              },
            ],
          },
          {
            id: "statement-2",
            name: "Relevé du 23/12/2024 au 22/01/2025",
            startDate: "23/12/2024",
            endDate: "22/01/2025",
            transactions: [
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
              {
                id: "40",
                date: "22 Jan",
                description: "CARTE X1694 21/01 CARREFOUR VALLEIRY",
                amount: -5.58,
                category: "Alimentation",
              },
              {
                id: "41",
                date: "22 Jan",
                description: "VIR INSTANTANE EMIS LOGITEL - Perraud veronique",
                amount: -396.0,
                category: "Virement",
              },
              {
                id: "42",
                date: "21 Jan",
                description: "CARTE X1694 20/01 ALIEXPRESS.COM",
                amount: -47.6,
                category: "Achats",
              },
              {
                id: "43",
                date: "21 Jan",
                description: "VIR RECU2184854122S - PayPal (Europe) - VESTIAIRE COLLECTIVE",
                amount: 396.52,
                category: "Revenus",
              },
              {
                id: "44",
                date: "20 Jan",
                description: "PRELEVEMENT EUROPEEN 1705094331 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              { id: "45", date: "17 Jan", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "46",
                date: "17 Jan",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "47", date: "17 Jan", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "48",
                date: "15 Jan",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              {
                id: "49",
                date: "15 Jan",
                description: "CARTE X1694 14/01 SNCF-VOYAGEURS",
                amount: -3.3,
                category: "Transport",
              },
              { id: "50", date: "13 Jan", description: "CHEQUE 292", amount: -118.0, category: "Chèque" },
              {
                id: "51",
                date: "13 Jan",
                description: "CARTE X1694 12/01 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "52",
                date: "10 Jan",
                description: "CARTE X1694 09/01 aliexpress",
                amount: -45.39,
                category: "Achats",
              },
              {
                id: "53",
                date: "07 Jan",
                description: "FRAIS PAIEMENT HORS ZONE EURO CARTE X1694 03/01 67,75 CHF SUISSE",
                amount: -2.96,
                category: "Frais bancaires",
              },
              {
                id: "54",
                date: "06 Jan",
                description: "PRELEVEMENT EUROPEEN 0203856274 - GESTION ASSURANCES",
                amount: -50.14,
                category: "Assurance",
              },
              {
                id: "55",
                date: "06 Jan",
                description: "CARTE X1694 03/01 Denner AG Plan- les-Ouat",
                amount: -72.61,
                category: "Alimentation",
              },
              {
                id: "56",
                date: "02 Jan",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "57",
                date: "02 Jan",
                description: "CARTE X1694 31/12 INTER DORINE",
                amount: -115.18,
                category: "Achats",
              },
              {
                id: "58",
                date: "02 Jan",
                description: "VIR RECU0291255668S - FRANCE TRAVAIL",
                amount: 2513.79,
                category: "Revenus",
              },
              {
                id: "59",
                date: "28 Déc",
                description: "REGULARISATION DE COMMISSION COTIS OPTION VOYAGEUR Visa Premier X3149",
                amount: -4.33,
                category: "Frais bancaires",
              },
              {
                id: "60",
                date: "27 Déc",
                description: "PRELEVEMENT EUROPEEN 8501326784 - Orange SA-ORANGE",
                amount: -24.61,
                category: "Téléphonie",
              },
              {
                id: "61",
                date: "26 Déc",
                description: "CARTE X1694 25/12 SNCF-VOYAGEURS",
                amount: -3.3,
                category: "Transport",
              },
              {
                id: "62",
                date: "24 Déc",
                description: "CARTE X1694 23/12 CARREFOUR VALLEIRY",
                amount: -87.32,
                category: "Alimentation",
              },
            ],
          },
          {
            id: "statement-3",
            name: "Relevé du 23/11/2024 au 22/12/2024",
            startDate: "23/11/2024",
            endDate: "22/12/2024",
            transactions: [
              {
                id: "63",
                date: "20 Déc",
                description: "PRELEVEMENT EUROPEEN 8000458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              {
                id: "64",
                date: "20 Déc",
                description: "VIR RECU8183811718S - M OU MME GERALD DUMONT",
                amount: 1010.0,
                category: "Revenus",
              },
              { id: "65", date: "17 Déc", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "66",
                date: "17 Déc",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "67", date: "17 Déc", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "68",
                date: "16 Déc",
                description: "CARTE X3580 TRANSF 13/12 Wise",
                amount: -452.12,
                category: "Virement",
              },
              {
                id: "69",
                date: "16 Déc",
                description: "VIR RECU 9435163702591 - MLLE OLYMPE ROUAULT",
                amount: 48.0,
                category: "Revenus",
              },
              {
                id: "70",
                date: "14 Déc",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              {
                id: "71",
                date: "13 Déc",
                description: "CARTE X3580 12/12 MOMEDITATION",
                amount: -1.0,
                category: "Bien-être",
              },
              {
                id: "72",
                date: "12 Déc",
                description: "CARTE X3580 11/12 INTER DORINE",
                amount: -7.83,
                category: "Achats",
              },
              { id: "73", date: "11 Déc", description: "CHEQUE 290", amount: -118.0, category: "Chèque" },
              {
                id: "74",
                date: "11 Déc",
                description: "CARTE X3580 09/12 UBER EATS",
                amount: -43.8,
                category: "Alimentation",
              },
              {
                id: "75",
                date: "10 Déc",
                description: "CARTE X3580 09/12 SIXT 95143941441",
                amount: -107.14,
                category: "Transport",
              },
              {
                id: "76",
                date: "09 Déc",
                description: "CARTE X3580 08/12 SNOMCOL TABAC DU",
                amount: -14.5,
                category: "Achats",
              },
              {
                id: "77",
                date: "09 Déc",
                description: "CARTE X3580 06/12 PRIMARK NICE",
                amount: -38.3,
                category: "Achats",
              },
              {
                id: "78",
                date: "09 Déc",
                description: "CARTE X3580 06/12 TIGELLA BELLA",
                amount: -15.9,
                category: "Alimentation",
              },
              {
                id: "79",
                date: "09 Déc",
                description: "CARTE X3580 06/12 UBER",
                amount: -23.05,
                category: "Transport",
              },
              {
                id: "80",
                date: "09 Déc",
                description: "CARTE X3580 06/12 LOU PASTROUIL",
                amount: -14.2,
                category: "Alimentation",
              },
              {
                id: "81",
                date: "09 Déc",
                description: "CARTE X3580 06/12 SUMUP *CARLA NAILS BEAU",
                amount: -20.0,
                category: "Bien-être",
              },
              {
                id: "82",
                date: "09 Déc",
                description: "CARTE X3580 06/12 SNCF-VOYAGEURS",
                amount: -3.8,
                category: "Transport",
              },
              {
                id: "83",
                date: "09 Déc",
                description: "CARTE X3580 06/12 CELINES BEAUTE",
                amount: -55.0,
                category: "Bien-être",
              },
              {
                id: "84",
                date: "09 Déc",
                description: "CARTE X3580 06/12 JEAN LOUIS VALER",
                amount: -30.0,
                category: "Achats",
              },
              {
                id: "85",
                date: "09 Déc",
                description: "CARTE X3580 05/12 EASYJETK8GG5G4",
                amount: -39.81,
                category: "Voyage",
              },
              {
                id: "86",
                date: "09 Déc",
                description: "CARTE X3580 05/12 QPF PECHEUR AUT",
                amount: -4.6,
                category: "Alimentation",
              },
              {
                id: "87",
                date: "06 Déc",
                description: "CARTE X3580 05/12 LE CHANTILLY",
                amount: -12.5,
                category: "Alimentation",
              },
              {
                id: "88",
                date: "06 Déc",
                description: "CARTE X3580 05/12 IKEA NICE",
                amount: -1.0,
                category: "Maison",
              },
              {
                id: "89",
                date: "06 Déc",
                description: "CARTE X3580 04/12 COLOMBUS CAFE",
                amount: -5.4,
                category: "Alimentation",
              },
              {
                id: "90",
                date: "05 Déc",
                description: "PRELEVEMENT EUROPEEN 6500687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "91",
                date: "05 Déc",
                description: "PRELEVEMENT EUROPEEN 6411738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "92",
                date: "05 Déc",
                description: "CARTE X3580 RETRAIT DAB 04/12 12H35 BNP 064338",
                amount: -30.0,
                category: "Retrait",
              },
              {
                id: "93",
                date: "05 Déc",
                description: "CARTE X3580 04/12 EFFIA",
                amount: -10.7,
                category: "Transport",
              },
              {
                id: "94",
                date: "05 Déc",
                description: "CARTE X3580 04/12 PIZZAROC",
                amount: -19.5,
                category: "Alimentation",
              },
              {
                id: "95",
                date: "05 Déc",
                description: "CARTE X3580 04/12 SNCF-VOYAGEURS",
                amount: -6.7,
                category: "Transport",
              },
              {
                id: "96",
                date: "05 Déc",
                description: "CARTE X3580 04/12 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "97",
                date: "05 Déc",
                description: "CARTE X3580 04/12 SNCF VOYAGEURS",
                amount: -4.7,
                category: "Transport",
              },
              {
                id: "98",
                date: "05 Déc",
                description: "CARTE X3580 04/12 LA SOCCA REGINA",
                amount: -3.5,
                category: "Alimentation",
              },
              {
                id: "99",
                date: "04 Déc",
                description: "CARTE X3580 03/12 DIALLO KADIATOU",
                amount: -30.0,
                category: "Achats",
              },
              {
                id: "100",
                date: "04 Déc",
                description: "CARTE X3580 03/12 ZARA FRANCE",
                amount: -12.95,
                category: "Achats",
              },
              {
                id: "101",
                date: "04 Déc",
                description: "CARTE X3580 03/12 SNCF VOYAGEURS",
                amount: -5.7,
                category: "Transport",
              },
              {
                id: "102",
                date: "04 Déc",
                description: "CARTE X3580 03/12 SELECTA SAS",
                amount: -2.5,
                category: "Alimentation",
              },
              {
                id: "103",
                date: "04 Déc",
                description: "VIR RECU 9433955513960 - MLLE OLYMPE ROUAULT",
                amount: 50.0,
                category: "Revenus",
              },
              {
                id: "104",
                date: "03 Déc",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "105",
                date: "02 Déc",
                description: "CARTE X3580 30/11 LA POSTE L06273",
                amount: -1.29,
                category: "Services",
              },
              {
                id: "106",
                date: "02 Déc",
                description: "CARTE X3580 29/11 NACHOS",
                amount: -10.5,
                category: "Alimentation",
              },
              {
                id: "107",
                date: "02 Déc",
                description: "CARTE X3580 29/11 SNCF VOYAGEURS",
                amount: -3.8,
                category: "Transport",
              },
              {
                id: "108",
                date: "02 Déc",
                description: "CARTE X3580 29/11 FMD AROMMATIC",
                amount: -1.5,
                category: "Achats",
              },
              {
                id: "109",
                date: "02 Déc",
                description: "CARTE X3580 29/11 LE LORRAIN",
                amount: -1.3,
                category: "Alimentation",
              },
              {
                id: "110",
                date: "02 Déc",
                description: "VIR RECU6392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "111",
                date: "30 Nov",
                description: "VIR INST RE 483586613614 - ROUAULT OLYMPE OU THON BENJAMIN",
                amount: 500.0,
                category: "Revenus",
              },
              {
                id: "112",
                date: "29 Nov",
                description: "CARTE X3580 29/11 AU BUREAU",
                amount: -7.0,
                category: "Alimentation",
              },
              {
                id: "113",
                date: "29 Nov",
                description: "CARTE X3580 29/11 AU BUREAU",
                amount: -7.0,
                category: "Alimentation",
              },
              {
                id: "114",
                date: "29 Nov",
                description: "CARTE X3580 28/11 INTERM CALAO 139",
                amount: -30.32,
                category: "Achats",
              },
              {
                id: "115",
                date: "29 Nov",
                description: "CARTE X3580 28/11 BAR TABAC NASI",
                amount: -25.0,
                category: "Achats",
              },
              {
                id: "116",
                date: "29 Nov",
                description: "CARTE X3580 28/11 AU BUREAU",
                amount: -14.0,
                category: "Alimentation",
              },
              {
                id: "117",
                date: "29 Nov",
                description: "CARTE X3580 28/11 KIKO MILANO",
                amount: -26.47,
                category: "Achats",
              },
              {
                id: "118",
                date: "29 Nov",
                description: "CARTE X3580 28/11 LA POSTE L06029",
                amount: -6.13,
                category: "Services",
              },
              {
                id: "119",
                date: "29 Nov",
                description: "CARTE X3580 28/11 UBR* PENDING.UBER.COM",
                amount: -12.63,
                category: "Transport",
              },
              {
                id: "120",
                date: "29 Nov",
                description: "CARTE X3580 28/11 GRAY D'ALBION",
                amount: -2.3,
                category: "Achats",
              },
              {
                id: "121",
                date: "29 Nov",
                description: "VIR RECU6082500132S - FM.SGSANTE",
                amount: 7.95,
                category: "Revenus",
              },
              {
                id: "122",
                date: "28 Nov",
                description: "CARTE X3580 RETRAIT DAB 27/11 12H35 CCM VILLENEUVE LOUBE 09109A07",
                amount: -60.0,
                category: "Retrait",
              },
              {
                id: "123",
                date: "28 Nov",
                description: "CARTE X3580 27/11 EASYJET000K8JC4D5",
                amount: -115.53,
                category: "Voyage",
              },
              {
                id: "124",
                date: "28 Nov",
                description: "CARTE X3580 27/11 LPVS ANTIBES",
                amount: -23.6,
                category: "Achats",
              },
              {
                id: "125",
                date: "28 Nov",
                description: "CARTE X3580 26/11 KFC CANNES GARE",
                amount: -9.7,
                category: "Alimentation",
              },
              {
                id: "126",
                date: "27 Nov",
                description: "CARTE X3580 26/11 AU BUREAU",
                amount: -10.0,
                category: "Alimentation",
              },
              {
                id: "127",
                date: "27 Nov",
                description: "CARTE X3580 26/11 MONOPRIX",
                amount: -3.35,
                category: "Alimentation",
              },
              {
                id: "128",
                date: "27 Nov",
                description: "CARTE X3580 26/11 UBR* PENDING.UBER.COM",
                amount: -13.63,
                category: "Transport",
              },
              {
                id: "129",
                date: "27 Nov",
                description: "CARTE X3580 25/11 THE DUKE S PUB",
                amount: -45.0,
                category: "Alimentation",
              },
              {
                id: "130",
                date: "27 Nov",
                description: "CARTE X3580 25/11 EK ANTIBES",
                amount: -15.25,
                category: "Achats",
              },
              {
                id: "131",
                date: "27 Nov",
                description: "CARTE X3580 25/11 ELSALIZ",
                amount: -14.3,
                category: "Achats",
              },
              {
                id: "132",
                date: "27 Nov",
                description: "CARTE X3580 25/11 ELSALIZ",
                amount: -10.0,
                category: "Achats",
              },
              {
                id: "133",
                date: "27 Nov",
                description: "CARTE X3580 24/11 ARTISAN CREPIER",
                amount: -31.0,
                category: "Alimentation",
              },
              {
                id: "134",
                date: "27 Nov",
                description: "CARTE X3580 23/11 SMOKE & COFFEE",
                amount: -23.9,
                category: "Alimentation",
              },
              {
                id: "135",
                date: "27 Nov",
                description: "CARTE X3580 22/11 LECLERC",
                amount: -38.92,
                category: "Alimentation",
              },
              {
                id: "136",
                date: "27 Nov",
                description: "CARTE X3580 REMBT 24/11 ET CAR HIRE",
                amount: 78.29,
                category: "Remboursement",
              },
              {
                id: "137",
                date: "26 Nov",
                description: "CARTE X3580 26/11 AU BUREAU",
                amount: -7.0,
                category: "Alimentation",
              },
              {
                id: "138",
                date: "26 Nov",
                description: "CARTE X3580 25/11 THE DUKE S PUB",
                amount: -7.0,
                category: "Alimentation",
              },
              {
                id: "139",
                date: "25 Nov",
                description: "PRELEVEMENT EUROPEEN 5301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "140",
                date: "25 Nov",
                description: "CARTE X3580 24/11 SNCF VOYAGEURS",
                amount: -3.4,
                category: "Transport",
              },
              {
                id: "141",
                date: "25 Nov",
                description: "CARTE X3580 23/11 SC LE CARUSO",
                amount: -36.0,
                category: "Alimentation",
              },
              {
                id: "142",
                date: "25 Nov",
                description: "CARTE X3580 22/11 STRADIVARIUS",
                amount: -29.99,
                category: "Achats",
              },
              {
                id: "143",
                date: "25 Nov",
                description: "CARTE X3580 22/11 PRIMARK NICE",
                amount: -61.3,
                category: "Achats",
              },
              {
                id: "144",
                date: "25 Nov",
                description: "CARTE X3580 22/11 PHIE DU POLYGONE",
                amount: -7.42,
                category: "Santé",
              },
              {
                id: "145",
                date: "25 Nov",
                description: "CARTE X3580 22/11 ZETTLE_*BARTOLI LAUREN",
                amount: -8.0,
                category: "Achats",
              },
              {
                id: "146",
                date: "25 Nov",
                description: "CARTE X3580 21/11 STATIONNEMENTNFC",
                amount: -3.3,
                category: "Transport",
              },
              {
                id: "147",
                date: "23 Nov",
                description: "VIR INST RE 482882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-4",
            name: "Relevé du 23/10/2024 au 22/11/2024",
            startDate: "23/10/2024",
            endDate: "22/11/2024",
            transactions: [
              {
                id: "148",
                date: "22 Nov",
                description: "CARTE X3580 21/11 MONOPRIX",
                amount: -12.35,
                category: "Alimentation",
              },
              {
                id: "149",
                date: "22 Nov",
                description: "CARTE X3580 21/11 SNCF-VOYAGEURS",
                amount: -3.3,
                category: "Transport",
              },
              {
                id: "150",
                date: "21 Nov",
                description: "PRELEVEMENT EUROPEEN 4700458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              {
                id: "151",
                date: "20 Nov",
                description: "CARTE X3580 19/11 UBER EATS",
                amount: -28.75,
                category: "Alimentation",
              },
              {
                id: "152",
                date: "20 Nov",
                description: "CARTE X3580 19/11 CARREFOUR MARKET",
                amount: -42.18,
                category: "Alimentation",
              },
              {
                id: "153",
                date: "19 Nov",
                description: "CARTE X3580 18/11 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              { id: "154", date: "18 Nov", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "155",
                date: "18 Nov",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "156", date: "18 Nov", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "157",
                date: "17 Nov",
                description: "CARTE X3580 16/11 SNCF-VOYAGEURS",
                amount: -3.3,
                category: "Transport",
              },
              {
                id: "158",
                date: "15 Nov",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "159", date: "14 Nov", description: "CHEQUE 289", amount: -118.0, category: "Chèque" },
              {
                id: "160",
                date: "13 Nov",
                description: "CARTE X3580 12/11 CARREFOUR VALLEIRY",
                amount: -58.32,
                category: "Alimentation",
              },
              {
                id: "161",
                date: "10 Nov",
                description: "CARTE X3580 09/11 PHARMACIE DE VAL",
                amount: -8.95,
                category: "Santé",
              },
              {
                id: "162",
                date: "08 Nov",
                description: "CARTE X3580 07/11 SNCF-VOYAGEURS",
                amount: -3.3,
                category: "Transport",
              },
              {
                id: "163",
                date: "05 Nov",
                description: "PRELEVEMENT EUROPEEN 5300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "164",
                date: "05 Nov",
                description: "PRELEVEMENT EUROPEEN 5211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "165",
                date: "05 Nov",
                description: "CARTE X3580 04/11 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "166",
                date: "04 Nov",
                description: "CARTE X3580 03/11 CARREFOUR VALLEIRY",
                amount: -45.87,
                category: "Alimentation",
              },
              {
                id: "167",
                date: "03 Nov",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "168",
                date: "02 Nov",
                description: "VIR RECU5392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "169",
                date: "31 Oct",
                description: "CARTE X3580 30/10 SNCF-VOYAGEURS",
                amount: -3.3,
                category: "Transport",
              },
              {
                id: "170",
                date: "30 Oct",
                description: "CARTE X3580 29/10 CARREFOUR VALLEIRY",
                amount: -38.75,
                category: "Alimentation",
              },
              {
                id: "171",
                date: "28 Oct",
                description: "PRELEVEMENT EUROPEEN 4301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "172",
                date: "27 Oct",
                description: "CARTE X3580 26/10 SNCF-VOYAGEURS",
                amount: -3.3,
                category: "Transport",
              },
              {
                id: "173",
                date: "25 Oct",
                description: "CARTE X3580 24/10 CARREFOUR VALLEIRY",
                amount: -52.18,
                category: "Alimentation",
              },
              {
                id: "174",
                date: "24 Oct",
                description: "VIR INST RE 481882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-5",
            name: "Relevé du 23/09/2024 au 22/10/2024",
            startDate: "23/09/2024",
            endDate: "22/10/2024",
            transactions: [
              {
                id: "175",
                date: "20 Oct",
                description: "PRELEVEMENT EUROPEEN 3700458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              { id: "176", date: "18 Oct", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "177",
                date: "18 Oct",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "178", date: "18 Oct", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "179",
                date: "15 Oct",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "180", date: "12 Oct", description: "CHEQUE 288", amount: -118.0, category: "Chèque" },
              {
                id: "181",
                date: "10 Oct",
                description: "CARTE X3580 09/10 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "182",
                date: "05 Oct",
                description: "PRELEVEMENT EUROPEEN 4300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "183",
                date: "05 Oct",
                description: "PRELEVEMENT EUROPEEN 4211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "184",
                date: "05 Oct",
                description: "CARTE X3580 04/10 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "185",
                date: "03 Oct",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "186",
                date: "02 Oct",
                description: "VIR RECU4392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "187",
                date: "28 Sep",
                description: "PRELEVEMENT EUROPEEN 3301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "188",
                date: "25 Sep",
                description: "CARTE X3580 24/09 CARREFOUR VALLEIRY",
                amount: -63.45,
                category: "Alimentation",
              },
              {
                id: "189",
                date: "24 Sep",
                description: "VIR INST RE 480882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-6",
            name: "Relevé du 23/08/2024 au 22/09/2024",
            startDate: "23/08/2024",
            endDate: "22/09/2024",
            transactions: [
              {
                id: "190",
                date: "20 Sep",
                description: "PRELEVEMENT EUROPEEN 2700458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              { id: "191", date: "18 Sep", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "192",
                date: "18 Sep",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "193", date: "18 Sep", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "194",
                date: "15 Sep",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "195", date: "12 Sep", description: "CHEQUE 287", amount: -118.0, category: "Chèque" },
              {
                id: "196",
                date: "10 Sep",
                description: "CARTE X3580 09/09 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "197",
                date: "05 Sep",
                description: "PRELEVEMENT EUROPEEN 3300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "198",
                date: "05 Sep",
                description: "PRELEVEMENT EUROPEEN 3211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "199",
                date: "05 Sep",
                description: "CARTE X3580 04/09 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "200",
                date: "03 Sep",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "201",
                date: "02 Sep",
                description: "VIR RECU3392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "202",
                date: "28 Aoû",
                description: "PRELEVEMENT EUROPEEN 2301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "203",
                date: "25 Aoû",
                description: "CARTE X3580 24/08 CARREFOUR VALLEIRY",
                amount: -78.32,
                category: "Alimentation",
              },
              {
                id: "204",
                date: "24 Aoû",
                description: "VIR INST RE 479882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-7",
            name: "Relevé du 23/07/2024 au 22/08/2024",
            startDate: "23/07/2024",
            endDate: "22/08/2024",
            transactions: [
              {
                id: "205",
                date: "20 Aoû",
                description: "PRELEVEMENT EUROPEEN 1700458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              { id: "206", date: "18 Aoû", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "207",
                date: "18 Aoû",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "208", date: "18 Aoû", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "209",
                date: "15 Aoû",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "210", date: "12 Aoû", description: "CHEQUE 286", amount: -118.0, category: "Chèque" },
              {
                id: "211",
                date: "10 Aoû",
                description: "CARTE X3580 09/08 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "212",
                date: "05 Aoû",
                description: "PRELEVEMENT EUROPEEN 2300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "213",
                date: "05 Aoû",
                description: "PRELEVEMENT EUROPEEN 2211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "214",
                date: "05 Aoû",
                description: "CARTE X3580 04/08 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "215",
                date: "03 Aoû",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "216",
                date: "02 Aoû",
                description: "VIR RECU2392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "217",
                date: "28 Juil",
                description: "PRELEVEMENT EUROPEEN 1301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "218",
                date: "25 Juil",
                description: "CARTE X3580 24/07 CARREFOUR VALLEIRY",
                amount: -68.45,
                category: "Alimentation",
              },
              {
                id: "219",
                date: "24 Juil",
                description: "VIR INST RE 478882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-8",
            name: "Relevé du 23/06/2024 au 22/07/2024",
            startDate: "23/06/2024",
            endDate: "22/07/2024",
            transactions: [
              {
                id: "220",
                date: "20 Juil",
                description: "PRELEVEMENT EUROPEEN 0700458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              {
                id: "221",
                date: "18 Juil",
                description: "OPTION SOUPLESSE",
                amount: -2.5,
                category: "Frais bancaires",
              },
              {
                id: "222",
                date: "18 Juil",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              {
                id: "223",
                date: "18 Juil",
                description: "COTISATION JAZZ",
                amount: -16.1,
                category: "Frais bancaires",
              },
              {
                id: "224",
                date: "15 Juil",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "225", date: "12 Juil", description: "CHEQUE 285", amount: -118.0, category: "Chèque" },
              {
                id: "226",
                date: "10 Juil",
                description: "CARTE X3580 09/07 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "227",
                date: "05 Juil",
                description: "PRELEVEMENT EUROPEEN 1300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "228",
                date: "05 Juil",
                description: "PRELEVEMENT EUROPEEN 1211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "229",
                date: "05 Juil",
                description: "CARTE X3580 04/07 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "230",
                date: "03 Juil",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "231",
                date: "02 Juil",
                description: "VIR RECU1392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "232",
                date: "28 Juin",
                description: "PRELEVEMENT EUROPEEN 0301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "233",
                date: "25 Juin",
                description: "CARTE X3580 24/06 CARREFOUR VALLEIRY",
                amount: -72.45,
                category: "Alimentation",
              },
              {
                id: "234",
                date: "24 Juin",
                description: "VIR INST RE 477882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-9",
            name: "Relevé du 23/05/2024 au 22/06/2024",
            startDate: "23/05/2024",
            endDate: "22/06/2024",
            transactions: [
              {
                id: "235",
                date: "20 Juin",
                description: "PRELEVEMENT EUROPEEN 9600458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              {
                id: "236",
                date: "18 Juin",
                description: "OPTION SOUPLESSE",
                amount: -2.5,
                category: "Frais bancaires",
              },
              {
                id: "237",
                date: "18 Juin",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              {
                id: "238",
                date: "18 Juin",
                description: "COTISATION JAZZ",
                amount: -16.1,
                category: "Frais bancaires",
              },
              {
                id: "239",
                date: "15 Juin",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "240", date: "12 Juin", description: "CHEQUE 284", amount: -118.0, category: "Chèque" },
              {
                id: "241",
                date: "10 Juin",
                description: "CARTE X3580 09/06 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "242",
                date: "05 Juin",
                description: "PRELEVEMENT EUROPEEN 0300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "243",
                date: "05 Juin",
                description: "PRELEVEMENT EUROPEEN 0211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "244",
                date: "05 Juin",
                description: "CARTE X3580 04/06 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "245",
                date: "03 Juin",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "246",
                date: "02 Juin",
                description: "VIR RECU0392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "247",
                date: "28 Mai",
                description: "PRELEVEMENT EUROPEEN 9301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "248",
                date: "25 Mai",
                description: "CARTE X3580 24/05 CARREFOUR VALLEIRY",
                amount: -65.45,
                category: "Alimentation",
              },
              {
                id: "249",
                date: "24 Mai",
                description: "VIR INST RE 476882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-10",
            name: "Relevé du 23/04/2024 au 22/05/2024",
            startDate: "23/04/2024",
            endDate: "22/05/2024",
            transactions: [
              {
                id: "250",
                date: "20 Mai",
                description: "PRELEVEMENT EUROPEEN 8600458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              { id: "251", date: "18 Mai", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "252",
                date: "18 Mai",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "253", date: "18 Mai", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "254",
                date: "15 Mai",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "255", date: "12 Mai", description: "CHEQUE 283", amount: -118.0, category: "Chèque" },
              {
                id: "256",
                date: "10 Mai",
                description: "CARTE X3580 09/05 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "257",
                date: "05 Mai",
                description: "PRELEVEMENT EUROPEEN 9300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "258",
                date: "05 Mai",
                description: "PRELEVEMENT EUROPEEN 9211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "259",
                date: "05 Mai",
                description: "CARTE X3580 04/05 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "260",
                date: "03 Mai",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "261",
                date: "02 Mai",
                description: "VIR RECU9392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "262",
                date: "28 Avr",
                description: "PRELEVEMENT EUROPEEN 8301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "263",
                date: "25 Avr",
                description: "CARTE X3580 24/04 CARREFOUR VALLEIRY",
                amount: -58.45,
                category: "Alimentation",
              },
              {
                id: "264",
                date: "24 Avr",
                description: "VIR INST RE 475882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-11",
            name: "Relevé du 23/03/2024 au 22/04/2024",
            startDate: "23/03/2024",
            endDate: "22/04/2024",
            transactions: [
              {
                id: "265",
                date: "20 Avr",
                description: "PRELEVEMENT EUROPEEN 7600458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              { id: "266", date: "18 Avr", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "267",
                date: "18 Avr",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "268", date: "18 Avr", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "269",
                date: "15 Avr",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "270", date: "12 Avr", description: "CHEQUE 282", amount: -118.0, category: "Chèque" },
              {
                id: "271",
                date: "10 Avr",
                description: "CARTE X3580 09/04 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "272",
                date: "05 Avr",
                description: "PRELEVEMENT EUROPEEN 8300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "273",
                date: "05 Avr",
                description: "PRELEVEMENT EUROPEEN 8211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "274",
                date: "05 Avr",
                description: "CARTE X3580 04/04 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "275",
                date: "03 Avr",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "276",
                date: "02 Avr",
                description: "VIR RECU8392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "277",
                date: "28 Mar",
                description: "PRELEVEMENT EUROPEEN 7301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "278",
                date: "25 Mar",
                description: "CARTE X3580 24/03 CARREFOUR VALLEIRY",
                amount: -62.45,
                category: "Alimentation",
              },
              {
                id: "279",
                date: "24 Mar",
                description: "VIR INST RE 474882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-12",
            name: "Relevé du 23/02/2024 au 22/03/2024",
            startDate: "23/02/2024",
            endDate: "22/03/2024",
            transactions: [
              {
                id: "280",
                date: "20 Mar",
                description: "PRELEVEMENT EUROPEEN 6600458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              { id: "281", date: "18 Mar", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "282",
                date: "18 Mar",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "283", date: "18 Mar", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "284",
                date: "15 Mar",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "285", date: "12 Mar", description: "CHEQUE 281", amount: -118.0, category: "Chèque" },
              {
                id: "286",
                date: "10 Mar",
                description: "CARTE X3580 09/03 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "287",
                date: "05 Mar",
                description: "PRELEVEMENT EUROPEEN 7300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "288",
                date: "05 Mar",
                description: "PRELEVEMENT EUROPEEN 7211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "289",
                date: "05 Mar",
                description: "CARTE X3580 04/03 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "290",
                date: "03 Mar",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "291",
                date: "02 Mar",
                description: "VIR RECU7392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "292",
                date: "28 Fév",
                description: "PRELEVEMENT EUROPEEN 6301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "293",
                date: "25 Fév",
                description: "CARTE X3580 24/02 CARREFOUR VALLEIRY",
                amount: -75.45,
                category: "Alimentation",
              },
              {
                id: "294",
                date: "24 Fév",
                description: "VIR INST RE 473882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-13",
            name: "Relevé du 23/01/2024 au 22/02/2024",
            startDate: "23/01/2024",
            endDate: "22/02/2024",
            transactions: [
              {
                id: "295",
                date: "20 Fév",
                description: "PRELEVEMENT EUROPEEN 5600458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              { id: "296", date: "18 Fév", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "297",
                date: "18 Fév",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "298", date: "18 Fév", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "299",
                date: "15 Fév",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "300", date: "12 Fév", description: "CHEQUE 280", amount: -118.0, category: "Chèque" },
              {
                id: "301",
                date: "10 Fév",
                description: "CARTE X3580 09/02 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "302",
                date: "05 Fév",
                description: "PRELEVEMENT EUROPEEN 6300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "303",
                date: "05 Fév",
                description: "PRELEVEMENT EUROPEEN 6211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "304",
                date: "05 Fév",
                description: "CARTE X3580 04/02 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "305",
                date: "03 Fév",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "306",
                date: "02 Fév",
                description: "VIR RECU6392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "307",
                date: "28 Jan",
                description: "PRELEVEMENT EUROPEEN 5301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "308",
                date: "25 Jan",
                description: "CARTE X3580 24/01 CARREFOUR VALLEIRY",
                amount: -68.45,
                category: "Alimentation",
              },
              {
                id: "309",
                date: "24 Jan",
                description: "VIR INST RE 472882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-14",
            name: "Relevé du 23/12/2023 au 22/01/2024",
            startDate: "23/12/2023",
            endDate: "22/01/2024",
            transactions: [
              {
                id: "310",
                date: "20 Jan",
                description: "PRELEVEMENT EUROPEEN 4600458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              { id: "311", date: "18 Jan", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "312",
                date: "18 Jan",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "313", date: "18 Jan", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "314",
                date: "15 Jan",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "315", date: "12 Jan", description: "CHEQUE 279", amount: -118.0, category: "Chèque" },
              {
                id: "316",
                date: "10 Jan",
                description: "CARTE X3580 09/01 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "317",
                date: "05 Jan",
                description: "PRELEVEMENT EUROPEEN 5300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "318",
                date: "05 Jan",
                description: "PRELEVEMENT EUROPEEN 5211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "319",
                date: "05 Jan",
                description: "CARTE X3580 04/01 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "320",
                date: "03 Jan",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "321",
                date: "02 Jan",
                description: "VIR RECU5392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "322",
                date: "28 Déc",
                description: "PRELEVEMENT EUROPEEN 4301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "323",
                date: "25 Déc",
                description: "CARTE X3580 24/12 CARREFOUR VALLEIRY",
                amount: -85.45,
                category: "Alimentation",
              },
              {
                id: "324",
                date: "24 Déc",
                description: "VIR INST RE 471882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-15",
            name: "Relevé du 23/11/2023 au 22/12/2023",
            startDate: "23/11/2023",
            endDate: "22/12/2023",
            transactions: [
              {
                id: "325",
                date: "20 Déc",
                description: "PRELEVEMENT EUROPEEN 3600458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              { id: "326", date: "18 Déc", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "327",
                date: "18 Déc",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "328", date: "18 Déc", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "329",
                date: "15 Déc",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "330", date: "12 Déc", description: "CHEQUE 278", amount: -118.0, category: "Chèque" },
              {
                id: "331",
                date: "10 Déc",
                description: "CARTE X3580 09/12 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "332",
                date: "05 Déc",
                description: "PRELEVEMENT EUROPEEN 4300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "333",
                date: "05 Déc",
                description: "PRELEVEMENT EUROPEEN 4211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "334",
                date: "05 Déc",
                description: "CARTE X3580 04/12 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "335",
                date: "03 Déc",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "336",
                date: "02 Déc",
                description: "VIR RECU4392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "337",
                date: "28 Nov",
                description: "PRELEVEMENT EUROPEEN 3301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "338",
                date: "25 Nov",
                description: "CARTE X3580 24/11 CARREFOUR VALLEIRY",
                amount: -72.45,
                category: "Alimentation",
              },
              {
                id: "339",
                date: "24 Nov",
                description: "VIR INST RE 470882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-16",
            name: "Relevé du 23/10/2023 au 22/11/2023",
            startDate: "23/10/2023",
            endDate: "22/11/2023",
            transactions: [
              {
                id: "340",
                date: "20 Nov",
                description: "PRELEVEMENT EUROPEEN 2600458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              { id: "341", date: "18 Nov", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "342",
                date: "18 Nov",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "343", date: "18 Nov", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "344",
                date: "15 Nov",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "345", date: "12 Nov", description: "CHEQUE 277", amount: -118.0, category: "Chèque" },
              {
                id: "346",
                date: "10 Nov",
                description: "CARTE X3580 09/11 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "347",
                date: "05 Nov",
                description: "PRELEVEMENT EUROPEEN 3300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "348",
                date: "05 Nov",
                description: "PRELEVEMENT EUROPEEN 3211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "349",
                date: "05 Nov",
                description: "CARTE X3580 04/11 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "350",
                date: "03 Nov",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "351",
                date: "02 Nov",
                description: "VIR RECU3392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "352",
                date: "28 Oct",
                description: "PRELEVEMENT EUROPEEN 2301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "353",
                date: "25 Oct",
                description: "CARTE X3580 24/10 CARREFOUR VALLEIRY",
                amount: -68.45,
                category: "Alimentation",
              },
              {
                id: "354",
                date: "24 Oct",
                description: "VIR INST RE 469882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-17",
            name: "Relevé du 23/09/2023 au 22/10/2023",
            startDate: "23/09/2023",
            endDate: "22/10/2023",
            transactions: [
              {
                id: "355",
                date: "20 Oct",
                description: "PRELEVEMENT EUROPEEN 1600458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              { id: "356", date: "18 Oct", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "357",
                date: "18 Oct",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "358", date: "18 Oct", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "359",
                date: "15 Oct",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "360", date: "12 Oct", description: "CHEQUE 276", amount: -118.0, category: "Chèque" },
              {
                id: "361",
                date: "10 Oct",
                description: "CARTE X3580 09/10 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "362",
                date: "05 Oct",
                description: "PRELEVEMENT EUROPEEN 2300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "363",
                date: "05 Oct",
                description: "PRELEVEMENT EUROPEEN 2211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "364",
                date: "05 Oct",
                description: "CARTE X3580 04/10 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "365",
                date: "03 Oct",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "366",
                date: "02 Oct",
                description: "VIR RECU2392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "367",
                date: "28 Sep",
                description: "PRELEVEMENT EUROPEEN 1301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "368",
                date: "25 Sep",
                description: "CARTE X3580 24/09 CARREFOUR VALLEIRY",
                amount: -65.45,
                category: "Alimentation",
              },
              {
                id: "369",
                date: "24 Sep",
                description: "VIR INST RE 468882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
          {
            id: "statement-18",
            name: "Relevé du 23/08/2023 au 22/09/2023",
            startDate: "23/08/2023",
            endDate: "22/09/2023",
            transactions: [
              {
                id: "370",
                date: "20 Sep",
                description: "PRELEVEMENT EUROPEEN 0600458261 - PRET SOGEFINANC",
                amount: -309.49,
                category: "Prêt",
              },
              { id: "371", date: "18 Sep", description: "OPTION SOUPLESSE", amount: -2.5, category: "Frais bancaires" },
              {
                id: "372",
                date: "18 Sep",
                description: "OPTION TRANQUILLITE",
                amount: -0.7,
                category: "Frais bancaires",
              },
              { id: "373", date: "18 Sep", description: "COTISATION JAZZ", amount: -16.1, category: "Frais bancaires" },
              {
                id: "374",
                date: "15 Sep",
                description: "VIREMENT DECLIC SEUIL VERS COMPTE 00071 00030478420",
                amount: -50.0,
                category: "Épargne",
              },
              { id: "375", date: "12 Sep", description: "CHEQUE 275", amount: -118.0, category: "Chèque" },
              {
                id: "376",
                date: "10 Sep",
                description: "CARTE X3580 09/09 MOMEDITATION",
                amount: -13.99,
                category: "Bien-être",
              },
              {
                id: "377",
                date: "05 Sep",
                description: "PRELEVEMENT EUROPEEN 1300687265 - ALLIANZ I A R D",
                amount: -53.02,
                category: "Assurance",
              },
              {
                id: "378",
                date: "05 Sep",
                description: "PRELEVEMENT EUROPEEN 1211738282 - GESTION ASSURANCES",
                amount: -47.42,
                category: "Assurance",
              },
              {
                id: "379",
                date: "05 Sep",
                description: "CARTE X3580 04/09 NETFLIX.COM",
                amount: -10.99,
                category: "Loisirs",
              },
              {
                id: "380",
                date: "03 Sep",
                description: "VIR EUROPEEN EMIS LOGITEL - Gerald Dumont",
                amount: -1045.0,
                category: "Loyer",
              },
              {
                id: "381",
                date: "02 Sep",
                description: "VIR RECU1392612308S - FRANCE TRAVAIL",
                amount: 2432.7,
                category: "Revenus",
              },
              {
                id: "382",
                date: "28 Aoû",
                description: "PRELEVEMENT EUROPEEN 0301654755 - Orange SA-ORANGE",
                amount: -25.17,
                category: "Téléphonie",
              },
              {
                id: "383",
                date: "25 Aoû",
                description: "CARTE X3580 24/08 CARREFOUR VALLEIRY",
                amount: -72.45,
                category: "Alimentation",
              },
              {
                id: "384",
                date: "24 Aoû",
                description: "VIR INST RE 467882346928 - MR THON BENJAMIN",
                amount: 800.0,
                category: "Revenus",
              },
            ],
          },
        ]

        setStatements(statementData)
      } else if (id === "joint") {
        setAccountData({
          name: "Compte joint",
          number: "•••• 7890",
          balance: 1350.0,
        })
        setStatements([
          {
            id: "joint-statement-1",
            name: "Relevé du 23/03/2025 au 22/04/2025",
            startDate: "23/03/2025",
            endDate: "22/04/2025",
            transactions: [
              {
                id: "1",
                date: "03 Avr",
                description: "Virement reçu PARTICIPATION",
                amount: 500.0,
                category: "Revenus",
              },
              { id: "2", date: "01 Avr", description: "Prélèvement EDF", amount: -89.5, category: "Énergie" },
              { id: "3", date: "30 Mar", description: "Paiement CB IKEA", amount: -150.0, category: "Maison" },
              { id: "4", date: "28 Mar", description: "Paiement CB AUCHAN", amount: -65.3, category: "Alimentation" },
              { id: "5", date: "25 Mar", description: "Prélèvement INTERNET", amount: -39.99, category: "Télécoms" },
            ],
          },
        ])
      }

      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [params.id])

  // Get current statement
  const currentStatement = statements[currentStatementIndex] || { transactions: [] }

  // Filter transactions
  const filteredTransactions =
    filter === "all"
      ? currentStatement.transactions
      : filter === "in"
        ? currentStatement.transactions.filter((t) => t.amount > 0)
        : currentStatement.transactions.filter((t) => t.amount < 0)

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage)
  const indexOfLastTransaction = currentPage * transactionsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction)

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to top of transaction list
    const transactionList = document.getElementById("transaction-list")
    if (transactionList) {
      transactionList.scrollTop = 0
    }
  }

  // Handle statement change
  const handleStatementChange = (index: number) => {
    setCurrentStatementIndex(index)
    setCurrentPage(1)
    setShowStatementSelector(false)
  }

  // Calculate statement summary
  const calculateStatementSummary = (statement: StatementPeriod) => {
    const totalIn = statement.transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

    const totalOut = statement.transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)

    return {
      totalIn: totalIn.toFixed(2),
      totalOut: totalOut.toFixed(2),
      balance: (totalIn + totalOut).toFixed(2),
    }
  }

  const statementSummary = currentStatement
    ? calculateStatementSummary(currentStatement)
    : { totalIn: "0.00", totalOut: "0.00", balance: "0.00" }

  return (
    <PageSlideTransition direction="right">
      <div className="flex flex-col min-h-screen bg-white pb-16">
        {/* Header */}
        <header className="bg-[#E30513] text-white px-4 pt-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <ButtonEffect activeScale={0.9}>
              <button onClick={() => router.push("/accounts")} className="focus:outline-none">
                <ChevronLeft className="h-6 w-6" />
              </button>
            </ButtonEffect>
            <motion.h1
              className="text-xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {accountData?.name.toUpperCase()}
            </motion.h1>
            <ButtonEffect activeScale={0.9}>
              <button className="focus:outline-none">
                <Download className="h-6 w-6" />
              </button>
            </ButtonEffect>
          </div>

          {/* Account balance */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm opacity-80">Solde actuel</p>
            {isLoading ? (
              <div className="flex justify-center mt-1">
                <SkeletonLoader width={120} height={36} className="bg-white/20" />
              </div>
            ) : (
              <AnimatedNumber value={accountData?.balance || 0} className="text-3xl font-bold mt-1" suffix=" €" />
            )}
            <p className="text-xs mt-1">N° {accountData?.number}</p>
          </motion.div>
        </header>

        {/* Statement selector */}
        <div className="bg-white border-b border-gray-200">
          <ButtonEffect>
            <button
              className="w-full py-3 px-4 flex items-center justify-between"
              onClick={() => setShowStatementSelector(!showStatementSelector)}
            >
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium">{currentStatement?.name || "Relevé"}</span>
              </div>
              <ChevronRight
                className={`h-5 w-5 text-gray-500 transition-transform ${showStatementSelector ? "rotate-90" : ""}`}
              />
            </button>
          </ButtonEffect>

          {/* Statement dropdown */}
          <AnimatePresence>
            {showStatementSelector && (
              <motion.div
                className="border-t border-gray-100"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="max-h-64 overflow-y-auto">
                  {statements.map((statement, index) => (
                    <ButtonEffect key={statement.id}>
                      <button
                        className={`w-full py-3 px-4 flex items-center justify-between ${index === currentStatementIndex ? "bg-gray-50" : ""}`}
                        onClick={() => handleStatementChange(index)}
                      >
                        <div>
                          <p className={`${index === currentStatementIndex ? "font-medium text-[#E30513]" : ""}`}>
                            {statement.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Du {statement.startDate} au {statement.endDate}
                          </p>
                        </div>
                        <FileText
                          className={`h-5 w-5 ${index === currentStatementIndex ? "text-[#E30513]" : "text-gray-400"}`}
                        />
                      </button>
                    </ButtonEffect>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
          <div className="p-4" id="transaction-list">
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

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex justify-center items-center mt-6 space-x-2">
                <ButtonEffect>
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-full ${currentPage === 1 ? "text-gray-400" : "text-gray-700"}`}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                </ButtonEffect>

                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Calculate which page numbers to show
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <ButtonEffect key={i}>
                        <button
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-8 h-8 rounded-full ${
                            currentPage === pageNum ? "bg-[#E30513] text-white" : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {pageNum}
                        </button>
                      </ButtonEffect>
                    )
                  })}
                </div>

                <ButtonEffect>
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-full ${currentPage === totalPages ? "text-gray-400" : "text-gray-700"}`}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </ButtonEffect>
              </div>
            )}

            {/* Page indicator */}
            {!isLoading && totalPages > 1 && (
              <div className="text-center text-sm text-gray-500 mt-2">
                Page {currentPage} sur {totalPages}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </PageSlideTransition>
  )
}


"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  User,
  CreditCard,
  Landmark,
  Shield,
  Gift,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react"
import BottomNavigation from "@/components/bottom-navigation"
import PageTransition from "@/components/page-transition"
import ButtonEffect from "@/components/button-effect"

export default function MorePage() {
  const router = useRouter()

  const menuItems = [
    {
      title: "Mon profil",
      icon: <User className="h-5 w-5 text-[#E30513]" />,
      path: "/profile",
    },
    {
      title: "Mes produits",
      icon: <CreditCard className="h-5 w-5 text-[#E30513]" />,
      path: "/products",
    },
    {
      title: "Mes investissements",
      icon: <Landmark className="h-5 w-5 text-[#E30513]" />,
      path: "/investments",
    },
    {
      title: "Assurances",
      icon: <Shield className="h-5 w-5 text-[#E30513]" />,
      path: "/insurance",
    },
    {
      title: "Avantages",
      icon: <Gift className="h-5 w-5 text-[#E30513]" />,
      path: "/benefits",
    },
    {
      title: "Documents",
      icon: <FileText className="h-5 w-5 text-[#E30513]" />,
      path: "/documents",
    },
    {
      title: "Paramètres",
      icon: <Settings className="h-5 w-5 text-[#E30513]" />,
      path: "/accounts/settings",
    },
    {
      title: "Aide et support",
      icon: <HelpCircle className="h-5 w-5 text-[#E30513]" />,
      path: "/help",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
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
              MENU
            </motion.h1>
            <div className="w-6"></div> {/* Empty div for spacing */}
          </div>

          {/* White underline below title */}
          <motion.div
            className="w-32 h-0.5 bg-white mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </header>

        {/* Menu items */}
        <div className="flex-1 px-4 py-4 bg-gray-50">
          <motion.div
            className="bg-white rounded-lg shadow-sm overflow-hidden"
            initial="hidden"
            animate="show"
            variants={containerVariants}
            transition={{ delay: 0.4 }}
          >
            {menuItems.map((menuItem, index) => (
              <ButtonEffect key={index}>
                <motion.button
                  className={`w-full p-4 flex items-center justify-between ${index !== menuItems.length - 1 ? "border-b border-gray-100" : ""}`}
                  onClick={() => router.push(menuItem.path)}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mr-3">
                      {menuItem.icon}
                    </div>
                    <span>{menuItem.title}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </motion.button>
              </ButtonEffect>
            ))}
          </motion.div>

          {/* App version */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-xs text-gray-500">Version 2.5.1</p>
            <p className="text-xs text-gray-400 mt-1">© 2025 Société Générale - Tous droits réservés</p>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </PageTransition>
  )
}


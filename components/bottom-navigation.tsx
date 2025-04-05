"use client"

import { useRouter, usePathname } from "next/navigation"
import { Home, ArrowLeftRight, CreditCard, MessageSquare, Menu } from "lucide-react"
import { motion } from "framer-motion"

export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="grid grid-cols-5 h-16">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/accounts")}
          className="flex flex-col items-center justify-center space-y-1"
        >
          <Home className={`h-5 w-5 ${isActive("/accounts") ? "text-[#E30513]" : "text-gray-600"}`} />
          <span className={`text-xs ${isActive("/accounts") ? "text-[#E30513] font-medium" : "text-gray-600"}`}>
            Accueil
          </span>
          {isActive("/accounts") && (
            <motion.div className="absolute bottom-0 w-12 h-0.5 bg-[#E30513]" layoutId="navIndicator" />
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/transfers")}
          className="flex flex-col items-center justify-center space-y-1"
        >
          <ArrowLeftRight className={`h-5 w-5 ${isActive("/transfers") ? "text-[#E30513]" : "text-gray-600"}`} />
          <span className={`text-xs ${isActive("/transfers") ? "text-[#E30513] font-medium" : "text-gray-600"}`}>
            Virements
          </span>
          {isActive("/transfers") && (
            <motion.div className="absolute bottom-0 w-12 h-0.5 bg-[#E30513]" layoutId="navIndicator" />
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/cards")}
          className="flex flex-col items-center justify-center space-y-1"
        >
          <CreditCard className={`h-5 w-5 ${isActive("/cards") ? "text-[#E30513]" : "text-gray-600"}`} />
          <span className={`text-xs ${isActive("/cards") ? "text-[#E30513] font-medium" : "text-gray-600"}`}>
            Cartes
          </span>
          {isActive("/cards") && (
            <motion.div className="absolute bottom-0 w-12 h-0.5 bg-[#E30513]" layoutId="navIndicator" />
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/contact")}
          className="flex flex-col items-center justify-center space-y-1"
        >
          <MessageSquare className={`h-5 w-5 ${isActive("/contact") ? "text-[#E30513]" : "text-gray-600"}`} />
          <span className={`text-xs ${isActive("/contact") ? "text-[#E30513] font-medium" : "text-gray-600"}`}>
            Contact
          </span>
          {isActive("/contact") && (
            <motion.div className="absolute bottom-0 w-12 h-0.5 bg-[#E30513]" layoutId="navIndicator" />
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/more")}
          className="flex flex-col items-center justify-center space-y-1"
        >
          <Menu className={`h-5 w-5 ${isActive("/more") ? "text-[#E30513]" : "text-gray-600"}`} />
          <span className={`text-xs ${isActive("/more") ? "text-[#E30513] font-medium" : "text-gray-600"}`}>
            Autres
          </span>
          {isActive("/more") && (
            <motion.div className="absolute bottom-0 w-12 h-0.5 bg-[#E30513]" layoutId="navIndicator" />
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}


"use client"

import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  MessageSquare,
  Phone,
  Video,
  Mail,
  Search,
  FileText,
  CreditCard,
  Wallet,
  ArrowLeftRight,
  Shield,
} from "lucide-react"
import { motion } from "framer-motion"
import BottomNavigation from "@/components/bottom-navigation"
import PageTransition from "@/components/page-transition"
import ButtonEffect from "@/components/button-effect"

export default function HelpPage() {
  const router = useRouter()

  const faqCategories = [
    {
      icon: <CreditCard className="h-5 w-5 text-[#E30513]" />,
      title: "Cartes bancaires",
      count: 12,
    },
    {
      icon: <Wallet className="h-5 w-5 text-[#E30513]" />,
      title: "Comptes",
      count: 15,
    },
    {
      icon: <ArrowLeftRight className="h-5 w-5 text-[#E30513]" />,
      title: "Virements",
      count: 8,
    },
    {
      icon: <Shield className="h-5 w-5 text-[#E30513]" />,
      title: "Sécurité",
      count: 10,
    },
  ]

  const popularQuestions = [
    "Comment bloquer ma carte bancaire ?",
    "Comment modifier mon plafond de paiement ?",
    "Comment effectuer un virement international ?",
    "Comment contester une opération ?",
    "Comment changer mon code secret ?",
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
              AIDE ET SUPPORT
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

        {/* Help content */}
        <div className="flex-1 px-4 py-6 bg-gray-50">
          {/* Search */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Comment pouvons-nous vous aider ?"
                className="w-full py-3 pl-10 pr-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E30513]"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </motion.div>

          {/* Contact options */}
          <motion.div
            className="bg-white rounded-lg shadow-sm overflow-hidden mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Nous contacter</h3>
            </div>
            <div className="grid grid-cols-4 divide-x divide-gray-100">
              <ButtonEffect>
                <div className="p-4 flex flex-col items-center">
                  <Phone className="h-6 w-6 text-[#E30513] mb-2" />
                  <span className="text-xs text-center">Téléphone</span>
                </div>
              </ButtonEffect>
              <ButtonEffect>
                <div className="p-4 flex flex-col items-center">
                  <MessageSquare className="h-6 w-6 text-[#E30513] mb-2" />
                  <span className="text-xs text-center">Chat</span>
                </div>
              </ButtonEffect>
              <ButtonEffect>
                <div className="p-4 flex flex-col items-center">
                  <Video className="h-6 w-6 text-[#E30513] mb-2" />
                  <span className="text-xs text-center">Vidéo</span>
                </div>
              </ButtonEffect>
              <ButtonEffect>
                <div className="p-4 flex flex-col items-center">
                  <Mail className="h-6 w-6 text-[#E30513] mb-2" />
                  <span className="text-xs text-center">Email</span>
                </div>
              </ButtonEffect>
            </div>
          </motion.div>

          {/* FAQ Categories */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="font-medium mb-3">Catégories</h3>
            <div className="grid grid-cols-2 gap-3">
              {faqCategories.map((category, index) => (
                <ButtonEffect key={index}>
                  <motion.div
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-3 flex items-center">
                      <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mr-2">
                        {category.icon}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{category.title}</p>
                        <p className="text-xs text-gray-500">{category.count} articles</p>
                      </div>
                    </div>
                  </motion.div>
                </ButtonEffect>
              ))}
            </div>
          </motion.div>

          {/* Popular questions */}
          <motion.div
            className="bg-white rounded-lg shadow-sm overflow-hidden mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Questions fréquentes</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {popularQuestions.map((question, index) => (
                <ButtonEffect key={index}>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <HelpCircle className="h-5 w-5 text-gray-400 mr-3" />
                      <p className="text-sm">{question}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </ButtonEffect>
              ))}
            </div>
          </motion.div>

          {/* Guides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Guides et tutoriels</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Consultez nos guides et tutoriels pour vous aider à utiliser nos services.
              </p>
              <ButtonEffect>
                <button className="w-full py-3 bg-gray-100 rounded-lg text-gray-700 font-medium flex items-center justify-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Voir tous les guides
                </button>
              </ButtonEffect>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </PageTransition>
  )
}


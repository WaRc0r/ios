"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, FileText, Download, Filter, Search, Plus } from "lucide-react"
import { motion } from "framer-motion"
import BottomNavigation from "@/components/bottom-navigation"
import PageTransition from "@/components/page-transition"
import ButtonEffect from "@/components/button-effect"

export default function DocumentsPage() {
  const router = useRouter()

  const documents = [
    {
      title: "Relevé de compte - Avril 2025",
      type: "PDF",
      date: "05/04/2025",
      size: "1.2 MB",
    },
    {
      title: "Relevé de compte - Mars 2025",
      type: "PDF",
      date: "05/03/2025",
      size: "1.1 MB",
    },
    {
      title: "Attestation d'assurance habitation",
      type: "PDF",
      date: "15/02/2025",
      size: "0.8 MB",
    },
    {
      title: "Contrat Carte Visa Premier",
      type: "PDF",
      date: "10/01/2025",
      size: "2.3 MB",
    },
    {
      title: "Relevé annuel de frais 2024",
      type: "PDF",
      date: "15/01/2025",
      size: "1.5 MB",
    },
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
              DOCUMENTS
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

        {/* Documents content */}
        <div className="flex-1 px-4 py-6 bg-gray-50">
          {/* Search and filter */}
          <motion.div
            className="flex items-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Rechercher un document..."
                className="w-full py-2 pl-10 pr-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E30513]"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <ButtonEffect>
              <button className="ml-2 p-2 bg-white border border-gray-200 rounded-lg">
                <Filter className="h-5 w-5 text-gray-600" />
              </button>
            </ButtonEffect>
          </motion.div>

          {/* Document list */}
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
            {documents.map((document, index) => (
              <motion.div key={index} variants={item} whileHover={{ scale: 1.01 }}>
                <ButtonEffect>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 flex items-center">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-[#E30513]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{document.title}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{document.type}</span>
                          <span className="text-xs text-gray-500 ml-2">{document.date}</span>
                          <span className="text-xs text-gray-500 ml-2">{document.size}</span>
                        </div>
                      </div>
                      <ButtonEffect>
                        <button className="p-2 text-gray-500 hover:text-[#E30513]">
                          <Download className="h-5 w-5" />
                        </button>
                      </ButtonEffect>
                    </div>
                  </div>
                </ButtonEffect>
              </motion.div>
            ))}
          </motion.div>

          {/* Upload document */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6"
          >
            <ButtonEffect>
              <button className="w-full py-3 bg-[#E30513] text-white rounded-lg flex items-center justify-center">
                <Plus className="h-5 w-5 mr-2" />
                Importer un document
              </button>
            </ButtonEffect>
          </motion.div>

          {/* E-documents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">E-Documents</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Activez l'option e-documents pour recevoir tous vos relevés et documents de manière électronique.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">E-documents activés</span>
                <div className="w-12 h-6 bg-[#34C759] rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </PageTransition>
  )
}


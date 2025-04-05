"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, User, Mail, Phone, MapPin, Calendar, Edit, Camera } from "lucide-react"
import { motion } from "framer-motion"
import BottomNavigation from "@/components/bottom-navigation"
import PageTransition from "@/components/page-transition"
import ButtonEffect from "@/components/button-effect"
import { useState } from "react"

export default function ProfilePage() {
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)

  const profileInfo = [
    { icon: <User className="h-5 w-5 text-gray-500" />, label: "Nom complet", value: "Eliot Xavier Robert Guerin" },
    { icon: <Mail className="h-5 w-5 text-gray-500" />, label: "Email", value: "guerineliot@icloud.com" },
    { icon: <Phone className="h-5 w-5 text-gray-500" />, label: "Téléphone", value: "+33 6 51 74 82 35" },
    {
      icon: <MapPin className="h-5 w-5 text-gray-500" />,
      label: "Adresse",
      value: "79 ROUTE DE GRATELOUP VALLEIRY, 74520 VALLEIRY",
    },
    { icon: <Calendar className="h-5 w-5 text-gray-500" />, label: "Date de naissance", value: "29/12/2003" },
  ]

  const handleEditClick = () => {
    setShowPopup(true)

    // Fermer automatiquement le pop-up après 3 secondes
    setTimeout(() => {
      setShowPopup(false)
    }, 3000)
  }

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
              MON PROFIL
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

        {/* Profile content */}
        <div className="flex-1 px-4 py-6 bg-gray-50">
          {/* Profile picture */}
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-2 overflow-hidden">
                <User className="h-12 w-12 text-gray-400" />
              </div>
              <ButtonEffect>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#E30513] rounded-full flex items-center justify-center">
                  <Camera className="h-4 w-4 text-white" />
                </button>
              </ButtonEffect>
            </div>
            <h2 className="text-lg font-semibold mt-2">Eliot Xavier Robert Guerin</h2>
            <p className="text-sm text-gray-500">Client depuis 2015</p>
          </motion.div>

          {/* Profile information */}
          <motion.div
            className="bg-white rounded-lg shadow-sm overflow-hidden mb-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Informations personnelles</h3>
                <ButtonEffect>
                  <button className="text-[#E30513] flex items-center text-sm" onClick={handleEditClick}>
                    <Edit className="h-4 w-4 mr-1" /> Modifier
                  </button>
                </ButtonEffect>
              </div>
            </div>

            {profileInfo.map((info, index) => (
              <motion.div
                key={index}
                className={`p-4 ${index !== profileInfo.length - 1 ? "border-b border-gray-100" : ""}`}
                variants={item}
              >
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Preferences */}
          <motion.div
            className="bg-white rounded-lg shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Préférences de contact</h3>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Vous recevez actuellement des notifications par email et SMS. Vous pouvez modifier vos préférences
                  dans les paramètres.
                </p>
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-medium">Votre conseiller</p>
                  <p className="text-sm text-gray-700">Mme Sophie Durand</p>
                  <p className="text-xs text-gray-500">Agence de Saint-Julien-en-Genevois</p>
                  <p className="text-xs text-gray-500">Disponible du lundi au vendredi, 9h-17h</p>
                </div>
              </div>
              <ButtonEffect>
                <button className="w-full py-3 bg-gray-100 rounded-lg text-gray-700 font-medium">
                  Gérer mes préférences
                </button>
              </ButtonEffect>
            </div>
          </motion.div>
        </div>

        {/* Popup */}
        {showPopup && (
          <motion.div
            className="fixed inset-x-0 top-20 mx-auto w-[90%] max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <div className="p-4 border-b-2 border-[#E30513] bg-[#E30513] text-white font-medium rounded-t-lg">
              Information
            </div>
            <div className="p-4">
              <p className="text-gray-700">Pour modifier ces informations, veuillez contacter votre conseiller.</p>
              <div className="mt-4 flex justify-end">
                <ButtonEffect>
                  <button
                    className="px-4 py-2 bg-[#E30513] text-white rounded-lg text-sm"
                    onClick={() => setShowPopup(false)}
                  >
                    Fermer
                  </button>
                </ButtonEffect>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </PageTransition>
  )
}


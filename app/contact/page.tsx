"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, Phone, MessageSquare, Video, Mail, User } from "lucide-react"
import { motion } from "framer-motion"
import BottomNavigation from "@/components/bottom-navigation"
import PageSlideTransition from "@/components/page-slide-transition"
import ButtonEffect from "@/components/button-effect"

export default function ContactPage() {
  const router = useRouter()

  const contactOptions = [
    {
      icon: <Phone className="h-6 w-6 text-gray-600" />,
      title: "Par téléphone",
      description: "Appelez-nous au 09 69 39 33 39",
      subtext: "Du lundi au vendredi de 8h à 19h et le samedi de 9h à 17h",
      buttonText: "Appeler maintenant",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-gray-600" />,
      title: "Chat en ligne",
      description: "Discutez avec un conseiller",
      subtext: "Disponible 24/7",
      buttonText: "Démarrer un chat",
    },
    {
      icon: <Video className="h-6 w-6 text-gray-600" />,
      title: "Rendez-vous vidéo",
      description: "Rencontrez votre conseiller en vidéo",
      subtext: "Sur rendez-vous",
      buttonText: "Prendre rendez-vous",
    },
    {
      icon: <Mail className="h-6 w-6 text-gray-600" />,
      title: "Par email",
      description: "Envoyez-nous un message",
      subtext: "Réponse sous 48h",
      buttonText: "Envoyer un email",
    },
    {
      icon: <User className="h-6 w-6 text-gray-600" />,
      title: "Votre conseillère",
      description: "Mme Sophie Durand",
      subtext: "Agence de Saint-Julien-en-Genevois",
      buttonText: "Contacter ma conseillère",
    },
  ]

  return (
    <PageSlideTransition>
      <div className="flex flex-col min-h-screen bg-white pb-16">
        {/* Header */}
        <header className="bg-[#E30513] text-white px-4 pt-4 pb-6">
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
              CONTACT
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

        {/* Main content */}
        <div className="flex-1 px-4 py-6 bg-gray-50">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-2">Comment pouvons-nous vous aider ?</h2>
            <p className="text-gray-600">Choisissez votre mode de contact préféré</p>
          </motion.div>

          <div className="space-y-4">
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{option.title}</h3>
                      <p className="text-sm text-gray-500">{option.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{option.subtext}</p>
                    </div>
                  </div>
                  <ButtonEffect>
                    <motion.button
                      className="w-full mt-4 py-3 bg-gray-200/80 text-gray-700 rounded-none font-medium"
                      whileTap={{ backgroundColor: "rgba(209, 213, 219, 0.5)" }}
                    >
                      {option.buttonText}
                    </motion.button>
                  </ButtonEffect>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </PageSlideTransition>
  )
}


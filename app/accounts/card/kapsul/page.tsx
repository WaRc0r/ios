"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Settings, Lock, CreditCard, Smartphone, Globe, ToggleLeft, ToggleRight } from "lucide-react"
import BottomNavigation from "@/components/bottom-navigation"

export default function KapsulCardPage() {
  const router = useRouter()
  const [contactlessEnabled, setContactlessEnabled] = useState(true)
  const [onlinePaymentsEnabled, setOnlinePaymentsEnabled] = useState(true)
  const [abroadPaymentsEnabled, setAbroadPaymentsEnabled] = useState(false)

  // Card data
  const card = {
    name: "Carte Kapsul",
    number: "•••• 9012",
    type: "Débit immédiat",
    color: "from-red-600 to-red-500",
    balance: 150.0,
    limit: 500,
    remaining: 350,
    expiryDate: "11/27",
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pb-16">
      {/* Header */}
      <header className="bg-[#E30513] text-white px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => router.push("/cards")} className="focus:outline-none">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">{card.name.toUpperCase()}</h1>
          <button className="focus:outline-none">
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Card display */}
      <div className="px-4 py-6">
        <div className={`bg-gradient-to-r ${card.color} rounded-xl p-5 text-white shadow-lg`}>
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm opacity-80">{card.type}</p>
              <p className="mt-1 text-lg">{card.number}</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full"></div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-80">Expire fin</p>
              <p>{card.expiryDate}</p>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-8 h-8 bg-yellow-500 rounded-full opacity-80"></div>
              <div className="w-8 h-8 bg-red-500 rounded-full opacity-70 -ml-4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Card details */}
      <div className="flex-1 px-4 bg-gray-50">
        {/* Card limits */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Plafond de paiement</p>
                <p className="text-sm text-gray-500">Hebdomadaire</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{card.limit.toLocaleString("fr-FR")} €</p>
                <p className="text-sm text-gray-500">Reste: {card.remaining.toLocaleString("fr-FR")} €</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div
                className="h-2 bg-[#E30513] rounded-full"
                style={{ width: `${((card.limit - card.remaining) / card.limit) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Solde actuel</p>
                <p className="text-sm text-gray-500">{card.type}</p>
              </div>
              <p className="font-bold text-gray-800">{card.balance.toLocaleString("fr-FR")} €</p>
            </div>
          </div>
        </div>

        {/* Card settings */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <Smartphone className="h-4 w-4 text-gray-600" />
                </div>
                <p className="font-medium">Paiement sans contact</p>
              </div>
              <button onClick={() => setContactlessEnabled(!contactlessEnabled)} className="focus:outline-none">
                {contactlessEnabled ? (
                  <ToggleRight className="h-6 w-6 text-green-500" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <Globe className="h-4 w-4 text-gray-600" />
                </div>
                <p className="font-medium">Paiement à l'étranger</p>
              </div>
              <button onClick={() => setAbroadPaymentsEnabled(!abroadPaymentsEnabled)} className="focus:outline-none">
                {abroadPaymentsEnabled ? (
                  <ToggleRight className="h-6 w-6 text-green-500" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <CreditCard className="h-4 w-4 text-gray-600" />
                </div>
                <p className="font-medium">Paiements en ligne</p>
              </div>
              <button onClick={() => setOnlinePaymentsEnabled(!onlinePaymentsEnabled)} className="focus:outline-none">
                {onlinePaymentsEnabled ? (
                  <ToggleRight className="h-6 w-6 text-green-500" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="p-4">
            <h3 className="font-medium mb-4">Actions rapides</h3>
            <div className="grid grid-cols-3 gap-3">
              <button className="flex flex-col h-20 items-center justify-center bg-gray-50 rounded-lg">
                <Lock className="h-5 w-5 mb-1 text-gray-600" />
                <span className="text-xs">Bloquer</span>
              </button>
              <button className="flex flex-col h-20 items-center justify-center bg-gray-50 rounded-lg">
                <CreditCard className="h-5 w-5 mb-1 text-gray-600" />
                <span className="text-xs">Code PIN</span>
              </button>
              <button className="flex flex-col h-20 items-center justify-center bg-gray-50 rounded-lg">
                <Settings className="h-5 w-5 mb-1 text-gray-600" />
                <span className="text-xs">Paramètres</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}


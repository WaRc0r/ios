"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, Bell, Lock, CreditCard, User, HelpCircle, LogOut } from "lucide-react"
import BottomNavigation from "@/components/bottom-navigation"

export default function AccountSettingsPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-white pb-16">
      {/* Header */}
      <header className="bg-[#E30513] text-white px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => router.push("/accounts")} className="focus:outline-none">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">PARAMÈTRES</h1>
          <div className="w-6"></div> {/* Empty div for spacing */}
        </div>
      </header>

      {/* Settings list */}
      <div className="flex-1 px-4 py-4 bg-gray-50">
        <div className="space-y-4">
          {/* Profile section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold">Eliot Xavier Robert Guerin</p>
                  <p className="text-sm text-gray-500">eliot.guerin@email.com</p>
                </div>
              </div>
            </div>

            <button className="w-full p-4 flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-3" />
                <span>Informations personnelles</span>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400 transform rotate-180" />
            </button>
          </div>

          {/* Security section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-medium">Sécurité</h3>
            </div>

            <button className="w-full p-4 flex items-center justify-between border-b">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-gray-500 mr-3" />
                <span>Changer le code secret</span>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400 transform rotate-180" />
            </button>

            <button className="w-full p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-gray-500 mr-3" />
                <span>Notifications</span>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400 transform rotate-180" />
            </button>
          </div>

          {/* Preferences section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-medium">Préférences</h3>
            </div>

            <button className="w-full p-4 flex items-center justify-between border-b">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-gray-500 mr-3" />
                <span>Gestion des cartes</span>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400 transform rotate-180" />
            </button>

            <button className="w-full p-4 flex items-center justify-between">
              <div className="flex items-center">
                <HelpCircle className="h-5 w-5 text-gray-500 mr-3" />
                <span>Aide et support</span>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400 transform rotate-180" />
            </button>
          </div>

          {/* Logout button */}
          <button className="w-full p-4 bg-white rounded-lg shadow-sm flex items-center justify-center text-red-600">
            <LogOut className="h-5 w-5 mr-2" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}


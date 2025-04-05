"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import PageSlideTransition from "@/components/page-slide-transition"
import ButtonEffect from "@/components/button-effect"
import LoadingSpinner from "@/components/loading-spinner"

export default function LoginCodePage() {
  const router = useRouter()
  const [code, setCode] = useState<string>("")
  const [isValidating, setIsValidating] = useState(false)
  const [shake, setShake] = useState(false)
  const maxLength = 6
  const correctCode = "572719"

  const handleNumberClick = (number: number) => {
    if (code.length < maxLength) {
      const newCode = code + number
      setCode(newCode)

      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(10)
      }

      // Auto-validate when code is complete
      if (newCode.length === maxLength) {
        validateCode(newCode)
      }
    }
  }

  const validateCode = (codeToValidate: string) => {
    setIsValidating(true)

    // Simulate validation process
    setTimeout(() => {
      if (codeToValidate === correctCode) {
        router.push("/accounts")
      } else {
        setShake(true)
        setTimeout(() => setShake(false), 500)
        setCode("")
        setIsValidating(false)
      }
    }, 1000)
  }

  const handleValidate = () => {
    if (code.length === maxLength) {
      validateCode(code)
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleBackClick = () => {
    router.push("/home")
  }

  return (
    <PageSlideTransition direction="up">
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header - adjusted spacing and alignment */}
        <header className="px-5 py-5 flex items-center">
          <ButtonEffect activeScale={0.9}>
            <button onClick={handleBackClick} className="focus:outline-none">
              <ChevronLeft className="h-7 w-7 text-black" />
            </button>
          </ButtonEffect>
          <motion.div
            className="flex items-center mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-8 h-8 mr-2 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" stroke="#000000" strokeWidth="1.5" />
                <path
                  d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path d="M4 8H7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[#1a1a1a]">Eliot Xavier</h2>
          </motion.div>
          <div className="w-7"></div> {/* Empty div for spacing */}
        </header>

        <div className="flex-1 flex flex-col px-6">
          {/* Account number and checkmark - adjusted spacing and styling */}
          <motion.div
            className="flex items-center justify-between mt-8 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-2xl font-bold text-[#1a1a1a]">******39</div>
            <div className="w-7 h-7 rounded-full bg-[#4CD964] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12L10 17L20 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* Divider line - adjusted color */}
          <div className="w-full h-[1px] bg-[#E5E5E5]"></div>

          {/* Remember me toggle - refined styling */}
          <motion.div
            className="flex items-center justify-between py-4 border-b border-[#E5E5E5]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center">
              <span className="text-lg font-normal text-[#4A4A4A]">Se souvenir de moi</span>
              <div className="ml-2 w-6 h-6 rounded-full border border-[#D1D1D1] flex items-center justify-center">
                <span className="text-[#8E8E93] text-sm font-semibold">i</span>
              </div>
            </div>
            <div className="w-12 h-6 bg-[#34C759] rounded-full relative">
              <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"></div>
            </div>
          </motion.div>

          <div className="flex-1 flex flex-col">
            {/* Code secret text - adjusted spacing and typography */}
            <motion.div
              className="text-center mt-16 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-[22px] font-medium text-[#1a1a1a]">Saisissez votre code secret</h2>
            </motion.div>

            {/* Code dots - adjusted size and spacing */}
            <motion.div
              className="flex justify-center space-x-5 mb-32"
              animate={{ x: shake ? [-10, 10, -10, 10, -5, 5, -2, 2, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              {Array.from({ length: maxLength }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    backgroundColor: i < code.length ? "#1a1a1a" : "#E5E5E5",
                  }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className={`w-[10px] h-[10px] rounded-full`}
                />
              ))}
            </motion.div>

            {/* Keypad - adjusted to match reference exactly */}
            <div className="w-full max-w-md mx-auto mt-auto mb-8">
              <div className="grid grid-cols-5 gap-3 mb-6">
                {/* First row: 3, 7, 1, 0, 8 */}
                {[3, 7, 1, 0, 8].map((num, index) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                  >
                    <ButtonEffect key={num} activeScale={0.95} activeDuration={100}>
                      <button
                        onClick={() => handleNumberClick(num)}
                        className="w-full aspect-square rounded-md bg-white border border-[#E5E5E5] flex items-center justify-center text-2xl font-medium text-[#1a1a1a] shadow-sm"
                        disabled={isValidating}
                      >
                        {num}
                      </button>
                    </ButtonEffect>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-5 gap-3 mb-12">
                {/* Second row: 4, 6, 9, 5, 2 */}
                {[4, 6, 9, 5, 2].map((num, index) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                  >
                    <ButtonEffect key={num} activeScale={0.95} activeDuration={100}>
                      <button
                        onClick={() => handleNumberClick(num)}
                        className="w-full aspect-square rounded-md bg-white border border-[#E5E5E5] flex items-center justify-center text-2xl font-medium text-[#1a1a1a] shadow-sm"
                        disabled={isValidating}
                      >
                        {num}
                      </button>
                    </ButtonEffect>
                  </motion.div>
                ))}
              </div>

              {/* Validate button - adjusted color and styling */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
                <ButtonEffect>
                  <button
                    onClick={handleValidate}
                    className="w-full py-4 bg-[#FF9999] hover:bg-[#FF8080] rounded-full text-white text-xl font-medium mb-8 flex items-center justify-center"
                    disabled={isValidating}
                  >
                    {isValidating ? <LoadingSpinner size={24} color="#ffffff" className="mr-2" /> : null}
                    {isValidating ? "Validation..." : "Valider"}
                  </button>
                </ButtonEffect>
              </motion.div>

              {/* Forgot code link - adjusted styling */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <a href="#" className="text-[#4A4A4A] underline text-base font-normal">
                  Code secret oublié
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageSlideTransition>
  )
}


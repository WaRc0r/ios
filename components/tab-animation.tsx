"use client"

import { useState, type ReactNode, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface TabAnimationProps {
  tabs: Tab[]
  initialTab?: string
  onChange?: (tabId: string) => void
  className?: string
}

export default function TabAnimation({ tabs, initialTab, onChange, className = "" }: TabAnimationProps) {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0]?.id || "")
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    if (initialTab && initialTab !== activeTab) {
      setActiveTab(initialTab)
    }
  }, [initialTab])

  const handleTabChange = (tabId: string) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
    const newIndex = tabs.findIndex((tab) => tab.id === tabId)

    // Determine direction for animation
    setDirection(newIndex > currentIndex ? 1 : -1)
    setActiveTab(tabId)

    if (onChange) {
      onChange(tabId)
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
    }),
  }

  return (
    <div className={className}>
      {/* Tab headers */}
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-2 relative ${activeTab === tab.id ? "font-semibold" : "opacity-80"}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content with animation */}
      <div className="relative overflow-hidden">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={activeTab}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}
            className="w-full"
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const ChatbotIcon = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-white rounded-lg shadow-lg w-80 mb-4 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-ukm-primary p-4 text-white flex justify-between items-center">
              <h3 className="font-semibold">Chat dengan Kami</h3>
              <div className="flex space-x-2">
                <Link href="/chat" passHref>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-ukm-primary/80">
                    <Maximize2 size={16} />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChat}
                  className="h-8 w-8 text-white hover:bg-ukm-primary/80"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
            <div className="p-4 bg-gray-50 h-64 overflow-y-auto">
              <div className="bg-ukm-primary/10 p-3 rounded-lg rounded-tl-none mb-3 max-w-[80%]">
                <p className="text-sm">Halo! Ada yang bisa kami bantu terkait UKM Anda?</p>
              </div>
            </div>
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ketik pesan Anda..."
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ukm-primary"
                />
                <Button className="bg-ukm-primary hover:bg-ukm-primary/90">Kirim</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="bg-ukm-primary text-white rounded-full p-4 shadow-lg hover:bg-ukm-primary/90 focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  )
}

export default ChatbotIcon


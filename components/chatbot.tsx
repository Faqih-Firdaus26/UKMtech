"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Typing animation component
const TypingAnimation = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex(currentIndex + 1)
      }, 25) // Speed of typing

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return <>{displayedText}</>
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; isTyping?: boolean }[]>([
    { text: "Halo! Saya asisten virtual UKMtech. Ada yang bisa saya bantu?", isUser: false },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  // Add state for chatbot size
  const [chatSize, setChatSize] = useState("normal") // "small", "normal", "large"

  const toggleChat = () => {
    setIsOpen(!isOpen)
    // Reset position when opening
    if (!isOpen) {
      setPosition({ x: 0, y: 0 })
    }
    setShowTooltip(false)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() === "") return

    // Add user message
    const newMessages = [...messages, { text: inputValue, isUser: true }]
    setMessages(newMessages)
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "Terima kasih atas pertanyaan Anda. Saya akan membantu menjawabnya.",
        "Anda dapat menemukan informasi lebih lanjut di halaman Edukasi kami.",
        "Apakah ada hal lain yang ingin Anda tanyakan?",
        "Untuk konsultasi lebih lanjut, Anda dapat menghubungi tim kami melalui halaman Hubungi Kami.",
        "UKMtech menyediakan berbagai layanan untuk membantu UKM berkembang di era digital.",
      ]
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      setMessages([...newMessages, { text: randomResponse, isUser: false, isTyping: true }])
      setIsTyping(false)

      // After typing animation completes, mark as not typing
      setTimeout(
        () => {
          setMessages((prev) => prev.map((msg, idx) => (idx === prev.length - 1 ? { ...msg, isTyping: false } : msg)))
        },
        randomResponse.length * 25 + 500,
      ) // Adjust based on typing speed
    }, 1000)
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Show tooltip after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Chat Icon with Notification */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 1,
            }}
          >
            {/* Tooltip notification */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  className="absolute bottom-20 right-0 bg-ukm-primary text-white p-3 rounded-lg shadow-lg max-w-[250px] text-sm"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  Ada yang bisa kami bantu? Chat dengan kami!
                  <div className="absolute -bottom-2 right-6 w-4 h-4 bg-ukm-primary transform rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat button with pulse effect */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-ukm-primary/30 dark:bg-ukm-primary/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.3, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <Button
                onClick={toggleChat}
                className="w-16 h-16 rounded-full bg-ukm-primary hover:bg-ukm-primary/90 text-white shadow-lg flex items-center justify-center relative z-10"
              >
                <MessageCircle size={28} />
              </Button>
              <motion.span
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed z-50"
            initial={{ bottom: "24px", right: "24px", opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: position.x,
              y: position.y,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            drag
            dragMomentum={false}
            onDragEnd={(_, info) => {
              setPosition({
                x: position.x + info.offset.x,
                y: position.y + info.offset.y,
              })
            }}
          >
            {/* Update the chat window size based on the chatSize state */}
            <div
              className={cn(
                "bg-white dark:bg-ukm-dark rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700",
                chatSize === "small"
                  ? "w-[280px]"
                  : chatSize === "large"
                    ? "w-[450px] sm:w-[500px]"
                    : "w-[350px] sm:w-[400px]",
              )}
            >
              {/* Chat Header */}
              <div className="bg-ukm-primary text-white p-4 flex items-center justify-between cursor-move">
                <div className="flex items-center">
                  <MessageCircle size={20} className="mr-2" />
                  <h3 className="font-medium">UKMtech Assistant</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {chatSize !== "small" && (
                    <button
                      onClick={() => setChatSize("small")}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                      aria-label="Minimize chat"
                    >
                      <Minimize2 size={18} />
                    </button>
                  )}
                  {chatSize === "normal" && (
                    <button
                      onClick={() => setChatSize("large")}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                      aria-label="Maximize chat"
                    >
                      <Maximize2 size={18} />
                    </button>
                  )}
                  {chatSize === "small" && (
                    <button
                      onClick={() => setChatSize("normal")}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                      aria-label="Restore chat"
                    >
                      <Maximize2 size={18} />
                    </button>
                  )}
                  {chatSize === "large" && (
                    <button
                      onClick={() => setChatSize("normal")}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                      aria-label="Restore chat"
                    >
                      <Minimize2 size={18} />
                    </button>
                  )}
                  <button
                    onClick={toggleChat}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Close chat"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Chat Messages - adjust height based on size */}
              <div
                className={cn(
                  "p-4 overflow-y-auto bg-ukm-background dark:bg-gray-800",
                  chatSize === "small" ? "h-[300px]" : chatSize === "large" ? "h-[500px]" : "h-[400px]",
                )}
              >
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        y: 20,
                        x: message.isUser ? 20 : -20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        x: 0,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 200,
                      }}
                      className={cn(
                        "mb-4 max-w-[80%] p-3 rounded-lg shadow-sm",
                        message.isUser
                          ? "ml-auto bg-ukm-primary text-white rounded-br-none"
                          : "mr-auto bg-white dark:bg-gray-700 rounded-bl-none",
                      )}
                    >
                      {message.isTyping ? <TypingAnimation text={message.text} /> : message.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex space-x-2 mr-auto bg-white dark:bg-gray-700 p-3 rounded-lg rounded-bl-none max-w-[80%] mb-4"
                  >
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Ketik pesan Anda..."
                    className="flex-1 mr-2 dark:bg-gray-800 dark:border-gray-700 focus-visible:ring-ukm-primary"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Button type="submit" className="bg-ukm-primary hover:bg-ukm-primary/90 text-white">
                    <Send size={18} />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


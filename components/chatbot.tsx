"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Maximize2, Minimize2, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Update imports at the top to include AI SDK
import { useChat } from "@ai-sdk/react"

// Import Markdown components
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

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
  // State untuk menampilkan error message
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [demoMode, setDemoMode] = useState(false)
  
  // Gunakan hook useChat dari AI SDK
  const {
    messages: aiMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    setMessages,
    append
  } = useChat({
    api: "/api/chat", // Pastikan endpoint API sesuai
    id: "ukm-chatbot", // Tambahkan ID unik untuk chatbot
    initialMessages: [
      { 
        id: "initial-message", 
        role: "assistant", 
        content: "Halo! Saya asisten virtual UKMtech. Ada yang bisa saya bantu?" 
      }
    ],
    onResponse: (response) => {
      // Reset error jika respons berhasil
      if (response.status === 200) {
        setErrorMessage(null);
        setRetryCount(0);
        setDemoMode(false);
      }
    },
    onError: (error) => {
      console.error("Chatbot error:", error);
      
      // Set error message spesifik berdasarkan kode HTTP
      if (error.message && error.message.includes("Failed to fetch")) {
        setErrorMessage("Layanan AI tidak dapat dijangkau. Silakan periksa koneksi internet Anda dan coba lagi.");
        // Aktifkan mode demo jika terjadi error koneksi
        setDemoMode(true);
      } else {
        setErrorMessage("Maaf, ada masalah dengan layanan AI kami. Silakan coba lagi nanti.");
        setDemoMode(true);
      }
    }
  })
  
  const [showTooltip, setShowTooltip] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  // Ganti dengan hanya satu state ukuran (true = besar, false = kecil)
  const [isExpanded, setIsExpanded] = useState(true)
  // Tambahkan state untuk animasi ketik
  const [showTyping, setShowTyping] = useState(true)

  const toggleChat = () => {
    setIsOpen(!isOpen)
    // Reset position when opening
    if (!isOpen) {
      setPosition({ x: 0, y: 0 })
    }
    setShowTooltip(false)
  }

  // Toggle ukuran chatbox
  const toggleChatSize = () => {
    setIsExpanded(!isExpanded)
  }

  // Scroll ke bagian bawah chat ketika ada pesan baru
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [aiMessages])

  // Show tooltip after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Log error jika ada
  useEffect(() => {
    if (error) {
      console.error("AI Chat error:", error);
      
      // Extract error message from response if available
      if (typeof error === 'object' && error !== null) {
        const errorMsg = getErrorMessage(error);
        // Hanya mengatur pesan error jika berbeda dari yang sudah ada
        if (errorMsg !== errorMessage) {
          setErrorMessage(errorMsg);
        }
      } else if (!errorMessage) {
        setErrorMessage("Terjadi kesalahan saat berkomunikasi dengan asisten AI.");
      }
    }
  }, [error, errorMessage]);
  
  // Function to extract error message from error object
  const getErrorMessage = (error: unknown): string => {
    // Coba dapatkan pesan error dari beberapa tempat berbeda
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
      // Deteksi HTML error response (biasanya dari server Next.js)
      if (error.message.includes("<!DOCTYPE html>") || error.message.includes("<html")) {
        return "Server mengalami masalah internal. Silakan coba lagi nanti.";
      }
      
      // Potong pesan yang terlalu panjang
      const maxLength = 100;
      const message = error.message;
      return `Error: ${message.length > maxLength ? message.substring(0, maxLength) + '...' : message}`;
    }
    
    if (
      error && 
      typeof error === 'object' && 
      'response' in error && 
      error.response && 
      typeof error.response === 'object' && 
      'data' in error.response && 
      error.response.data && 
      typeof error.response.data === 'object' && 
      'error' in error.response.data && 
      typeof error.response.data.error === 'string'
    ) {
      return error.response.data.error;
    }
    
    // Default error message
    return "Terjadi kesalahan yang tidak diketahui. Silakan coba lagi nanti.";
  };

  // Atur animasi ketik untuk pesan baru
  useEffect(() => {
    // Aktifkan animasi ketik untuk setiap pesan baru dari asisten
    if (aiMessages.length > 0 && aiMessages[aiMessages.length - 1].role === "assistant") {
      setShowTyping(true)
      
      // Nonaktifkan animasi ketik setelah animasi selesai - buat waktu lebih pendek 
      const messageLength = aiMessages[aiMessages.length - 1].content.length;
      // Waktu minimum 1 detik, maksimum 5 detik
      const typingTime = Math.min(Math.max(messageLength * 15, 1000), 5000);
      
      const timer = setTimeout(() => {
        setShowTyping(false)
      }, typingTime)
      
      return () => clearTimeout(timer)
    }
  }, [aiMessages.length]) // Hanya jalankan effect ketika jumlah pesan berubah, bukan isi pesannya

  // Fungsi untuk menangani pengiriman pesan dengan error handling
  const handleSendWithErrorHandling = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    try {
      // Jika dalam mode demo, buat respons palsu
      if (demoMode) {
        const userInput = input; // Simpan input sebelum direset
        const demoResponses = [
          "Sebagai demo, saya hanya bisa memberikan jawaban standar. Silakan atur GROQ_API_KEY di file .env untuk mengaktifkan respons AI sebenarnya.",
          "Ini adalah mode demo. Untuk mengaktifkan AI sebenarnya, tambahkan kunci API Groq di file .env.",
          "UKMtech menyediakan berbagai layanan untuk UKM. Ini adalah respons demo saja. Atur GROQ_API_KEY untuk jawaban yang lebih baik.",
          "Mode demo aktif. Respons ini hanya placeholder - untuk respons AI yang sebenarnya, atur GROQ_API_KEY."
        ];
        
        // Reset input terlebih dahulu untuk mencegah double submission
        handleInputChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
        
        // Tambahkan pesan pengguna
        append({
          id: Date.now().toString(),
          content: userInput,
          role: "user"
        });
        
        // Simulasi delay
        setTimeout(() => {
          append({
            id: (Date.now() + 1).toString(),
            content: demoResponses[Math.floor(Math.random() * demoResponses.length)],
            role: "assistant"
          });
        }, 1000);
        
        return;
      }
      
      handleSubmit(e);
    } catch (err) {
      console.error("Error mengirim pesan:", err);
    }
  }

  // Coba kirim ulang pesan terakhir jika error
  const handleRetry = () => {
    // Hindari multiple clicks
    if (isLoading) return;
    
    if (aiMessages.length > 0) {
      // Ambil pesan terakhir dari pengguna jika ada
      const lastUserMessageIndex = [...aiMessages].reverse().findIndex(m => m.role === "user");
      
      if (lastUserMessageIndex !== -1) {
        // Filter pesan setelah user message terakhir
        const filteredMessages = aiMessages.slice(0, aiMessages.length - lastUserMessageIndex);
        
        // Set pesan
        setMessages(filteredMessages);
        
        // Coba kirim ulang dengan timeout kecil
        setTimeout(() => {
          try {
            reload();
            setRetryCount(prev => prev + 1);
            setErrorMessage(null);
          } catch (err) {
            console.error("Error retrying:", err);
            setErrorMessage("Gagal mencoba ulang. Silakan coba lagi nanti.");
          }
        }, 500);
      }
    }
  };

  // Fungsi untuk membuat chat baru
  const handleNewChat = () => {
    // Reset semua pesan kecuali pesan sambutan awal
    setMessages([
      { 
        id: "initial-message", 
        role: "assistant", 
        content: "Halo! Saya asisten virtual UKMtech. Ada yang bisa saya bantu?" 
      }
    ]);
    setErrorMessage(null);
    setRetryCount(0);
  };

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
                  className="absolute bottom-20 right-0 bg-ukm-primary text-white p-3 rounded-lg shadow-lg w-[250px] text-sm"
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
            {/* Update the chat window size based on isExpanded state */}
            <div
              className={cn(
                "bg-white dark:bg-ukm-dark rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700",
                isExpanded ? "w-[400px]" : "w-[280px]",
              )}
            >
              {/* Chat Header */}
              <div className="bg-ukm-primary text-white p-4 flex items-center justify-between cursor-move">
                <div className="flex items-center">
                  <MessageCircle size={20} className="mr-2" />
                  <h3 className="font-medium">UKMtech Assistant</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleNewChat}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="New Chat"
                    title="Buat percakapan baru"
                  >
                    <RefreshCcw size={16} />
                  </button>
                  <button
                    onClick={toggleChatSize}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label={isExpanded ? "Minimize chat" : "Maximize chat"}
                    title={isExpanded ? "Perkecil" : "Perbesar"}
                  >
                    {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </button>
                  <button
                    onClick={toggleChat}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Close chat"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Chat Messages - adjust height based on isExpanded state */}
              <div
                className={cn(
                  "p-4 overflow-y-auto bg-ukm-background dark:bg-gray-800",
                  isExpanded ? "h-[450px]" : "h-[300px]",
                )}
              >
                <AnimatePresence initial={false}>
                  {/* Tampilkan pesan dari AI SDK */}
                  {aiMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        y: 20,
                        x: message.role === "user" ? 20 : -20,
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
                        message.role === "user"
                          ? "ml-auto bg-ukm-primary text-white rounded-br-none"
                          : "mr-auto bg-white dark:bg-gray-700 rounded-bl-none prose prose-sm dark:prose-invert max-w-full",
                      )}
                    >
                      {message.role === "user" ? (
                        message.content
                      ) : message.role === "assistant" && index === aiMessages.length - 1 && showTyping ? (
                        <TypingAnimation text={message.content} />
                      ) : (
                        <div className="break-words prose prose-sm dark:prose-invert max-w-full">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {/* Tampilkan animasi "sedang mengetik" ketika loading */}
                {isLoading && (
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
                {/* Tampilkan pesan error */}
                {(error || errorMessage) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4 p-3 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 max-w-[80%] mr-auto"
                  >
                    <div className="flex flex-col gap-2">
                      <p>{errorMessage || "Maaf, terjadi kesalahan. Silakan coba lagi."}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRetry}
                        disabled={retryCount >= 3 || isLoading}
                        className="self-start text-xs"
                      >
                        {isLoading ? "Mencoba ulang..." : "Coba lagi"}
                      </Button>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendWithErrorHandling} className="p-4 border-t dark:border-gray-700">
                <div className="flex items-center">
                  {/* Gunakan input dari AI SDK */}
                  <Input
                    type="text"
                    placeholder="Ketik pesan Anda..."
                    className="flex-1 mr-2 dark:bg-gray-800 dark:border-gray-700 focus-visible:ring-ukm-primary"
                    value={input}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    className="bg-ukm-primary hover:bg-ukm-primary/90 text-white"
                    disabled={isLoading || !input.trim()}
                  >
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


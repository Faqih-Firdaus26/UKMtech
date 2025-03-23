"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ScrollReveal from "@/components/scroll-reveal"
import AnimatedBackground from "@/components/animated-background"
import { useState, FormEvent } from "react"
import { showToast } from "@/lib/utils"

export default function HubungiKamiPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulasi pengiriman data (ganti dengan API call sebenarnya)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form setelah berhasil
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      // Tampilkan toast success
      showToast.success("Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.");
    } catch (error) {
      // Tampilkan toast error
      showToast.error("Gagal mengirim pesan. Silakan coba lagi nanti.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 relative">
      <AnimatedBackground className="opacity-30 dark:opacity-10" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan atau membutuhkan
            informasi lebih lanjut.
          </p>
        </motion.div>

        {/* Contact Info and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <ScrollReveal direction="left">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Kirim Pesan</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">
                      Nama Lengkap
                    </label>
                    <Input 
                      id="name" 
                      placeholder="Masukkan nama lengkap Anda" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">
                      Email
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Masukkan email Anda" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium">
                    Nomor Telepon
                  </label>
                  <Input 
                    id="phone" 
                    placeholder="Masukkan nomor telepon Anda" 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium">
                    Subjek
                  </label>
                  <Input 
                    id="subject" 
                    placeholder="Masukkan subjek pesan Anda" 
                    required 
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Pesan
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Tulis pesan Anda di sini" 
                    rows={6} 
                    required 
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="w-full bg-ukm-primary hover:bg-ukm-primary/90"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-white"></div>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Kirim Pesan
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <div className="space-y-6">
                    {[
                      {
                        icon: <MapPin className="h-6 w-6 text-ukm-primary" />,
                        title: "Alamat",
                        content: "Jl. Teknologi No. 123, Jakarta Selatan, Indonesia",
                      },
                      {
                        icon: <Phone className="h-6 w-6 text-ukm-primary" />,
                        title: "Telepon",
                        content: "+62 812 3456 7890",
                      },
                      {
                        icon: <Mail className="h-6 w-6 text-ukm-primary" />,
                        title: "Email",
                        content: "info@ukmtech.id",
                      },
                      {
                        icon: <Clock className="h-6 w-6 text-ukm-primary" />,
                        title: "Jam Operasional",
                        content: "Senin - Jumat: 09:00 - 17:00 WIB\nSabtu: 09:00 - 14:00 WIB\nMinggu: Tutup",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="bg-ukm-primary/10 p-3 rounded-full mr-4">{item.icon}</div>
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {item.content.split("\n").map((line, i) => (
                              <span key={i} className="block">
                                {line}
                              </span>
                            ))}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                className="relative h-[300px] rounded-xl overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
                  alt="Kantor UKMtech"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </ScrollReveal>
        </div>

        {/* FAQ Section */}
        <ScrollReveal direction="up">
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Pertanyaan yang Sering Diajukan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "Bagaimana cara mendaftar untuk kursus di UKMtech?",
                  answer:
                    'Anda dapat mendaftar untuk kursus di UKMtech dengan mengunjungi halaman Edukasi, memilih kursus yang Anda minati, dan mengklik tombol "Daftar Sekarang". Anda akan diminta untuk mengisi formulir pendaftaran dan melakukan pembayaran.',
                },
                {
                  question: "Berapa biaya untuk konsultasi bisnis?",
                  answer:
                    "Biaya konsultasi bisnis bervariasi tergantung pada jenis konsultasi dan durasi. Anda dapat melihat detail biaya di halaman Konsultasi atau menghubungi kami untuk informasi lebih lanjut.",
                },
                {
                  question: "Apakah UKMtech menyediakan layanan pendampingan bisnis?",
                  answer:
                    "Ya, UKMtech menyediakan layanan pendampingan bisnis untuk UKM. Layanan ini mencakup konsultasi rutin, pemantauan perkembangan, dan bantuan dalam implementasi strategi bisnis.",
                },
                {
                  question: "Bagaimana cara bergabung dengan komunitas UKM?",
                  answer:
                    "Anda dapat bergabung dengan komunitas UKM dengan mengunjungi halaman Komunitas dan mengisi formulir pendaftaran. Setelah pendaftaran disetujui, Anda akan mendapatkan akses ke forum diskusi, event, dan manfaat lainnya.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal direction="up">
          <motion.div
            className="bg-ukm-dark text-white rounded-xl overflow-hidden"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Siap untuk Mengembangkan Bisnis Anda?</h2>
              <p className="text-lg mb-8 max-w-3xl mx-auto">
                Hubungi kami sekarang untuk mendapatkan konsultasi gratis dan pelajari bagaimana UKMtech dapat membantu
                bisnis Anda berkembang di era digital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-ukm-primary hover:bg-ukm-primary/90">
                    Hubungi Kami Sekarang
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-ukm-secondary text-ukm-secondary hover:bg-ukm-secondary/10 dark:border-ukm-secondary dark:text-ukm-secondary"
                  >
                    Jadwalkan Konsultasi
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </div>
  )
}


"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Award, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Sample consultant data
const consultants = [
  {
    id: "1",
    name: "Budi Santoso",
    role: "Konsultan Bisnis",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    description:
      "Budi Santoso adalah seorang konsultan bisnis berpengalaman dengan lebih dari 10 tahun pengalaman membantu UKM mengembangkan strategi bisnis yang efektif. Spesialisasi beliau mencakup perencanaan bisnis, analisis keuangan, dan strategi pertumbuhan.",
    expertise: ["Strategi Bisnis", "Keuangan", "Operasional"],
    experience: [
      "Mantan Direktur Operasional di perusahaan konsultan terkemuka",
      "Telah membantu lebih dari 100 UKM mengembangkan bisnis mereka",
      "Pembicara reguler di seminar dan workshop bisnis",
    ],
    education: ["MBA dari Universitas Indonesia", "Sarjana Ekonomi dari Institut Teknologi Bandung"],
    availability: [
      { day: "Senin", time: "09:00 - 17:00" },
      { day: "Selasa", time: "09:00 - 17:00" },
      { day: "Rabu", time: "09:00 - 17:00" },
      { day: "Kamis", time: "09:00 - 17:00" },
      { day: "Jumat", time: "09:00 - 15:00" },
    ],
    testimonials: [
      {
        name: "Ahmad Rizki",
        business: "Batik Nusantara",
        text: "Konsultasi dengan Pak Budi sangat membantu bisnis saya. Beliau memberikan saran yang praktis dan mudah diimplementasikan.",
      },
      {
        name: "Siti Rahma",
        business: "Kopi Lokal",
        text: "Berkat bimbingan Pak Budi, bisnis kopi saya berhasil meningkatkan omzet hingga 200% dalam 6 bulan.",
      },
    ],
  },
  {
    id: "2",
    name: "Siti Rahma",
    role: "Digital Marketing Specialist",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    description:
      "Siti Rahma adalah seorang spesialis digital marketing dengan pengalaman lebih dari 8 tahun dalam membantu UKM meningkatkan kehadiran online mereka. Spesialisasi beliau mencakup strategi media sosial, SEO, dan kampanye iklan online.",
    expertise: ["Media Sosial", "SEO", "Content Marketing"],
    experience: [
      "Mantan Digital Marketing Manager di agensi digital terkemuka",
      "Telah membantu lebih dari 80 UKM meningkatkan kehadiran online mereka",
      "Pembicara di berbagai seminar digital marketing",
    ],
    education: [
      "Master Marketing Digital dari Universitas Gadjah Mada",
      "Sarjana Komunikasi dari Universitas Indonesia",
    ],
    availability: [
      { day: "Senin", time: "10:00 - 18:00" },
      { day: "Selasa", time: "10:00 - 18:00" },
      { day: "Rabu", time: "10:00 - 18:00" },
      { day: "Kamis", time: "10:00 - 18:00" },
      { day: "Jumat", time: "10:00 - 16:00" },
    ],
    testimonials: [
      {
        name: "Dian Wijaya",
        business: "Fashion Batik",
        text: "Strategi media sosial yang disarankan oleh Bu Siti berhasil meningkatkan engagement dan penjualan produk fashion kami.",
      },
      {
        name: "Hendra Kusuma",
        business: "Toko Online Elektronik",
        text: "Kampanye iklan online yang dirancang oleh Bu Siti sangat efektif dalam meningkatkan traffic dan konversi di toko online kami.",
      },
    ],
  },
  {
    id: "3",
    name: "Dian Wijaya",
    role: "E-commerce Consultant",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    description:
      "Dian Wijaya adalah seorang konsultan e-commerce dengan pengalaman lebih dari 7 tahun dalam membantu UKM mengembangkan dan mengoptimalkan toko online mereka. Spesialisasi beliau mencakup strategi e-commerce, optimasi konversi, dan manajemen marketplace.",
    expertise: ["Marketplace", "Toko Online", "Strategi Penjualan"],
    experience: [
      "Mantan Head of E-commerce di perusahaan retail terkemuka",
      "Telah membantu lebih dari 60 UKM mengembangkan toko online mereka",
      "Pembicara di berbagai seminar e-commerce",
    ],
    education: [
      "Master Manajemen dari Institut Teknologi Bandung",
      "Sarjana Teknik Informatika dari Universitas Gadjah Mada",
    ],
    availability: [
      { day: "Senin", time: "09:00 - 17:00" },
      { day: "Selasa", time: "09:00 - 17:00" },
      { day: "Rabu", time: "09:00 - 17:00" },
      { day: "Kamis", time: "09:00 - 17:00" },
      { day: "Jumat", time: "09:00 - 15:00" },
    ],
    testimonials: [
      {
        name: "Rina Wijaya",
        business: "Kerajinan Bambu",
        text: "Berkat konsultasi dengan Pak Dian, toko online kami berhasil meningkatkan penjualan hingga 150% dalam 3 bulan.",
      },
      {
        name: "Andi Pratama",
        business: "Fashion Lokal",
        text: "Strategi marketplace yang disarankan oleh Pak Dian sangat efektif dalam meningkatkan visibilitas dan penjualan produk kami.",
      },
    ],
  },
]

export default function KonsultanDetailPage({ params }: { params: { id: string } }) {
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const consultant = consultants.find((item) => item.id === params.id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!consultant) {
    return (
      <div className="pt-24 pb-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Konsultan tidak ditemukan</h1>
          <p className="mb-8">Konsultan yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Link href="/konsultasi">
            <Button>Kembali ke Daftar Konsultan</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Link href="/konsultasi">
            <Button variant="ghost" className="flex items-center text-gray-600 hover:text-ukm-primary">
              <ArrowLeft size={18} className="mr-2" />
              Kembali ke Daftar Konsultan
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-80 w-full rounded-xl overflow-hidden mb-6">
              <Image
                src={consultant.image || "/placeholder.svg"}
                alt={consultant.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-2">{consultant.name}</h2>
              <p className="text-ukm-primary font-medium mb-4">{consultant.role}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {consultant.expertise.map((skill, i) => (
                  <Badge key={i} className="bg-ukm-primary/10 text-ukm-primary hover:bg-ukm-primary/20">
                    {skill}
                  </Badge>
                ))}
              </div>
              <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-ukm-primary hover:bg-ukm-primary/90 mb-4">Jadwalkan Konsultasi</Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Jadwalkan Konsultasi</DialogTitle>
                    <DialogDescription>
                      Pilih tanggal dan waktu untuk konsultasi dengan {consultant.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right">
                        Nama
                      </label>
                      <Input id="name" className="col-span-3" placeholder="Masukkan nama Anda" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="email" className="text-right">
                        Email
                      </label>
                      <Input id="email" type="email" className="col-span-3" placeholder="Masukkan email Anda" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="phone" className="text-right">
                        Telepon
                      </label>
                      <Input id="phone" className="col-span-3" placeholder="Masukkan nomor telepon Anda" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="date" className="text-right">
                        Tanggal
                      </label>
                      <Input id="date" type="date" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="time" className="text-right">
                        Waktu
                      </label>
                      <Input id="time" type="time" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="topic" className="text-right">
                        Topik
                      </label>
                      <Textarea
                        id="topic"
                        className="col-span-3"
                        placeholder="Jelaskan topik yang ingin Anda konsultasikan"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-ukm-primary hover:bg-ukm-primary/90">
                      Konfirmasi Jadwal
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    Hubungi Konsultan
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Hubungi {consultant.name}</DialogTitle>
                    <DialogDescription>
                      Kirim pesan kepada {consultant.name} untuk informasi lebih lanjut
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="contact-name" className="text-right">
                        Nama
                      </label>
                      <Input id="contact-name" className="col-span-3" placeholder="Masukkan nama Anda" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="contact-email" className="text-right">
                        Email
                      </label>
                      <Input id="contact-email" type="email" className="col-span-3" placeholder="Masukkan email Anda" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="contact-subject" className="text-right">
                        Subjek
                      </label>
                      <Input id="contact-subject" className="col-span-3" placeholder="Masukkan subjek pesan" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="contact-message" className="text-right">
                        Pesan
                      </label>
                      <Textarea id="contact-message" className="col-span-3" placeholder="Tulis pesan Anda" rows={5} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-ukm-primary hover:bg-ukm-primary/90">
                      Kirim Pesan
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-6">Profil Konsultan</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{consultant.description}</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Pengalaman</h3>
                <ul className="space-y-2">
                  {consultant.experience.map((exp, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Pendidikan</h3>
                <ul className="space-y-2">
                  {consultant.education.map((edu, i) => (
                    <li key={i} className="flex items-start">
                      <Award className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="availability" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="availability">Ketersediaan</TabsTrigger>
              <TabsTrigger value="testimonials">Testimoni</TabsTrigger>
            </TabsList>
            <TabsContent value="availability" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Jadwal Ketersediaan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {consultant.availability.map((slot, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:border-ukm-primary transition-colors">
                    <div className="flex items-center">
                      <div className="bg-ukm-primary/10 text-ukm-primary font-semibold rounded-full w-10 h-10 flex items-center justify-center mr-4">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium">{slot.day}</h3>
                        <p className="text-sm text-gray-600">{slot.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button
                  className="bg-ukm-primary hover:bg-ukm-primary/90"
                  onClick={() => setIsScheduleDialogOpen(true)}
                >
                  Jadwalkan Konsultasi Sekarang
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="testimonials" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Testimoni Klien</h2>
              <div className="space-y-6">
                {consultant.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <p className="italic mb-4">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <div className="bg-ukm-primary/10 text-ukm-primary font-semibold rounded-full w-10 h-10 flex items-center justify-center mr-4">
                        <User size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.business}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Consultants */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-8">Konsultan Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultants
              .filter((item) => item.id !== consultant.id)
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                    <p className="text-ukm-primary font-medium mb-4">{item.role}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.expertise.map((skill, i) => (
                        <span key={i} className="bg-ukm-primary/10 text-ukm-primary text-sm px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Link href={`/konsultasi/${item.id}`}>
                      <Button className="w-full bg-ukm-primary hover:bg-ukm-primary/90">Lihat Profil</Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}


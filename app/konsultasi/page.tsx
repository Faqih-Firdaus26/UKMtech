"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function KonsultasiPage() {
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null)

  const consultationTypes = [
    {
      id: "business",
      title: "Konsultasi Bisnis",
      description: "Dapatkan saran dan strategi untuk mengembangkan bisnis UKM Anda",
      icon: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      benefits: ["Analisis model bisnis", "Strategi pertumbuhan", "Perencanaan keuangan", "Optimasi operasional"],
    },
    {
      id: "digital-marketing",
      title: "Konsultasi Digital Marketing",
      description: "Pelajari strategi pemasaran digital yang efektif untuk UKM Anda",
      icon: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
      benefits: ["Strategi media sosial", "Optimasi SEO", "Kampanye iklan online", "Content marketing"],
    },
    {
      id: "e-commerce",
      title: "Konsultasi E-commerce",
      description: "Dapatkan panduan untuk mengoptimalkan toko online Anda",
      icon: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      benefits: [
        "Optimasi platform e-commerce",
        "Strategi penjualan online",
        "Manajemen inventaris",
        "Pengalaman pelanggan",
      ],
    },
  ]

  const consultants = [
    {
      id: "1",
      name: "Budi Santoso",
      role: "Konsultan Bisnis",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      expertise: ["Strategi Bisnis", "Keuangan", "Operasional"],
    },
    {
      id: "2",
      name: "Siti Rahma",
      role: "Digital Marketing Specialist",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      expertise: ["Media Sosial", "SEO", "Content Marketing"],
    },
    {
      id: "3",
      name: "Dian Wijaya",
      role: "E-commerce Consultant",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      expertise: ["Marketplace", "Toko Online", "Strategi Penjualan"],
    },
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Konsultasi UKM</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Dapatkan saran dan strategi dari para pakar untuk mengembangkan bisnis UKM Anda ke level berikutnya.
          </p>
        </motion.div>

        {/* Consultation Types */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {consultationTypes.map((type, index) => (
            <Card
              key={index}
              className="border-2 hover:border-ukm-primary transition-all duration-300 dark:bg-gray-800"
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-16 h-16 mb-4 relative overflow-hidden rounded-full">
                  <Image
                    src={type.icon || "/placeholder.svg"}
                    alt={type.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <CardTitle className="text-xl">{type.title}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="text-ukm-primary mr-2 mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-ukm-primary hover:bg-ukm-primary/90"
                      onClick={() => setSelectedConsultation(type.id)}
                    >
                      Jadwalkan Konsultasi
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-gray-800">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Jadwalkan Konsultasi {type.title}</DialogTitle>
                      <DialogDescription>Pilih tanggal dan waktu yang sesuai untuk konsultasi Anda.</DialogDescription>
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
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-ukm-primary hover:bg-ukm-primary/90">
                        Konfirmasi
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Bagaimana Cara Kerjanya</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-ukm-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-ukm-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pilih Jadwal</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pilih jenis konsultasi dan jadwal yang sesuai dengan kebutuhan Anda.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-ukm-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-ukm-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Konsultasi</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Lakukan konsultasi dengan pakar kami melalui video call atau tatap muka.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-ukm-dark/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-ukm-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Implementasi</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Terapkan saran dan strategi yang diberikan untuk mengembangkan bisnis Anda.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Our Consultants */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Konsultan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultants.map((consultant, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={consultant.image || "/placeholder.svg"}
                    alt={consultant.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{consultant.name}</h3>
                  <p className="text-ukm-primary font-medium mb-4">{consultant.role}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {consultant.expertise.map((skill, i) => (
                      <span key={i} className="bg-ukm-primary/10 text-ukm-primary text-sm px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link href={`/konsultasi/${consultant.id}`}>
                    <Button className="w-full bg-ukm-primary hover:bg-ukm-primary/90">Lihat Profil</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Hubungi Kami untuk Konsultasi</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Isi formulir di bawah ini untuk menghubungi tim kami dan mendapatkan informasi lebih lanjut tentang
                layanan konsultasi kami.
              </p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">
                      Nama Lengkap
                    </label>
                    <Input id="name" placeholder="Masukkan nama lengkap Anda" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Masukkan email Anda" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium">
                    Nomor Telepon
                  </label>
                  <Input id="phone" placeholder="Masukkan nomor telepon Anda" required />
                </div>
                <div>
                  <label htmlFor="consultation-type" className="block mb-2 font-medium">
                    Jenis Konsultasi
                  </label>
                  <select
                    id="consultation-type"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ukm-primary"
                    required
                  >
                    <option value="">Pilih Jenis Konsultasi</option>
                    <option value="business">Konsultasi Bisnis</option>
                    <option value="digital-marketing">Konsultasi Digital Marketing</option>
                    <option value="e-commerce">Konsultasi E-commerce</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Pesan
                  </label>
                  <Textarea id="message" placeholder="Ceritakan tentang kebutuhan konsultasi Anda" rows={4} required />
                </div>
                <Button className="w-full bg-ukm-primary hover:bg-ukm-primary/90">Kirim Pesan</Button>
              </form>
            </div>
            <div className="bg-ukm-dark p-8 lg:p-12 text-white flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-6">Mengapa Memilih Konsultasi UKMtech?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                  <p>Tim konsultan berpengalaman dengan lebih dari 10 tahun di bidangnya</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                  <p>Pendekatan konsultasi yang disesuaikan dengan kebutuhan spesifik UKM Anda</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                  <p>Solusi praktis yang dapat langsung diimplementasikan</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                  <p>Dukungan berkelanjutan setelah sesi konsultasi</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                  <p>Telah membantu lebih dari 500+ UKM di Indonesia</p>
                </li>
              </ul>
              <div className="mt-8 pt-8 border-t border-gray-700">
                <p className="font-semibold mb-4">Hubungi kami langsung:</p>
                <p className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-ukm-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +62 812 3456 7890
                </p>
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-ukm-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  konsultasi@ukmtech.id
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import EducationCard from "@/components/education-card"
import ScrollReveal from "@/components/scroll-reveal"

// Sample education data
const educationItems = [
  {
    id: "1",
    title: "Digital Marketing untuk UKM",
    description: "Pelajari strategi digital marketing yang efektif untuk mengembangkan bisnis UKM Anda di era digital.",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
    category: "Digital Marketing",
    date: "10 Juni 2023",
    duration: "8 Minggu",
    instructor: "Budi Santoso",
  },
  {
    id: "2",
    title: "Mengelola Keuangan UKM",
    description:
      "Dapatkan pengetahuan tentang cara mengelola keuangan UKM dengan efisien untuk pertumbuhan bisnis yang berkelanjutan.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1511&q=80",
    category: "Keuangan",
    date: "15 Juli 2023",
    duration: "6 Minggu",
    instructor: "Siti Rahma",
  },
  {
    id: "3",
    title: "Strategi E-commerce untuk UKM",
    description: "Pelajari cara membangun dan mengoptimalkan toko online untuk meningkatkan penjualan produk UKM Anda.",
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "E-commerce",
    date: "20 Agustus 2023",
    duration: "10 Minggu",
    instructor: "Dian Wijaya",
  },
  {
    id: "4",
    title: "Branding untuk UKM",
    description: "Pelajari cara membangun brand yang kuat untuk UKM Anda agar dapat bersaing di pasar yang kompetitif.",
    image:
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Branding",
    date: "5 September 2023",
    duration: "4 Minggu",
    instructor: "Rina Wijaya",
  },
  {
    id: "5",
    title: "Strategi Ekspansi Bisnis UKM",
    description:
      "Pelajari strategi untuk mengembangkan bisnis UKM Anda ke pasar yang lebih luas, baik domestik maupun internasional.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
    category: "Strategi Bisnis",
    date: "15 September 2023",
    duration: "8 Minggu",
    instructor: "Hendra Kusuma",
  },
  {
    id: "6",
    title: "Manajemen SDM untuk UKM",
    description:
      "Pelajari cara mengelola sumber daya manusia dengan efektif untuk meningkatkan produktivitas dan loyalitas karyawan.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "SDM",
    date: "1 Oktober 2023",
    duration: "6 Minggu",
    instructor: "Budi Santoso",
  },
  {
    id: "7",
    title: "Optimasi SEO untuk Website UKM",
    description:
      "Pelajari cara mengoptimalkan website UKM Anda agar mudah ditemukan oleh calon pelanggan melalui mesin pencari.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    category: "Digital Marketing",
    date: "10 Oktober 2023",
    duration: "4 Minggu",
    instructor: "Siti Rahma",
  },
  {
    id: "8",
    title: "Strategi Pemasaran Produk UKM",
    description:
      "Pelajari strategi pemasaran yang efektif untuk meningkatkan penjualan produk UKM Anda di berbagai saluran.",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Pemasaran",
    date: "20 Oktober 2023",
    duration: "6 Minggu",
    instructor: "Dian Wijaya",
  },
  {
    id: "9",
    title: "Inovasi Produk untuk UKM",
    description:
      "Pelajari cara mengembangkan produk inovatif yang sesuai dengan kebutuhan pasar dan dapat meningkatkan daya saing UKM Anda.",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    category: "Inovasi",
    date: "5 November 2023",
    duration: "8 Minggu",
    instructor: "Rina Wijaya",
  },
]

// Categories for filter
const categories = [
  "Semua",
  "Digital Marketing",
  "Keuangan",
  "E-commerce",
  "Branding",
  "Strategi Bisnis",
  "SDM",
  "Pemasaran",
  "Inovasi",
]

export default function EdukasiPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")

  // Filter education items based on search term and selected category
  const filteredItems = educationItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
          <h1 className="text-4xl font-bold mb-4">Edukasi UKM</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Tingkatkan pengetahuan dan keterampilan Anda dengan berbagai materi edukasi yang dirancang khusus untuk UKM.
          </p>
        </motion.div>

        {/* Featured Course */}
        <motion.div
          className="mb-16 relative rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Featured Course"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ukm-dark/80 to-transparent flex items-center">
              <div className="p-8 md:p-12 max-w-2xl">
                <motion.span
                  className="bg-ukm-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Kursus Unggulan
                </motion.span>
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Transformasi Digital untuk UKM
                </motion.h2>
                <motion.p
                  className="text-white/90 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Pelajari strategi komprehensif untuk mentransformasi bisnis UKM Anda di era digital. Kursus ini
                  mencakup digital marketing, e-commerce, manajemen operasional digital, dan strategi pertumbuhan.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/edukasi/10">
                      <Button size="lg" className="bg-ukm-primary hover:bg-ukm-primary/90">
                        Daftar Sekarang
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/edukasi/10">
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
                      >
                        Lihat Detail
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Cari kursus..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" />
              <select
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ukm-primary dark:bg-gray-700 dark:border-gray-600"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <ScrollReveal key={item.id} direction="up" delay={0.1 * index} distance={30}>
                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <EducationCard {...item} />
                </motion.div>
              </ScrollReveal>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Tidak ada kursus yang sesuai dengan kriteria pencarian Anda.
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <ScrollReveal direction="up" delay={0.3}>
          <motion.div
            className="mt-20 bg-ukm-dark text-white rounded-xl overflow-hidden"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6">Ingin Materi Edukasi Khusus?</h2>
                <p className="text-lg mb-8">
                  Kami dapat menyediakan materi edukasi yang disesuaikan dengan kebutuhan spesifik UKM Anda. Hubungi tim
                  kami untuk informasi lebih lanjut.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/hubungi-kami">
                      <Button size="lg" className="bg-ukm-primary hover:bg-ukm-primary/90">
                        Hubungi Kami
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/konsultasi">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-ukm-secondary text-ukm-secondary hover:bg-ukm-secondary/10 dark:border-ukm-secondary dark:text-ukm-secondary"
                      >
                        Jadwalkan Konsultasi
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
              <motion.div
                className="relative h-[400px] lg:h-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                  alt="Custom Education"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </div>
  )
}


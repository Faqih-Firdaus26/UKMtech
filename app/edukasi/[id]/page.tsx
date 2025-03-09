"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Award,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Sample education data
const educationItems = [
  {
    id: "1",
    title: "Digital Marketing untuk UKM",
    description:
      "Pelajari strategi digital marketing yang efektif untuk mengembangkan bisnis UKM Anda di era digital.",
    fullDescription:
      "Kursus ini dirancang khusus untuk pemilik UKM yang ingin mempelajari strategi digital marketing yang efektif untuk mengembangkan bisnis mereka di era digital. Anda akan mempelajari dasar-dasar digital marketing, SEO, SEM, media sosial marketing, email marketing, dan content marketing. Kursus ini juga akan membahas cara mengukur efektivitas kampanye digital marketing dan cara mengoptimalkan strategi berdasarkan data.",
    image:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80",
    category: "Digital Marketing",
    date: "10 Juni 2023",
    duration: "8 Minggu",
    instructor: "Budi Santoso",
    instructorRole: "Digital Marketing Specialist",
    instructorImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    modules: [
      "Pengenalan Digital Marketing",
      "Dasar-dasar SEO",
      "Google Ads dan SEM",
      "Media Sosial Marketing",
      "Email Marketing",
      "Content Marketing",
      "Analisis dan Pengukuran",
      "Strategi Digital Marketing Terpadu",
    ],
    benefits: [
      "Memahami dasar-dasar digital marketing",
      "Mampu membuat strategi SEO untuk website UKM",
      "Mengelola kampanye iklan online dengan efektif",
      "Memanfaatkan media sosial untuk promosi bisnis",
      "Mengukur dan menganalisis efektivitas kampanye digital",
    ],
  },
  {
    id: "2",
    title: "Mengelola Keuangan UKM",
    description:
      "Dapatkan pengetahuan tentang cara mengelola keuangan UKM dengan efisien untuk pertumbuhan bisnis yang berkelanjutan.",
    fullDescription:
      "Kursus ini akan membantu pemilik UKM untuk memahami dasar-dasar pengelolaan keuangan bisnis. Anda akan mempelajari cara membuat anggaran, mengelola arus kas, memahami laporan keuangan, dan membuat keputusan keuangan yang tepat untuk bisnis Anda. Kursus ini juga akan membahas strategi perpajakan dan perencanaan keuangan jangka panjang untuk UKM.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1511&q=80",
    category: "Keuangan",
    date: "15 Juli 2023",
    duration: "6 Minggu",
    instructor: "Siti Rahma",
    instructorRole: "Financial Advisor",
    instructorImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    modules: [
      "Dasar-dasar Keuangan Bisnis",
      "Pengelolaan Arus Kas",
      "Pembuatan dan Analisis Laporan Keuangan",
      "Penganggaran dan Perencanaan Keuangan",
      "Perpajakan untuk UKM",
      "Strategi Keuangan Jangka Panjang",
    ],
    benefits: [
      "Memahami dasar-dasar keuangan bisnis",
      "Mampu mengelola arus kas dengan efektif",
      "Membuat dan menganalisis laporan keuangan",
      "Membuat keputusan keuangan yang tepat",
      "Merencanakan strategi perpajakan yang efisien",
    ],
  },
  {
    id: "3",
    title: "Strategi E-commerce untuk UKM",
    description:
      "Pelajari cara membangun dan mengoptimalkan toko online untuk meningkatkan penjualan produk UKM Anda.",
    fullDescription:
      "Kursus ini akan mengajarkan Anda cara membangun dan mengoptimalkan toko online untuk meningkatkan penjualan produk UKM Anda. Anda akan mempelajari berbagai platform e-commerce, strategi penetapan harga, manajemen inventaris, pengiriman dan logistik, serta strategi pemasaran untuk toko online. Kursus ini juga akan membahas cara meningkatkan pengalaman pelanggan dan membangun loyalitas pelanggan.",
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "E-commerce",
    date: "20 Agustus 2023",
    duration: "10 Minggu",
    instructor: "Dian Wijaya",
    instructorRole: "E-commerce Consultant",
    instructorImage:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    modules: [
      "Pengenalan E-commerce",
      "Memilih Platform E-commerce yang Tepat",
      "Desain dan Pengalaman Pengguna",
      "Manajemen Produk dan Inventaris",
      "Strategi Penetapan Harga",
      "Pengiriman dan Logistik",
      "Pemasaran Toko Online",
      "Analisis dan Optimasi Performa",
      "Layanan Pelanggan",
      "Strategi Pertumbuhan E-commerce",
    ],
    benefits: [
      "Memahami dasar-dasar e-commerce",
      "Mampu memilih platform e-commerce yang tepat",
      "Mengelola produk dan inventaris dengan efektif",
      "Mengembangkan strategi pemasaran untuk toko online",
      "Meningkatkan pengalaman pelanggan dan loyalitas",
    ],
  },
];

const EducationCard = ({ id, title, description, image, category }: any) => {
  return (
    <Link
      href={`/edukasi/${id}`}
      className="block bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48 w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <Badge className="mb-4 bg-ukm-primary hover:bg-ukm-primary/90">
          {category}
        </Badge>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </Link>
  );
};

export default function EdukasiDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const education = educationItems.find((item) => item.id === params.id);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!education) {
    return (
      <div className="pt-24 pb-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Materi tidak ditemukan</h1>
          <p className="mb-8">
            Materi edukasi yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Link href="/edukasi">
            <Button>Kembali ke Daftar Edukasi</Button>
          </Link>
        </div>
      </div>
    );
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
          <Link href="/edukasi">
            <Button
              variant="ghost"
              className="flex items-center text-gray-600 hover:text-ukm-primary"
            >
              <ArrowLeft size={18} className="mr-2" />
              Kembali ke Daftar Edukasi
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-ukm-primary hover:bg-ukm-primary/90">
              {education.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {education.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {education.fullDescription}
            </p>
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar size={18} className="mr-2 text-ukm-primary" />
                <span>Mulai: {education.date}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Clock size={18} className="mr-2 text-ukm-primary" />
                <span>Durasi: {education.duration}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <User size={18} className="mr-2 text-ukm-primary" />
                <span>Instruktur: {education.instructor}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={education.image || "/placeholder.svg"}
                  alt={education.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={education.instructorImage || "/placeholder.svg"}
                      alt={education.instructor}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{education.instructor}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {education.instructorRole}
                    </p>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <BookOpen size={18} className="mr-3 text-ukm-primary" />
                    <span>{education.modules.length} Modul</span>
                  </div>
                  <div className="flex items-center">
                    <Award size={18} className="mr-3 text-ukm-primary" />
                    <span>Sertifikat Penyelesaian</span>
                  </div>
                </div>
                <Dialog
                  open={isRegisterDialogOpen}
                  onOpenChange={setIsRegisterDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full bg-ukm-primary hover:bg-ukm-primary/90">
                      Daftar Sekarang
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-ukm-dark">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        Daftar Kursus
                      </DialogTitle>
                      <DialogDescription>
                        Isi formulir di bawah ini untuk mendaftar kursus{" "}
                        {education.title}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="register-name" className="text-right">
                          Nama Lengkap
                        </label>
                        <Input
                          id="register-name"
                          className="col-span-3 dark:bg-gray-700"
                          placeholder="Masukkan nama lengkap Anda"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="register-email" className="text-right">
                          Email
                        </label>
                        <Input
                          id="register-email"
                          type="email"
                          className="col-span-3 dark:bg-gray-700"
                          placeholder="Masukkan email Anda"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="register-phone" className="text-right">
                          Telepon
                        </label>
                        <Input
                          id="register-phone"
                          className="col-span-3 dark:bg-gray-700"
                          placeholder="Masukkan nomor telepon Anda"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label
                          htmlFor="register-company"
                          className="text-right"
                        >
                          Nama UKM
                        </label>
                        <Input
                          id="register-company"
                          className="col-span-3 dark:bg-gray-700"
                          placeholder="Masukkan nama UKM Anda"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label
                          htmlFor="register-experience"
                          className="text-right"
                        >
                          Pengalaman
                        </label>
                        <select
                          id="register-experience"
                          className="col-span-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ukm-primary dark:bg-gray-700 dark:border-gray-600"
                        >
                          <option value="">Pilih Level Pengalaman</option>
                          <option value="beginner">Pemula</option>
                          <option value="intermediate">Menengah</option>
                          <option value="advanced">Mahir</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="bg-ukm-primary hover:bg-ukm-primary/90 text-white"
                      >
                        Konfirmasi Pendaftaran
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="modules">Modul Pembelajaran</TabsTrigger>
              <TabsTrigger value="benefits">Manfaat</TabsTrigger>
              <TabsTrigger value="instructor">Tentang Instruktur</TabsTrigger>
            </TabsList>
            <TabsContent
              value="modules"
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-6">
                Modul Pembelajaran
              </h2>
              <div className="space-y-4">
                {education.modules.map((module, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:border-ukm-primary transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="bg-ukm-primary/10 text-ukm-primary font-semibold rounded-full w-8 h-8 flex items-center justify-center mr-4">
                        {index + 1}
                      </div>
                      <h3 className="font-medium">{module}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent
              value="benefits"
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-6">Manfaat Kursus</h2>
              <div className="space-y-4">
                {education.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent
              value="instructor"
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-6">
                Tentang Instruktur
              </h2>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative h-48 w-48 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={education.instructorImage || "/placeholder.svg"}
                    alt={education.instructor}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 192px"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {education.instructor}
                  </h3>
                  <p className="text-ukm-primary font-medium mb-4">
                    {education.instructorRole}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {education.instructor} adalah seorang pakar di bidang{" "}
                    {education.category} dengan pengalaman lebih dari 10 tahun.
                    Beliau telah membantu ratusan UKM di Indonesia untuk
                    mengembangkan bisnis mereka melalui strategi{" "}
                    {education.category.toLowerCase()} yang efektif.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Sebagai instruktur, beliau dikenal dengan metode pengajaran
                    yang praktis dan mudah dipahami, serta selalu mengikuti
                    perkembangan terbaru di bidangnya.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Courses */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-8">Materi Terkait Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationItems
              .filter((item) => item.id !== education.id)
              .slice(0, 3)
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <EducationCard {...item} />
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Missing component definition
const BookOpen = ({ size, className }: { size: number; className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  );
};

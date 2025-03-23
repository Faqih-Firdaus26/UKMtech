"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParallaxSection from "@/components/parallax-section"
import EducationCard from "@/components/education-card"
import { useState, useEffect } from "react"

// Interface untuk data edukasi
interface Education {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  duration: number | string;
  instructor?: {
    _id: string;
    name: string;
    image: string;
  };
  isActive: boolean;
}

// Sample education data untuk fallback
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
]

export default function Home() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEducations() {
      try {
        const response = await fetch('/api/education');
        const data = await response.json();
        
        if (data.success) {
          setEducations(data.data.slice(0, 3)); // Ambil 3 edukasi teratas
        } else {
          console.error("Failed to fetch educations:", data.message);
        }
      } catch (error) {
        console.error("Error fetching educations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEducations();
  }, []);

  // Format durasi function
  function formatDuration(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} menit baca`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours} jam ${remainingMinutes} menit baca` 
        : `${hours} jam baca`;
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <>
      {/* Hero Section */}
      <ParallaxSection imageUrl="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-6">
              Kembangkan UKM Anda di Era Digital
            </h1>
            <p className="text-xl text-white drop-shadow-md mb-8">
              Platform edukasi dan konsultasi terpercaya untuk membantu UKM Indonesia berkembang dan bersaing di era
              digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/edukasi">
                <Button size="lg" className="bg-ukm-primary hover:bg-ukm-primary/90">
                  Mulai Sekarang
                </Button>
              </Link>
              <Link href="/tentang">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Solusi Lengkap untuk UKM</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              UKMtech menyediakan berbagai layanan untuk membantu UKM berkembang di era digital dengan strategi yang
              tepat.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-ukm-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-ukm-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Edukasi Digital</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Akses berbagai materi pembelajaran tentang digital marketing, e-commerce, dan teknologi untuk UKM.
              </p>
              <Link href="/edukasi" className="text-ukm-primary font-medium flex items-center hover:underline">
                Lihat Kursus
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-ukm-secondary/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-ukm-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Konsultasi Bisnis</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Dapatkan saran dan strategi dari pakar bisnis untuk mengembangkan UKM Anda ke level berikutnya.
              </p>
              <Link href="/konsultasi" className="text-ukm-secondary font-medium flex items-center hover:underline">
                Jadwalkan Konsultasi
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-ukm-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-ukm-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Komunitas UKM</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Bergabung dengan komunitas UKM untuk berbagi pengalaman, networking, dan kolaborasi bisnis.
              </p>
              <Link href="/komunitas" className="text-ukm-primary font-medium flex items-center hover:underline">
                Gabung Komunitas
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section with Parallax */}
      <ParallaxSection
        imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        height="80vh"
      >
        <div className="container mx-auto px-4">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 md:p-12 rounded-xl max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-ukm-dark">Tentang UKMtech</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                UKMtech adalah platform yang didedikasikan untuk membantu Usaha Kecil dan Menengah (UKM) di Indonesia
                untuk berkembang di era digital. Kami menyediakan edukasi, konsultasi, dan sumber daya yang dibutuhkan
                UKM untuk bersaing di pasar global.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                  <p>Lebih dari 500+ UKM telah bergabung dengan platform kami</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                  <p>Tim pakar dengan pengalaman lebih dari 10 tahun di bidang bisnis digital</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                  <p>Kursus dan materi yang selalu diperbarui mengikuti tren terbaru</p>
                </div>
              </div>
              <Link href="/tentang">
                <Button className="bg-ukm-primary hover:bg-ukm-primary/90">Pelajari Lebih Lanjut</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      {/* Education Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Edukasi Terbaru</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                Tingkatkan pengetahuan dan keterampilan Anda dengan materi edukasi terbaru dari para pakar industri.
              </p>
            </div>
            <Link href="/edukasi" className="mt-4 md:mt-0">
              <Button variant="outline" className="border-ukm-primary text-ukm-primary hover:bg-ukm-primary/10">
                Lihat Semua Kursus
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-4 animate-pulse"
                >
                  <div className="h-48 bg-gray-300 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="flex justify-between mt-4">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </motion.div>
              ))
            ) : educations.length > 0 ? (
              // Data dari MongoDB
              educations.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EducationCard 
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    category={item.category}
                    date={item.date}
                    duration={typeof item.duration === 'number' ? formatDuration(item.duration) : item.duration}
                    instructor={item.instructor ? item.instructor.name : undefined}
                  />
                </motion.div>
              ))
            ) : (
              // Data fallback
              educationItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EducationCard {...item} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ukm-dark">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Siap Mengembangkan UKM Anda?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Bergabunglah dengan ribuan UKM lainnya yang telah sukses mengembangkan bisnis mereka bersama UKMtech.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/edukasi">
                <Button size="lg" className="bg-ukm-primary hover:bg-ukm-primary/90">
                  Daftar Sekarang
                </Button>
              </Link>
              <Link href="/hubungi-kami">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-ukm-secondary text-ukm-secondary hover:bg-ukm-secondary/10 dark:border-ukm-secondary dark:text-ukm-secondary"
                >
                  Hubungi Tim Kami
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

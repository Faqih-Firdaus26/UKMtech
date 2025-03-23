"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import ScrollReveal from "@/components/scroll-reveal"
import Education from '@/models/Education'

// Sample education data for fallback
const educationItems = [
  {
    id: 1,
    title: "Cara Memulai Bisnis Online dengan Modal Minim",
    description: "Pelajari strategi memulai bisnis online dengan modal minimal namun hasil maksimal",
    image: "/images/edukasi-1.jpg",
    category: "Pemasaran",
    date: "10 Mei 2023",
    duration: "15 menit baca",
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

interface FallbackEducation {
  id: number | string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  duration: string;
  instructor?: string;
}

export default function EdukasiPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [educations, setEducations] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEducations() {
      try {
        const response = await fetch('/api/education');
        const data = await response.json();
        
        if (data.success) {
          setEducations(data.data);
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

  // Filter education items based on search term and selected category
  const filteredItems = educations.length > 0 
    ? educations.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory
        return matchesSearch && matchesCategory
      })
    : educationItems.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory
        return matchesSearch && matchesCategory
      });

  const categories = ["Semua", "Pemasaran", "Keuangan", "Produksi", "Teknologi"];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Section title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Edukasi UMKM</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Pelajari berbagai keterampilan dan pengetahuan untuk mengembangkan bisnis UMKM Anda.
          Kami menyediakan berbagai artikel, tutorial, dan sumber daya edukasi untuk membantu Anda sukses.
        </p>
      </div>

      {/* Search and filter */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari edukasi..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                } transition-colors`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Education cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="h-48 bg-gray-300 rounded-md mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="flex justify-between mt-4">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          ))
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item: Education | FallbackEducation, index) => (
            <ScrollReveal key={'_id' in item ? item._id : item.id} direction="up" delay={0.1 * index} distance={30}>
              <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                {'_id' in item ? (
                  // Real data from API
                  <Link 
                    href={`/edukasi/${item._id}`} 
                    className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
                  >
                    <div className="relative h-48 w-full">
                      <Image 
                        src={item.image || '/images/education-placeholder.jpg'} 
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {item.category}
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div>
                          <span className="mr-2">{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div>
                          {typeof item.duration === 'number' 
                            ? formatDuration(item.duration)
                            : item.duration}
                        </div>
                      </div>
                      
                      {item.instructor && typeof item.instructor === 'object' && (
                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center">
                          <Link 
                            href={`/instructor/${item.instructor._id}`}
                            className="flex items-center hover:text-blue-600"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="w-8 h-8 rounded-full overflow-hidden relative mr-2">
                              <Image 
                                src={item.instructor.image || "/placeholder-avatar.jpg"}
                                alt={item.instructor.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium">{item.instructor.name}</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </Link>
                ) : (
                  // Fallback data
                  <div className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                    <div className="relative h-48 w-full">
                      <Image 
                        src={item.image || '/images/education-placeholder.jpg'} 
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {item.category}
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div>
                          <span className="mr-2">{item.date}</span>
                        </div>
                        <div>{item.duration}</div>
                      </div>
                      
                      {item.instructor && (
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                            <span className="text-sm font-medium">{item.instructor}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </ScrollReveal>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <h3 className="text-xl text-gray-600">Tidak ada konten edukasi yang sesuai</h3>
            <p className="mt-2 text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
          </div>
        )}
      </div>
    </div>
  )
}


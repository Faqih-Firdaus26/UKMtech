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

// Interface untuk data instructor
interface Instructor {
  _id: string;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  image: string;
  bio?: string;
  expertise: string[];
  social_media?: {
    instagram?: string;
  };
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Data dummy untuk testimonial (tidak ada di database)
const testimonials = [
  {
    name: "Ahmad Rizki",
    business: "Batik Nusantara",
    text: "Konsultasi dengan konsultan sangat membantu bisnis saya. Beliau memberikan saran yang praktis dan mudah diimplementasikan.",
  },
  {
    name: "Siti Rahma",
    business: "Kopi Lokal",
    text: "Berkat bimbingan konsultan, bisnis kopi saya berhasil meningkatkan omzet hingga 200% dalam 6 bulan.",
  },
]

// Jadwal ketersediaan default (tidak ada di database)
const defaultAvailability = [
  { day: "Senin", time: "09:00 - 17:00" },
  { day: "Selasa", time: "09:00 - 17:00" },
  { day: "Rabu", time: "09:00 - 17:00" },
  { day: "Kamis", time: "09:00 - 17:00" },
  { day: "Jumat", time: "09:00 - 15:00" },
]

export default function KonsultanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [instructor, setInstructor] = useState<Instructor | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedInstructors, setRelatedInstructors] = useState<Instructor[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    
    async function fetchInstructor() {
      try {
        const resolvedParams = await params;
        // Ambil data instruktur berdasarkan ID
        const response = await fetch(`/api/instructor/${resolvedParams.id}`);
        const data = await response.json();
        
        if (data.success) {
          setInstructor(data.data);
          
          // Ambil instruktur lain dengan keahlian yang sama
          const expertsResponse = await fetch(`/api/instructor?expertise=${encodeURIComponent(data.data.expertise[0] || '')}`);
          const expertsData = await expertsResponse.json();
          
          if (expertsData.success) {
            // Filter untuk menghilangkan instruktur saat ini dan ambil maksimal 3 instruktur terkait
            const related = expertsData.data.filter((item: Instructor) => item._id !== data.data._id).slice(0, 3);
            setRelatedInstructors(related);
          }
        } else {
          console.error("Failed to fetch instructor:", data.message);
        }
      } catch (error) {
        console.error("Error fetching instructor:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInstructor();
  }, [params])

  if (loading) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 w-1/4 mb-6 rounded"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-1">
                <div className="h-80 bg-gray-300 rounded-xl mb-6"></div>
                <div className="bg-gray-200 p-6 rounded-xl">
                  <div className="h-8 bg-gray-300 w-2/3 mb-2 rounded"></div>
                  <div className="h-4 bg-gray-300 w-1/2 mb-4 rounded"></div>
                  <div className="flex gap-2 mb-6">
                    <div className="h-6 bg-gray-300 w-20 rounded-full"></div>
                    <div className="h-6 bg-gray-300 w-20 rounded-full"></div>
                  </div>
                  <div className="h-10 bg-gray-300 w-full mb-4 rounded"></div>
                  <div className="h-10 bg-gray-300 w-full rounded"></div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="h-10 bg-gray-300 w-1/3 mb-6 rounded"></div>
                <div className="h-4 bg-gray-300 w-full mb-2 rounded"></div>
                <div className="h-4 bg-gray-300 w-full mb-2 rounded"></div>
                <div className="h-4 bg-gray-300 w-2/3 mb-8 rounded"></div>
                
                <div className="h-6 bg-gray-300 w-1/4 mb-3 rounded"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-300 w-full rounded"></div>
                  <div className="h-4 bg-gray-300 w-full rounded"></div>
                  <div className="h-4 bg-gray-300 w-4/5 rounded"></div>
                </div>
                
                <div className="h-6 bg-gray-300 w-1/4 mb-3 rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 w-full rounded"></div>
                  <div className="h-4 bg-gray-300 w-3/4 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!instructor) {
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

  // Buat pengalaman berdasarkan bio jika tidak ada data khusus
  const experiences = instructor.bio ? instructor.bio.split('. ').filter(Boolean).map(sentence => sentence + '.') : [];
  
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
                src={instructor.image || "/placeholder.svg"}
                alt={instructor.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-2">{instructor.name}</h2>
              <p className="text-ukm-primary font-medium mb-4">{instructor.role}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {instructor.expertise.map((skill, i) => (
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
                      Pilih tanggal dan waktu untuk konsultasi dengan {instructor.name}
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
                    <DialogTitle className="text-2xl">Hubungi {instructor.name}</DialogTitle>
                    <DialogDescription>
                      Kirim pesan kepada {instructor.name} untuk informasi lebih lanjut
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
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{instructor.bio}</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Pengalaman</h3>
                <ul className="space-y-2">
                  {experiences.length > 0 ? (
                    experiences.slice(0, 3).map((exp, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                        <span>{exp}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start">
                      <CheckCircle className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                      <span>Berpengalaman dalam {instructor.expertise.join(", ")}</span>
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Keahlian</h3>
                <ul className="space-y-2">
                  {instructor.expertise.map((skill, i) => (
                    <li key={i} className="flex items-start">
                      <Award className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                      <span>{skill}</span>
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
                {defaultAvailability.map((slot, index) => (
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
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <p className="italic mb-4">&ldquo;{testimonial.text}&rdquo;</p>
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
        {relatedInstructors.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-8">Konsultan Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedInstructors.map((item, index) => (
                <motion.div
                  key={item._id}
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
                      {item.expertise.slice(0, 3).map((skill, i) => (
                        <span key={i} className="bg-ukm-primary/10 text-ukm-primary text-sm px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Link href={`/konsultasi/${item._id}`}>
                      <Button className="w-full bg-ukm-primary hover:bg-ukm-primary/90">Lihat Profil</Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}


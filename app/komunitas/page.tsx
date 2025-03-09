"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Sample events data
const events = [
  {
    id: "1",
    title: "Workshop Digital Marketing untuk UKM",
    description: "Workshop ini akan membahas strategi digital marketing yang efektif untuk UKM dengan budget terbatas.",
    image:
      "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "15 Juni 2023",
    time: "09:00 - 12:00 WIB",
    location: "Hotel Grand Mercure, Jakarta",
    attendees: 45,
  },
  {
    id: "2",
    title: "Seminar E-commerce untuk UKM",
    description: "Seminar ini akan membahas cara membangun dan mengoptimalkan toko online untuk UKM.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    date: "20 Juni 2023",
    time: "13:00 - 16:00 WIB",
    location: "Ballroom Hotel Mulia, Surabaya",
    attendees: 60,
  },
  {
    id: "3",
    title: "Networking Event: UKM Meet-Up",
    description: "Acara networking untuk para pelaku UKM untuk berbagi pengalaman dan menjalin kerjasama.",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "25 Juni 2023",
    time: "18:00 - 21:00 WIB",
    location: "Co-working Space XYZ, Bandung",
    attendees: 30,
  },
]

// Sample forum discussions
const discussions = [
  {
    id: "1",
    title: "Bagaimana cara meningkatkan penjualan online?",
    author: "Budi Santoso",
    date: "10 Juni 2023",
    replies: 15,
    views: 120,
  },
  {
    id: "2",
    title: "Strategi marketing dengan budget terbatas",
    author: "Siti Rahma",
    date: "12 Juni 2023",
    replies: 8,
    views: 95,
  },
  {
    id: "3",
    title: "Tips mengelola keuangan UKM",
    author: "Dian Wijaya",
    date: "13 Juni 2023",
    replies: 12,
    views: 110,
  },
  {
    id: "4",
    title: "Pengalaman menggunakan marketplace untuk UKM",
    author: "Hendra Kusuma",
    date: "14 Juni 2023",
    replies: 20,
    views: 150,
  },
  {
    id: "5",
    title: "Cara mendapatkan modal usaha untuk UKM",
    author: "Rina Wijaya",
    date: "15 Juni 2023",
    replies: 18,
    views: 135,
  },
]

export default function KomunitasPage() {
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)

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
          <h1 className="text-4xl font-bold mb-4">Komunitas UKM</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Bergabunglah dengan komunitas UKM untuk berbagi pengalaman, networking, dan kolaborasi bisnis.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="events">Event</TabsTrigger>
              <TabsTrigger value="forum">Forum Diskusi</TabsTrigger>
            </TabsList>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar size={16} className="mr-2" />
                          <span>
                            {event.date} • {event.time}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <MapPin size={16} className="mr-2" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Users size={16} className="mr-2" />
                          <span>{event.attendees} Peserta</span>
                        </div>
                      </div>
                      <Dialog
                        open={isEventDialogOpen && selectedEvent === event.id}
                        onOpenChange={(open) => {
                          setIsEventDialogOpen(open)
                          if (!open) setSelectedEvent(null)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            className="w-full bg-ukm-primary hover:bg-ukm-primary/90 text-white"
                            onClick={() => setSelectedEvent(event.id)}
                          >
                            Daftar Event
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white dark:bg-gray-800">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">Daftar Event</DialogTitle>
                            <DialogDescription>
                              Isi formulir di bawah ini untuk mendaftar event {event.title}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="name" className="text-right">
                                Nama
                              </label>
                              <Input
                                id="name"
                                className="col-span-3 dark:bg-gray-700"
                                placeholder="Masukkan nama Anda"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="email" className="text-right">
                                Email
                              </label>
                              <Input
                                id="email"
                                type="email"
                                className="col-span-3 dark:bg-gray-700"
                                placeholder="Masukkan email Anda"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="phone" className="text-right">
                                Telepon
                              </label>
                              <Input
                                id="phone"
                                className="col-span-3 dark:bg-gray-700"
                                placeholder="Masukkan nomor telepon Anda"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="company" className="text-right">
                                Nama UKM
                              </label>
                              <Input
                                id="company"
                                className="col-span-3 dark:bg-gray-700"
                                placeholder="Masukkan nama UKM Anda"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" className="bg-ukm-primary hover:bg-ukm-primary/90 text-white">
                              Konfirmasi Pendaftaran
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Forum Tab */}
            <TabsContent value="forum">
              <div className="bg-white dark:bg-ukm-dark rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b dark:border-gray-700">
                  <h2 className="text-2xl font-semibold mb-4">Forum Diskusi UKM</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Bergabunglah dalam diskusi dengan sesama pelaku UKM untuk berbagi pengalaman dan solusi.
                  </p>
                  <div className="flex justify-between items-center">
                    <Input placeholder="Cari topik diskusi..." className="max-w-md dark:bg-gray-700" />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-ukm-primary hover:bg-ukm-primary/90 text-white">Buat Topik Baru</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white dark:bg-ukm-dark">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">Buat Topik Diskusi Baru</DialogTitle>
                          <DialogDescription>
                            Bagikan pertanyaan atau pengalaman Anda dengan komunitas UKM
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="topic-title" className="text-right">
                              Judul
                            </label>
                            <Input
                              id="topic-title"
                              className="col-span-3 dark:bg-gray-700"
                              placeholder="Judul topik diskusi"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="topic-category" className="text-right">
                              Kategori
                            </label>
                            <select
                              id="topic-category"
                              className="col-span-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ukm-primary dark:bg-gray-700 dark:border-gray-600"
                            >
                              <option value="">Pilih Kategori</option>
                              <option value="digital-marketing">Digital Marketing</option>
                              <option value="finance">Keuangan</option>
                              <option value="operations">Operasional</option>
                              <option value="e-commerce">E-commerce</option>
                              <option value="general">Umum</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="topic-content" className="text-right">
                              Konten
                            </label>
                            <Textarea
                              id="topic-content"
                              className="col-span-3 dark:bg-gray-700"
                              placeholder="Tulis isi diskusi Anda di sini"
                              rows={5}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-ukm-primary hover:bg-ukm-primary/90 text-white">
                            Posting Diskusi
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="divide-y dark:divide-gray-700">
                  {discussions.map((discussion, index) => (
                    <motion.div
                      key={discussion.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <h3 className="text-lg font-semibold mb-1 hover:text-ukm-primary transition-colors cursor-pointer">
                                {discussion.title}
                              </h3>
                            </DialogTrigger>
                            <DialogContent className="bg-white dark:bg-ukm-dark max-w-3xl">
                              <DialogHeader>
                                <DialogTitle className="text-2xl">{discussion.title}</DialogTitle>
                                <DialogDescription>
                                  Oleh {discussion.author} • {discussion.date}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <p className="mb-6">
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget
                                  ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                                  Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies
                                  nisl nisl eget nisl.
                                </p>
                                <div className="border-t dark:border-gray-700 pt-4">
                                  <h4 className="font-semibold mb-4">Balasan ({discussion.replies})</h4>
                                  <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                    {Array.from({ length: discussion.replies }).map((_, idx) => (
                                      <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                        <div className="flex justify-between mb-2">
                                          <span className="font-medium">
                                            {idx % 2 === 0 ? "Ahmad Rizki" : "Siti Rahma"}
                                          </span>
                                          <span className="text-sm text-gray-500">{idx + 1} hari yang lalu</span>
                                        </div>
                                        <p>
                                          {idx % 2 === 0
                                            ? "Saya setuju dengan pendapat Anda. Saya juga mengalami hal yang sama dan berhasil mengatasinya dengan cara tersebut."
                                            : "Menurut pengalaman saya, ada beberapa strategi lain yang bisa dicoba untuk mengatasi masalah tersebut."}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  <div>
                                    <Textarea
                                      placeholder="Tulis balasan Anda..."
                                      className="mb-4 dark:bg-gray-700"
                                      rows={3}
                                    />
                                    <Button className="bg-ukm-primary hover:bg-ukm-primary/90 text-white">
                                      Kirim Balasan
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Oleh {discussion.author} • {discussion.date}
                          </p>
                        </div>
                        <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                          <p>{discussion.replies} Balasan</p>
                          <p>{discussion.views} Dilihat</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="p-6 border-t dark:border-gray-700 text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-ukm-primary text-ukm-primary hover:bg-ukm-primary/10 dark:border-ukm-secondary dark:text-ukm-secondary dark:hover:bg-ukm-secondary/10"
                      >
                        Lihat Semua Diskusi
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-ukm-dark max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Semua Diskusi Forum UKM</DialogTitle>
                        <DialogDescription>Jelajahi semua topik diskusi dari komunitas UKM</DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Input placeholder="Cari topik diskusi..." className="mb-6 dark:bg-gray-700" />
                        <div className="space-y-4">
                          {Array.from({ length: 10 }).map((_, idx) => {
                            const randomDiscussion = discussions[idx % discussions.length]
                            return (
                              <div
                                key={idx}
                                className="p-4 border dark:border-gray-700 rounded-lg hover:border-ukm-primary transition-colors"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-lg font-semibold mb-1 hover:text-ukm-primary transition-colors cursor-pointer">
                                      {randomDiscussion.title} {idx > 4 ? idx + 1 : ""}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      Oleh {randomDiscussion.author} • {randomDiscussion.date}
                                    </p>
                                  </div>
                                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                                    <p>{randomDiscussion.replies} Balasan</p>
                                    <p>{randomDiscussion.views} Dilihat</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Join Community Section */}
        <motion.div
          className="mt-20 bg-ukm-dark text-white rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">Bergabung dengan Komunitas UKM</h2>
              <p className="text-lg mb-8">
                Dapatkan akses ke forum diskusi, event eksklusif, dan kesempatan networking dengan sesama pelaku UKM dan
                pakar industri.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-ukm-primary/20 rounded-full p-2 mr-4">
                    <Users className="h-6 w-6 text-ukm-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Networking</h3>
                    <p className="text-gray-300">Perluas jaringan bisnis Anda dengan sesama pelaku UKM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-ukm-primary/20 rounded-full p-2 mr-4">
                    <Calendar className="h-6 w-6 text-ukm-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Event Eksklusif</h3>
                    <p className="text-gray-300">Akses ke workshop dan seminar khusus anggota</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-ukm-primary/20 rounded-full p-2 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-ukm-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Akses Eksklusif</h3>
                    <p className="text-gray-300">Materi dan sumber daya khusus untuk anggota</p>
                  </div>
                </div>
              </div>
              <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-8 bg-ukm-primary hover:bg-ukm-primary/90 text-white self-start">
                    Gabung Sekarang
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-ukm-dark">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Gabung Komunitas UKM</DialogTitle>
                    <DialogDescription>
                      Isi formulir di bawah ini untuk bergabung dengan komunitas UKM
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="join-name" className="text-right">
                        Nama Lengkap
                      </label>
                      <Input
                        id="join-name"
                        className="col-span-3 dark:bg-gray-700"
                        placeholder="Masukkan nama lengkap Anda"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="join-email" className="text-right">
                        Email
                      </label>
                      <Input
                        id="join-email"
                        type="email"
                        className="col-span-3 dark:bg-gray-700"
                        placeholder="Masukkan email Anda"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="join-phone" className="text-right">
                        Telepon
                      </label>
                      <Input
                        id="join-phone"
                        className="col-span-3 dark:bg-gray-700"
                        placeholder="Masukkan nomor telepon Anda"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="join-company" className="text-right">
                        Nama UKM
                      </label>
                      <Input
                        id="join-company"
                        className="col-span-3 dark:bg-gray-700"
                        placeholder="Masukkan nama UKM Anda"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="join-industry" className="text-right">
                        Industri
                      </label>
                      <select
                        id="join-industry"
                        className="col-span-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ukm-primary dark:bg-gray-700 dark:border-gray-600"
                      >
                        <option value="">Pilih Industri</option>
                        <option value="food">Makanan & Minuman</option>
                        <option value="fashion">Fashion</option>
                        <option value="craft">Kerajinan</option>
                        <option value="tech">Teknologi</option>
                        <option value="service">Jasa</option>
                        <option value="other">Lainnya</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="join-reason" className="text-right">
                        Alasan Bergabung
                      </label>
                      <Textarea
                        id="join-reason"
                        className="col-span-3 dark:bg-gray-700"
                        placeholder="Ceritakan alasan Anda ingin bergabung dengan komunitas UKM"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-ukm-primary hover:bg-ukm-primary/90 text-white">
                      Kirim Pendaftaran
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative h-[400px] lg:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                alt="Community"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


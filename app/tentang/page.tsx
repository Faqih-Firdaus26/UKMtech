"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Users, Award, TrendingUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"
import AnimatedCounter from "@/components/animated-counter"

export default function TentangPage() {
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
          <h1 className="text-4xl font-bold mb-4">Tentang UKMtech</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Platform edukasi dan konsultasi yang didedikasikan untuk membantu UKM di Indonesia berkembang di era
            digital.
          </p>
        </motion.div>

        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold mb-6">Misi Kami</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              UKMtech didirikan dengan misi untuk memberdayakan Usaha Kecil dan Menengah (UKM) di Indonesia melalui
              edukasi dan konsultasi di bidang teknologi dan digital marketing. Kami percaya bahwa UKM adalah tulang
              punggung ekonomi Indonesia, dan dengan bantuan teknologi yang tepat, UKM dapat berkembang dan bersaing di
              pasar global.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Sejak didirikan pada tahun 2018, UKMtech telah membantu lebih dari 500 UKM di seluruh Indonesia untuk
              mengembangkan bisnis mereka melalui pemanfaatan teknologi digital. Kami berkomitmen untuk terus berinovasi
              dan menyediakan solusi terbaik untuk membantu UKM Indonesia tumbuh dan berkembang.
            </p>
            <div className="space-y-4">
              {[
                "Memberikan edukasi dan pelatihan berkualitas tinggi untuk UKM",
                "Menyediakan konsultasi bisnis yang disesuaikan dengan kebutuhan UKM",
                "Membangun komunitas UKM yang saling mendukung dan berbagi pengetahuan",
                "Mendorong adopsi teknologi digital untuk meningkatkan daya saing UKM",
              ].map((item, index) => (
                <ScrollReveal key={index} direction="left" delay={0.1 * index} distance={30}>
                  <div className="flex items-start">
                    <CheckCircle className="text-ukm-primary mr-3 mt-1 flex-shrink-0" />
                    <p>{item}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[500px] rounded-xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Tim UKMtech"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-ukm-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-ukm-primary" />
              </div>
              <h3 className="text-4xl font-bold mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </h3>
              <p className="text-gray-600 dark:text-gray-200">UKM Telah Bergabung</p>
            </div>
            <div className="text-center">
              <div className="bg-ukm-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-ukm-secondary" />
              </div>
              <h3 className="text-4xl font-bold mb-2">
                <AnimatedCounter end={50} suffix="+" delay={300} />
              </h3>
              <p className="text-gray-600 dark:text-gray-200">Pakar & Konsultan</p>
            </div>
            <div className="text-center">
              <div className="bg-ukm-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-ukm-primary" />
              </div>
              <h3 className="text-4xl font-bold mb-2">
                <AnimatedCounter end={85} suffix="%" delay={600} />
              </h3>
              <p className="text-gray-600 dark:text-gray-200">Tingkat Keberhasilan</p>
            </div>
            <div className="text-center">
              <div className="bg-ukm-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-ukm-secondary" />
              </div>
              <h3 className="text-4xl font-bold mb-2">
                <AnimatedCounter end={5} suffix="+" delay={900} />
              </h3>
              <p className="text-gray-600 dark:text-gray-200">Tahun Pengalaman</p>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Tim Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Budi Santoso",
                role: "CEO & Founder",
                image:
                  "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                description: "Berpengalaman lebih dari 15 tahun di bidang teknologi dan pengembangan bisnis UKM.",
              },
              {
                name: "Siti Rahma",
                role: "COO",
                image:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                description: "Ahli dalam operasional bisnis dan manajemen tim dengan pengalaman 10 tahun.",
              },
              {
                name: "Dian Wijaya",
                role: "CTO",
                image:
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                description: "Pakar teknologi dengan spesialisasi di pengembangan platform digital untuk UKM.",
              },
              {
                name: "Rina Wijaya",
                role: "CMO",
                image:
                  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                description: "Ahli pemasaran digital dengan fokus pada strategi pertumbuhan untuk UKM.",
              },
            ].map((member, index) => (
              <ScrollReveal key={index} direction="up" delay={0.1 * index} distance={30}>
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={`${member.name} - ${member.role}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-ukm-primary font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{member.description}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-ukm-dark text-white rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">Bergabunglah dengan UKMtech</h2>
              <p className="text-lg mb-8">
                Dapatkan akses ke berbagai materi edukasi, konsultasi bisnis, dan komunitas UKM yang akan membantu
                bisnis Anda berkembang di era digital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/edukasi">
                    <Button size="lg" className="bg-ukm-primary hover:bg-ukm-primary/90">
                      Jelajahi Edukasi
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
              className="relative h-[400px] lg:h-auto overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="UKMtech Team Meeting"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface EducationCardProps {
  id: string
  title: string
  description: string
  image: string
  category: string
  date: string
  duration: string
  instructor: string
}

export default function EducationCard({
  id,
  title,
  description,
  image,
  category,
  date,
  duration,
  instructor,
}: EducationCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col border border-gray-200 dark:border-gray-700">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <motion.span
            className="bg-ukm-primary text-white px-3 py-1 rounded-full text-xs font-medium"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {category}
          </motion.span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>
        <div className="space-y-2 mb-4 mt-auto">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
            <Calendar size={16} className="mr-2 text-ukm-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
            <Clock size={16} className="mr-2 text-ukm-primary" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
            <User size={16} className="mr-2 text-ukm-primary" />
            <span>{instructor}</span>
          </div>
        </div>
        <Link href={`/edukasi/${id}`}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button className="w-full bg-ukm-primary hover:bg-ukm-primary/90 text-white">Lihat Detail</Button>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}


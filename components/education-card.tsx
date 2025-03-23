"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

interface EducationCardProps {
  id: string
  title: string
  description: string
  image: string
  category: string
  date: string
  duration: string
  instructor?: string
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
  function formatDate(dateString: string): string {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch {
      return dateString;
    }
  }

  return (
    <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
      <Link href={`/edukasi/${id}`} className="block h-full">
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
          <div className="relative h-48 w-full">
            <Image src={image} alt={title} fill style={{ objectFit: "cover" }} />
            <div className="absolute top-3 right-3 bg-ukm-primary text-white text-xs px-2 py-1 rounded-full">
              {category}
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">{description}</p>
            <div className="flex flex-wrap justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto">
              <div className="mb-2">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(date)}
                </span>
              </div>
              <div className="mb-2">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {duration}
                </span>
              </div>
            </div>
            {instructor && (
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{instructor}</span>
                </div>
              </div>
            )}
            
            <div className="mt-4 pt-2">
              <span className="inline-flex items-center text-xs font-medium text-ukm-primary hover:text-ukm-primary/80">
                Pelajari Sekarang
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}


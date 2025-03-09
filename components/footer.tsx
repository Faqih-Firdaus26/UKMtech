"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ukm-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-ukm-primary">UKM</span>
              <span className="text-ukm-secondary">tech</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Platform edukasi dan konsultasi untuk membantu UKM di Indonesia berkembang di era digital.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-gray-300 hover:text-ukm-primary transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-300 hover:text-ukm-primary transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-300 hover:text-ukm-primary transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Twitter size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-ukm-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/edukasi" className="text-gray-300 hover:text-ukm-primary transition-colors">
                  Edukasi
                </Link>
              </li>
              <li>
                <Link href="/konsultasi" className="text-gray-300 hover:text-ukm-primary transition-colors">
                  Konsultasi
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-gray-300 hover:text-ukm-primary transition-colors">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/edukasi" className="text-gray-300 hover:text-ukm-primary transition-colors">
                  Kursus Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/edukasi" className="text-gray-300 hover:text-ukm-primary transition-colors">
                  Pelatihan E-commerce
                </Link>
              </li>
              <li>
                <Link href="/konsultasi" className="text-gray-300 hover:text-ukm-primary transition-colors">
                  Konsultasi Bisnis
                </Link>
              </li>
              <li>
                <Link href="/konsultasi" className="text-gray-300 hover:text-ukm-primary transition-colors">
                  Pendampingan UKM
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-ukm-primary mt-1 flex-shrink-0" />
                <span className="text-gray-300">Jl. Teknologi No. 123, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-ukm-primary flex-shrink-0" />
                <span className="text-gray-300">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-ukm-primary flex-shrink-0" />
                <span className="text-gray-300">info@ukmtech.id</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} UKMtech. Hak Cipta Dilindungi.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer


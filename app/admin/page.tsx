import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="container mx-auto min-h-[500px] px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Panel Admin UKMtech</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <Link
          href="/admin/products"
          className="flex flex-col p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Manajemen Produk</h2>
          <p className="text-gray-600 mb-4">
            Kelola produk-produk UMKM yang dijual di platform
          </p>
          <div className="mt-auto text-blue-600 flex items-center">
            Kelola Produk
            <ArrowRight size={16} className="ml-1" />
          </div>
        </Link> */}

        <Link
          href="/admin/education"
          className="flex flex-col p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Manajemen Edukasi</h2>
          <p className="text-gray-600 mb-4">
            Kelola konten edukasi untuk pelaku UMKM
          </p>
          <div className="mt-auto text-blue-600 flex items-center">
            Kelola Edukasi
            <ArrowRight size={16} className="ml-1" />
          </div>
        </Link>

        <Link
          href="/admin/instructor"
          className="flex flex-col p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Manajemen Instruktur</h2>
          <p className="text-gray-600 mb-4">
            Kelola data instruktur yang mengajar konten edukasi
          </p>
          <div className="mt-auto text-blue-600 flex items-center">
            Kelola Instruktur
            <ArrowRight size={16} className="ml-1" />
          </div>
        </Link>

        {/* <Link
          href="/admin/users"
          className="flex flex-col p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Manajemen Pengguna</h2>
          <p className="text-gray-600 mb-4">
            Kelola pengguna dan akses ke platform
          </p>
          <div className="mt-auto text-blue-600 flex items-center">
            Kelola Pengguna
            <ArrowRight size={16} className="ml-1" />
          </div>
        </Link> */}
      </div>
    </div>
  );
} 
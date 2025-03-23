"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, Search, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Education {
  _id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  duration: number;
  instructor: string | {
    _id: string;
    name: string;
    image: string;
    expertise: string[];
  };
  image: string;
  isActive: boolean;
  createdAt: string;
}

export default function EducationAdminPage() {
  // State
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 10;
  
  // Filter and search state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  // Sort state
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch educations data
  const fetchEducations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Construct query params
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());
      
      if (searchTerm) {
        queryParams.append("search", searchTerm);
      }
      
      if (selectedCategory) {
        queryParams.append("category", selectedCategory);
      }
      
      queryParams.append("sortField", sortField);
      queryParams.append("sortOrder", sortOrder);
      
      const response = await fetch(`/api/education?${queryParams.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setEducations(data.data);
        setTotalPages(data.totalPages);
        setTotalItems(data.total);
      } else {
        setError(data.message || "Terjadi kesalahan saat mengambil data edukasi");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghubungi server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete education
  const handleDeleteEducation = async (id: string, title: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus "${title}"?`)) {
      return;
    }
    
    try {
      const response = await fetch(`/api/education/${id}`, {
        method: "DELETE",
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Re-fetch data after deletion
        fetchEducations();
      } else {
        setError(data.message || "Gagal menghapus edukasi");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghubungi server");
      console.error(err);
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset page to 1 when searching
    fetchEducations();
  };
  
  // Handle category filter
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1); // Reset page to 1 when filtering
  };
  
  // Handle sort
  const handleSort = (field: string) => {
    if (field === sortField) {
      // Toggle sort order if clicking the same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Default to descending for a new field
      setSortField(field);
      setSortOrder("desc");
    }
  };
  
  // Format duration
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} menit`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours} jam ${remainingMinutes} menit` 
        : `${hours} jam`;
    }
  };

  // Format date
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Load data on component mount and when dependencies change
  useEffect(() => {
    fetchEducations();
  }, [page, selectedCategory, sortField, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Konten Edukasi</h1>
        <Link href="/admin/education/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" /> Tambah Edukasi
          </Button>
        </Link>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Cari judul, deskripsi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 h-4 w-4" />
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Kategori</option>
              <option value="Pemasaran">Pemasaran</option>
              <option value="Keuangan">Keuangan</option>
              <option value="Produksi">Produksi</option>
              <option value="Teknologi">Teknologi</option>
            </select>
          </div>
          <Button type="submit">
            Cari
          </Button>
        </form>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {/* Education Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort("title")}
                  >
                    Judul
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort("category")}
                  >
                    Kategori
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort("date")}
                  >
                    Tanggal
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort("instructor")}
                  >
                    Instruktur
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    </div>
                  </td>
                </tr>
              ) : educations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data edukasi yang ditemukan
                  </td>
                </tr>
              ) : (
                educations.map((education) => (
                  <tr key={education._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {education.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {education.description.substring(0, 60)}
                        {education.description.length > 60 ? "..." : ""}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {education.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(education.date)}
                      <div className="text-xs text-gray-400">
                        {formatDuration(education.duration)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {typeof education.instructor === 'string' 
                        ? education.instructor || "-" 
                        : education.instructor?.name || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        education.isActive 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {education.isActive ? "Aktif" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/edukasi/${education._id}`} className="text-gray-600 hover:text-gray-900">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link href={`/admin/education/${education._id}/edit`} className="text-blue-600 hover:text-blue-900">
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button 
                          onClick={() => handleDeleteEducation(education._id, education.title)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 flex justify-between items-center border-t">
            <div className="text-sm text-gray-500">
              Menampilkan <span className="font-medium">{(page - 1) * limit + 1}</span> - <span className="font-medium">
                {Math.min(page * limit, totalItems)}
              </span> dari <span className="font-medium">{totalItems}</span> data
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setPage(page - 1)} 
                disabled={page === 1}
              >
                Sebelumnya
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setPage(page + 1)} 
                disabled={page === totalPages}
              >
                Berikutnya
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
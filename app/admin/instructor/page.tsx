"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Eye, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Instructor {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  bio: string;
  expertise: string[];
  image: string;
  isActive: boolean;
  createdAt: string;
}

export default function InstructorAdminPage() {
  // State
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 10;
  
  // Filter and search state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("");
  
  // Fetch instructors data
  const fetchInstructors = async () => {
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
      
      if (selectedExpertise) {
        queryParams.append("expertise", selectedExpertise);
      }
      
      const response = await fetch(`/api/instructor?${queryParams.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setInstructors(data.data);
        setTotalPages(data.totalPages);
        setTotalItems(data.total);
      } else {
        setError(data.message || "Terjadi kesalahan saat mengambil data instruktur");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghubungi server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete instructor
  const handleDeleteInstructor = async (id: string, name: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus instruktur "${name}"?`)) {
      return;
    }
    
    try {
      const response = await fetch(`/api/instructor/${id}`, {
        method: "DELETE",
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Re-fetch data after deletion
        fetchInstructors();
      } else {
        setError(data.message || "Gagal menghapus instruktur");
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
    fetchInstructors();
  };
  
  // Handle expertise filter
  const handleExpertiseChange = (expertise: string) => {
    setSelectedExpertise(expertise);
    setPage(1); // Reset page to 1 when filtering
  };
  
  // Load data on component mount and when dependencies change
  useEffect(() => {
    fetchInstructors();
  }, [page, selectedExpertise]);

  // Unique expertise list (for filter)
  const expertiseList = Array.from(new Set(
    instructors.flatMap(instructor => instructor.expertise)
  )).sort();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Instruktur</h1>
        <Link href="/admin/instructor/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" /> Tambah Instruktur
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
              placeholder="Cari nama, bio, keahlian..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 h-4 w-4" />
            <select
              value={selectedExpertise}
              onChange={(e) => handleExpertiseChange(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Keahlian</option>
              {expertiseList.map(expertise => (
                <option key={expertise} value={expertise}>
                  {expertise}
                </option>
              ))}
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
      
      {/* Instructor Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instruktur
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kontak
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Keahlian
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
                  <td colSpan={5} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    </div>
                  </td>
                </tr>
              ) : instructors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data instruktur yang ditemukan
                  </td>
                </tr>
              ) : (
                instructors.map((instructor) => (
                  <tr key={instructor._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative rounded-full overflow-hidden">
                          <Image 
                            src={instructor.image || "/placeholder-avatar.jpg"}
                            alt={instructor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{instructor.name}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{instructor.bio.substring(0, 60)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{instructor.email}</div>
                      <div className="text-sm text-gray-500">{instructor.phone || "-"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {instructor.expertise.map(skill => (
                          <span key={skill} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        instructor.isActive 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {instructor.isActive ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/instructor/${instructor._id}`} className="text-gray-600 hover:text-gray-900">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link href={`/admin/instructor/${instructor._id}/edit`} className="text-blue-600 hover:text-blue-900">
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button 
                          onClick={() => handleDeleteInstructor(instructor._id, instructor.name)}
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
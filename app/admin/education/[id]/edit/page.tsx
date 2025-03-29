"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";

// Import Editor dinamis (no SSR) untuk menghindari error hydration
const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), { 
  ssr: false,
  loading: () => <div className="border rounded-md p-4 h-64 bg-gray-50"></div>
});

interface EducationProps {
  params: {
    id: string;
  };
}

interface Education {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  duration: number;
  instructor: string;
  content: string;
  benefits: string[];
  target_audience: string;
  isActive: boolean;
}

export default function EditEducationPage({ params }: EducationProps) {
  const router = useRouter();
  const isNewEducation = params.id === "new";
  const pageTitle = isNewEducation ? "Tambah Edukasi Baru" : "Edit Edukasi";
  
  // State untuk form
  const [formData, setFormData] = useState<Partial<Education>>({
    title: "",
    description: "",
    image: "",
    category: "Pemasaran",
    date: new Date().toISOString().split('T')[0],
    duration: 30,
    instructor: "",
    content: "",
    benefits: [],
    target_audience: "",
    isActive: true
  });
  
  const [loading, setLoading] = useState(!isNewEducation);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Tambahkan state untuk mengelola input benefits
  const [newBenefit, setNewBenefit] = useState("");
  
  // Ambil data edukasi untuk edit
  useEffect(() => {
    if (!isNewEducation) {
      fetchEducationData();
    }
  }, [params.id]);
  
  const fetchEducationData = async () => {
    try {
      const response = await fetch(`/api/education/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        // Format tanggal untuk input date
        const formattedData = {
          ...data.data,
          date: new Date(data.data.date).toISOString().split('T')[0]
        };
        
        setFormData(formattedData);
      } else {
        setError("Gagal memuat data edukasi");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data dari server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle perubahan pada form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked
      });
    } else if (name === "duration") {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle perubahan konten rich text
  const handleContentChange = (content: string) => {
    setFormData({
      ...formData,
      content
    });
  };
  
  // Tambahkan handler untuk menambah benefit
  const handleAddBenefit = () => {
    if (!newBenefit.trim()) return;
    
    setFormData({
      ...formData,
      benefits: [...(formData.benefits || []), newBenefit.trim()]
    });
    
    setNewBenefit("");
  };
  
  // Tambahkan handler untuk menghapus benefit
  const handleRemoveBenefit = (index: number) => {
    const updatedBenefits = [...(formData.benefits || [])];
    updatedBenefits.splice(index, 1);
    
    setFormData({
      ...formData,
      benefits: updatedBenefits
    });
  };
  
  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      const url = isNewEducation 
        ? "/api/education" 
        : `/api/education/${params.id}`;
      
      const method = isNewEducation ? "POST" : "PUT";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Redirect ke halaman daftar edukasi setelah berhasil
        router.push("/admin/education");
      } else {
        setError(data.message || "Gagal menyimpan data edukasi");
        setSaving(false);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan data");
      console.error(err);
      setSaving(false);
    }
  };
  
  // Handle hapus edukasi
  const handleDelete = async () => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus edukasi ini?")) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`/api/education/${params.id}`, {
        method: "DELETE"
      });
      
      const data = await response.json();
      
      if (data.success) {
        router.push("/admin/education");
      } else {
        setError(data.message || "Gagal menghapus edukasi");
        setLoading(false);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus data");
      console.error(err);
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/education" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
        </div>
        
        {!isNewEducation && (
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={saving}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Hapus
          </Button>
        )}
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium">Judul</label>
              <Input
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                required
                placeholder="Masukkan judul edukasi"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium">Kategori</label>
              <select
                id="category"
                name="category"
                value={formData.category || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Pemasaran">Pemasaran</option>
                <option value="Keuangan">Keuangan</option>
                <option value="Produksi">Produksi</option>
                <option value="Teknologi">Teknologi</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="instructor" className="block mb-2 text-sm font-medium">Instruktur</label>
              <Input
                id="instructor"
                name="instructor"
                value={formData.instructor || ""}
                onChange={handleInputChange}
                required
                placeholder="Nama instruktur"
              />
            </div>
            
            <div>
              <label htmlFor="target_audience" className="block mb-2 text-sm font-medium">Target Peserta</label>
              <Textarea
                id="target_audience"
                name="target_audience"
                value={formData.target_audience || ""}
                onChange={handleInputChange}
                placeholder="Siapa yang cocok mengikuti edukasi ini?"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Manfaat</label>
              <div className="flex gap-2">
                <Input
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Tambahkan manfaat edukasi"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBenefit())}
                />
                <Button 
                  type="button" 
                  onClick={handleAddBenefit}
                  variant="outline"
                >
                  +
                </Button>
              </div>
              
              <div className="mt-2">
                {formData.benefits && formData.benefits.length > 0 ? (
                  <ul className="space-y-1">
                    {formData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">•</span>
                        <span className="flex-1">{benefit}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefit(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          &times;
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm mt-1">
                    Belum ada manfaat yang ditambahkan
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="image" className="block mb-2 text-sm font-medium">URL Gambar</label>
              <Input
                id="image"
                name="image"
                value={formData.image || ""}
                onChange={handleInputChange}
                placeholder="URL gambar edukasi"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block mb-2 text-sm font-medium">Tanggal</label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="duration" className="block mb-2 text-sm font-medium">Durasi (menit)</label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={formData.duration || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive || false}
                onChange={(e) => 
                  setFormData({
                    ...formData,
                    isActive: e.target.checked
                  })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <label htmlFor="isActive" className="ml-2 text-sm">
                Publikasikan (tampilkan di halaman edukasi)
              </label>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm font-medium">Deskripsi Singkat</label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleInputChange}
            rows={3}
            required
            placeholder="Deskripsi singkat yang akan ditampilkan di daftar edukasi"
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Konten</label>
          <RichTextEditor
            value={formData.content || ""}
            onChange={handleContentChange}
          />
        </div>
        
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            className="mr-2"
            onClick={() => router.push("/admin/education")}
            disabled={saving}
          >
            Batal
          </Button>
          <Button 
            type="submit" 
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 
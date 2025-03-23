"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Save, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";

interface InstructorForm {
  name: string;
  email: string;
  phone: string;
  bio: string;
  expertise: string[];
  image: string;
  social_media: {
    website: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  isActive: boolean;
}

export default function EditInstructorPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === "new";
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newExpertise, setNewExpertise] = useState("");
  
  // Form state
  const [formData, setFormData] = useState<InstructorForm>({
    name: "",
    email: "",
    phone: "",
    bio: "",
    expertise: [],
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    social_media: {
      website: "",
      linkedin: "",
      twitter: "",
      instagram: "",
    },
    isActive: true,
  });
  
  // Fetch instructor data if editing existing record
  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }
    
    const fetchInstructor = async () => {
      try {
        const response = await fetch(`/api/instructor/${params.id}`);
        const data = await response.json();
        
        if (data.success) {
          setFormData({
            name: data.data.name,
            email: data.data.email,
            phone: data.data.phone || "",
            bio: data.data.bio,
            expertise: data.data.expertise,
            image: data.data.image,
            social_media: {
              website: data.data.social_media?.website || "",
              linkedin: data.data.social_media?.linkedin || "",
              twitter: data.data.social_media?.twitter || "",
              instagram: data.data.social_media?.instagram || "",
            },
            isActive: data.data.isActive,
          });
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
    
    fetchInstructor();
  }, [isNew, params.id]);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith("social_media.")) {
      const socialKey = name.split(".")[1];
      setFormData({
        ...formData,
        social_media: {
          ...formData.social_media,
          [socialKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };
  
  // Add expertise
  const handleAddExpertise = () => {
    if (!newExpertise.trim()) return;
    
    if (!formData.expertise.includes(newExpertise.trim())) {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, newExpertise.trim()],
      });
    }
    
    setNewExpertise("");
  };
  
  // Remove expertise
  const handleRemoveExpertise = (skill: string) => {
    setFormData({
      ...formData,
      expertise: formData.expertise.filter(item => item !== skill),
    });
  };
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      const url = isNew
        ? "/api/instructor"
        : `/api/instructor/${params.id}`;
      
      const method = isNew ? "POST" : "PUT";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(
          isNew ? "Instruktur berhasil ditambahkan!" : "Instruktur berhasil diperbarui!"
        );
        router.push("/admin/instructor");
      } else {
        setError(data.message || "Terjadi kesalahan saat menyimpan data instruktur");
        toast.error(data.message || "Terjadi kesalahan saat menyimpan data instruktur");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghubungi server");
      console.error("Error saving instructor data:", err);
      toast.error("Terjadi kesalahan saat menyimpan data instruktur");
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/admin/instructor" className="mr-4">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              {isNew ? "Tambah Instruktur Baru" : "Edit Instruktur"}
            </h1>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => router.push("/admin/instructor")}
            >
              Batal
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700"
            >
              {saving ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                  Menyimpan...
                </div>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Simpan
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">Nama Instruktur <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="Masukkan nama instruktur"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="contoh@email.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+628123456789"
                  />
                </div>
                
                <div>
                  <Label htmlFor="bio">Biografi <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    maxLength={1000}
                    placeholder="Tuliskan biografi instruktur"
                    className="min-h-[120px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">URL Foto</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/gambar.jpg"
                  />
                  {formData.image && (
                    <div className="mt-2 relative h-32 w-32 rounded-lg overflow-hidden">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right column */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="expertise">Keahlian <span className="text-red-500">*</span></Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      id="expertise"
                      value={newExpertise}
                      onChange={(e) => setNewExpertise(e.target.value)}
                      placeholder="Tambahkan keahlian"
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddExpertise}
                      variant="outline"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.expertise.length === 0 ? (
                      <p className="text-sm text-gray-500">Belum ada keahlian yang ditambahkan</p>
                    ) : (
                      formData.expertise.map(skill => (
                        <div key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                          {skill}
                          <button 
                            type="button" 
                            onClick={() => handleRemoveExpertise(skill)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Media Sosial</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="social_media.website"
                        value={formData.social_media.website}
                        onChange={handleChange}
                        placeholder="https://website.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        name="social_media.linkedin"
                        value={formData.social_media.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        name="social_media.twitter"
                        value={formData.social_media.twitter}
                        onChange={handleChange}
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        name="social_media.instagram"
                        value={formData.social_media.instagram}
                        onChange={handleChange}
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="isActive" className="ml-2">Instruktur Aktif</Label>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 
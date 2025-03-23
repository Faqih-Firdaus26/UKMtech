import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, Phone, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IEducation } from "@/interfaces/IEducation";

// Interface for instructor data
interface IInstructor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  expertise: string[];
  image: string;
  social_media: {
    instagram?: string;
  };
  isActive: boolean;
}

// Interface for MongoDB education data with required _id
interface IMongoEducation extends IEducation {
  _id: string;
}

// Function to get instructor details by ID
async function getInstructorById(id: string): Promise<IInstructor | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/instructor/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch instructor");
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching instructor:", error);
    return null;
  }
}

// Function to get educations by instructor ID
async function getEducationsByInstructor(
  instructorId: string
): Promise<IMongoEducation[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/instructor/education?instructorId=${instructorId}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch educations");
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching educations:", error);
    return [];
  }
}

export default async function InstructorDetailPage({params}: {params: Promise<{ id: string }>}) {
  const resolvedParams = (await params).id;
  const instructor = await getInstructorById(resolvedParams);
  const educations = await getEducationsByInstructor(resolvedParams);

  if (!instructor) {
    return (
      <div className="container mx-auto mt-10 px-4">
        <h1 className="text-2xl font-bold text-center">
          Instruktur tidak ditemukan
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="mb-6">
        <Link href="/instructor">
          <Button variant="ghost" className="flex items-center gap-1">
            <ChevronLeft size={16} />
            Kembali ke Daftar Instruktur
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Instructor Image */}
        <div className="w-full md:w-1/3">
          <div className="relative rounded-lg overflow-hidden w-full aspect-square">
            <Image
              src={instructor.image || "/images/avatar-placeholder.jpg"}
              alt={instructor.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Instructor Details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{instructor.name}</h1>
          
          {/* Expertise */}
          <div className="flex flex-wrap gap-2 mb-4">
            {instructor.expertise.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
          
          {/* Bio */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Tentang Instruktur</h2>
            <p className="text-gray-700">{instructor.bio}</p>
          </div>
          
          {/* Contact Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Kontak</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{instructor.email}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{instructor.phone}</span>
              </div>
              
              {instructor.social_media?.instagram && (
                <div className="flex items-center gap-2">
                  <Instagram size={16} />
                  <a
                    href={`https://instagram.com/${instructor.social_media.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    @{instructor.social_media.instagram}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Instructor's Educations */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Konten Edukasi</h2>
        
        {educations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educations.map((education) => (
              <Link href={`/edukasi/${education._id}`} key={education._id}>
                <Card className="h-full transition-all hover:shadow-lg">
                  <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                    <Image
                      src={education.image || "/images/education-placeholder.jpg"}
                      alt={education.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                      {education.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {education.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Belum ada konten edukasi dari instruktur ini.
          </p>
        )}
      </div>
    </div>
  );
} 
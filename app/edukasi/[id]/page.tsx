import { notFound } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { connectToDatabase } from '@/lib/mongodb';
import Education from '@/models/Education';
import Instructor from '@/models/Instructor';
import mongoose from 'mongoose';

// Interface untuk dokumen dari MongoDB
interface MongoDocument {
  _id: mongoose.Types.ObjectId;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Menambahkan interface untuk data edukasi
export interface IEducation {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  duration: number;
  instructor?: string;
  instructorDetails?: {
    _id: string;
    name: string;
    image: string;
    expertise?: string[];
    bio?: string;
  } | null;
  content?: string;
  benefits?: string[];
  target_audience?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Fungsi untuk mendapatkan data edukasi dari database berdasarkan ID
async function getEducationById(id: string): Promise<IEducation | null> {
  try {
    await connectToDatabase();
    
    // Validasi format ID
    if (!id || id.length !== 24) {
      return null;
    }
    
    // Mencari data edukasi berdasarkan ID
    const education = await Education.findById(id).lean();
    
    if (!education) {
      return null;
    }
    
    // Type assertion untuk education document
    const educationDoc = education as unknown as MongoDocument;
    
    // Jika ada instruktur, dapatkan informasi tentang instruktur
    let instructorDetails = null;
    if (educationDoc.instructor) {
      try {
        const instructorData = await Instructor.findById(educationDoc.instructor).lean();
        if (instructorData) {
          // Type assertion untuk instructor document
          const instructorDoc = instructorData as unknown as MongoDocument;
          
          instructorDetails = {
            _id: instructorDoc._id.toString(),
            name: instructorDoc.name,
            image: instructorDoc.image,
            expertise: instructorDoc.expertise,
            bio: instructorDoc.bio
          };
        }
      } catch (err) {
        console.error(`Error fetching instructor for education ${id}:`, err);
      }
    }
    
    // Mengkonversi document MongoDB ke format yang sesuai dengan IEducation
    const formattedEducation: IEducation = {
      _id: educationDoc._id.toString(),
      title: educationDoc.title,
      description: educationDoc.description,
      image: educationDoc.image,
      category: educationDoc.category,
      date: educationDoc.date.toString(),
      duration: typeof educationDoc.duration === 'string' 
        ? parseInt(educationDoc.duration) 
        : educationDoc.duration,
      instructor: educationDoc.instructor ? educationDoc.instructor.toString() : undefined,
      instructorDetails: instructorDetails,
      content: educationDoc.content,
      benefits: educationDoc.benefits,
      target_audience: educationDoc.target_audience?.join(', ') || '',
      isActive: educationDoc.isActive,
      createdAt: educationDoc.createdAt,
      updatedAt: educationDoc.updatedAt
    };
    
    return formattedEducation;
  } catch (error) {
    console.error(`Error fetching education with ID ${id}:`, error);
    return null;
  }
}

// Fungsi untuk memformat durasi
function formatDuration(minutes: number | string): string {
  // Konversi ke number jika string
  const mins = typeof minutes === 'string' ? parseInt(minutes) : minutes;
  
  if (mins < 60) {
    return `${mins} menit`;
  } else {
    const hours = Math.floor(mins / 60);
    const remainingMinutes = mins % 60;
    return remainingMinutes > 0 
      ? `${hours} jam ${remainingMinutes} menit` 
      : `${hours} jam`;
  }
}

// Fungsi untuk memformat tanggal
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

export default async function EducationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const education = await getEducationById(resolvedParams.id);
  
  // Jika edukasi tidak ditemukan, tampilkan halaman 404
  if (!education) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link 
          href="/edukasi" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kembali ke Daftar Edukasi
        </Link>
        
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          {education.title}
        </h1>
        
        <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-4">
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {formatDate(education.date)}
          </div>
          
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {formatDuration(education.duration)}
          </div>
          
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            {education.category}
          </div>
          
          {education.instructor && (
            <div className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mr-2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {education.instructorDetails ? (
                <Link 
                  href={`/instructor/${education.instructorDetails._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {education.instructorDetails.name}
                </Link>
              ) : (
                <span>{education.instructor}</span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Featured Image */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden mb-8">
        <Image
          src={education.image || '/images/education-placeholder.jpg'}
          alt={education.title}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      
      {/* Tombol Pendaftaran */}
      <div className="mb-8 p-6 bg-ukm-primary/5 rounded-xl border border-ukm-primary/20">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Daftar Kelas Ini</h2>
        <p className="text-gray-700 mb-4">
          Dapatkan akses ke materi pembelajaran lengkap dan sertifikat kelulusan setelah menyelesaikan kursus.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={`/edukasi/${education._id}/daftar`}>
            <button className="px-6 py-3 bg-ukm-primary text-white font-medium rounded-lg hover:bg-ukm-primary/90 transition-colors w-full sm:w-auto">
              Daftar Sekarang
            </button>
          </Link>
          <button className="px-6 py-3 border border-ukm-primary text-ukm-primary font-medium rounded-lg hover:bg-ukm-primary/10 transition-colors w-full sm:w-auto">
            Lihat Demo Kelas
          </button>
        </div>
      </div>
      
      {/* Description */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Deskripsi</h2>
        <p className="text-gray-700">{education.description}</p>
      </div>
      
      {/* Benefits */}
      {education.benefits && education.benefits.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Manfaat</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {education.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Target Audience */}
      {education.target_audience && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Ditujukan Untuk</h2>
          <p className="text-gray-700">{education.target_audience}</p>
        </div>
      )}
      
      {/* Alur Pembelajaran */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Alur Pembelajaran</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ukm-primary text-white flex items-center justify-center font-semibold mr-4">
              1
            </div>
            <div>
              <h3 className="font-medium text-lg">Pengenalan</h3>
              <p className="text-gray-600">Memahami dasar-dasar dan konsep utama yang akan dipelajari dalam kursus ini.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ukm-primary text-white flex items-center justify-center font-semibold mr-4">
              2
            </div>
            <div>
              <h3 className="font-medium text-lg">Pembelajaran Inti</h3>
              <p className="text-gray-600">Mempelajari materi utama kursus melalui video tutorial dan materi praktis.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ukm-primary text-white flex items-center justify-center font-semibold mr-4">
              3
            </div>
            <div>
              <h3 className="font-medium text-lg">Praktik dan Proyek</h3>
              <p className="text-gray-600">Menerapkan pengetahuan melalui proyek nyata dan studi kasus yang relevan.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ukm-primary text-white flex items-center justify-center font-semibold mr-4">
              4
            </div>
            <div>
              <h3 className="font-medium text-lg">Evaluasi dan Sertifikasi</h3>
              <p className="text-gray-600">Menyelesaikan kuis dan ujian akhir untuk mendapatkan sertifikat kelulusan.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Instructor */}
      {education.instructorDetails && (
        <div className="mb-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Instruktur</h2>
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="flex-shrink-0">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
                <Image
                  src={education.instructorDetails.image || "/placeholder-avatar.jpg"}
                  alt={education.instructorDetails.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="flex-grow">
              <Link 
                href={`/instructor/${education.instructorDetails._id}`}
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                {education.instructorDetails.name}
              </Link>
              
              {education.instructorDetails.expertise && (
                <div className="flex flex-wrap gap-2 my-2">
                  {education.instructorDetails.expertise.slice(0, 3).map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {education.instructorDetails.expertise.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{education.instructorDetails.expertise.length - 3}
                    </span>
                  )}
                </div>
              )}
              
              {education.instructorDetails.bio && (
                <p className="text-gray-700 text-sm line-clamp-3">{education.instructorDetails.bio}</p>
              )}
              
              <Link 
                href={`/instructor/${education.instructorDetails._id}`}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
              >
                Lihat Profil Lengkap
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="ml-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: education.content || '' }} />
      </div>
      
      {/* Related Education - Coming Soon */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Edukasi Terkait</h2>
        <p className="text-gray-600">Fitur ini akan segera tersedia.</p>
      </div>
    </div>
  );
}
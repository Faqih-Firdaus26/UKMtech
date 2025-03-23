import Link from 'next/link';
import Image from 'next/image';
import { connectToDatabase } from '@/lib/mongodb';
import Instructor from '@/models/Instructor';
import mongoose from 'mongoose';

interface IInstructor {
  _id: string;
  name: string;
  bio: string;
  expertise: string[];
  image: string;
  isActive: boolean;
}

interface MongoDocument {
  _id: mongoose.Types.ObjectId;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Fungsi untuk mendapatkan semua instruktur aktif dari database
async function getInstructors(): Promise<IInstructor[]> {
  try {
    await connectToDatabase();
    
    // Mendapatkan instruktur yang aktif dan mengurutkan berdasarkan nama
    const instructors = await Instructor.find({ isActive: true })
      .sort({ name: 1 })
      .lean();
    
    return instructors.map((instructor) => {
      // Type assertion untuk instructor
      const instructorDoc = instructor as MongoDocument;
      
      return {
        _id: instructorDoc._id.toString(),
        name: instructorDoc.name,
        bio: instructorDoc.bio,
        expertise: instructorDoc.expertise,
        image: instructorDoc.image,
        isActive: instructorDoc.isActive
      };
    });
  } catch (error) {
    console.error('Error fetching instructors:', error);
    return [];
  }
}

export default async function InstructorsPage() {
  const instructors = await getInstructors();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Tim Instruktur UKMtech</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berkenalan dengan para ahli yang mendedikasikan pengetahuan dan pengalaman mereka untuk membantu UMKM Indonesia berkembang di era digital.
          </p>
        </div>
        
        {instructors.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">Belum ada instruktur yang terdaftar.</p>
            <Link 
              href="/edukasi" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Lihat Program Edukasi
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <Link 
                key={instructor._id} 
                href={`/instructor/${instructor._id}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
                  <div className="relative h-64">
                    <Image 
                      src={instructor.image || "/placeholder-avatar.jpg"} 
                      alt={instructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">
                      {instructor.name}
                    </h2>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {instructor.expertise.slice(0, 3).map(skill => (
                        <span 
                          key={skill} 
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {instructor.expertise.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{instructor.expertise.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 line-clamp-3 text-sm">
                      {instructor.bio}
                    </p>
                    
                    <div className="mt-4 text-blue-600 font-medium text-sm flex items-center">
                      Lihat Profil
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
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <Link 
            href="/edukasi" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
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
            Kembali ke Edukasi
          </Link>
        </div>
      </div>
    </div>
  );
} 
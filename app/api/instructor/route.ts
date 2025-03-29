import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb.js";
import Instructor from "@/models/Instructor.js";
import mongoose from "mongoose";

// Interface untuk dokumen instruktur dari MongoDB
interface InstructorDocument {
  _id: mongoose.Types.ObjectId;
  name: string;
  email?: string;
  phone?: string;
  image: string;
  bio?: string;
  expertise: string[];
  social_media?: {
    instagram?: string;
  };
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

// GET - Mendapatkan semua data instruktur
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Mendapatkan parameter query
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const expertise = searchParams.get("expertise") || "";
    
    // Menghitung skip untuk paginasi
    const skip = (page - 1) * limit;
    
    // Menyiapkan filter
    const filter: Record<string, unknown> = { isActive: true };
    if (expertise) {
      filter.expertise = expertise;
    }
    
    // Menghitung total
    const total = await Instructor.countDocuments(filter);
    
    // Mendapatkan data dengan paginasi dan sorting
    const instructors = await Instructor.find(filter)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Menghitung totalPages
    const totalPages = Math.ceil(total / limit);
    
    // Format data untuk response
    const formattedInstructors = instructors.map(instructor => {
      const instructorDoc = instructor as unknown as InstructorDocument;
      return {
        _id: instructorDoc._id.toString(),
        name: instructorDoc.name,
        email: instructorDoc.email,
        phone: instructorDoc.phone,
        image: instructorDoc.image,
        bio: instructorDoc.bio,
        expertise: instructorDoc.expertise,
        role: instructorDoc.expertise && instructorDoc.expertise.length > 0 
          ? instructorDoc.expertise[0] + " Specialist" 
          : "Konsultan",
        social_media: instructorDoc.social_media,
        isActive: instructorDoc.isActive,
        createdAt: instructorDoc.createdAt ? instructorDoc.createdAt.toISOString() : null,
        updatedAt: instructorDoc.updatedAt ? instructorDoc.updatedAt.toISOString() : null
      };
    });
    
    return NextResponse.json({
      success: true,
      count: formattedInstructors.length,
      total,
      page,
      totalPages,
      data: formattedInstructors,
    });
  } catch (error) {
    console.error("Error fetching instructors:", error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data instruktur";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

// POST - Menambahkan data instruktur baru
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Mengambil data dari request body
    const data = await request.json();
    
    // Validasi data
    if (!data.name || !data.email || !data.expertise || !data.image) {
      return NextResponse.json(
        { success: false, message: "Harap isi semua field yang diperlukan" },
        { status: 400 }
      );
    }
    
    // Membuat dokumen instruktur baru
    const instructor = await Instructor.create(data);
    
    return NextResponse.json({
      success: true,
      message: "Data instruktur berhasil ditambahkan",
      data: {
        ...instructor.toObject(),
        _id: instructor._id.toString(),
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating instructor:", error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat menambahkan data instruktur";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
} 
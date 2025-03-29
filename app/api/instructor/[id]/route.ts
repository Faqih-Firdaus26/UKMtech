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

// GET - Mendapatkan detail instruktur berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    await connectToDatabase();
    
    const id = await params;
    
    // Validasi ID
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID instruktur tidak ditemukan" },
        { status: 400 }
      );
    }
    
    // Mendapatkan data instruktur berdasarkan ID
    const instructor = await Instructor.findById(id).lean();
    
    if (!instructor) {
      return NextResponse.json(
        { success: false, message: "Instruktur tidak ditemukan" },
        { status: 404 }
      );
    }
    
    // Format data untuk response dengan type assertion
    const instructorData = instructor as unknown as InstructorDocument;
    const formattedInstructor = {
      _id: instructorData._id.toString(),
      name: instructorData.name,
      email: instructorData.email,
      phone: instructorData.phone,
      image: instructorData.image,
      bio: instructorData.bio,
      expertise: instructorData.expertise,
      role: instructorData.expertise && instructorData.expertise.length > 0 
        ? instructorData.expertise[0] + " Specialist" 
        : "Konsultan",
      social_media: instructorData.social_media,
      isActive: instructorData.isActive,
      createdAt: instructorData.createdAt ? instructorData.createdAt.toISOString() : null,
      updatedAt: instructorData.updatedAt ? instructorData.updatedAt.toISOString() : null
    };
    
    return NextResponse.json({
      success: true,
      data: formattedInstructor,
    });
  } catch (error) {
    console.error("Error fetching instructor:", error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data instruktur";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

// PUT - Memperbarui data instruktur berdasarkan ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    await connectToDatabase();
    
    const id = await params;
    
    // Validasi ID
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID instruktur tidak ditemukan" },
        { status: 400 }
      );
    }
    
    // Mengambil data dari request body
    const data = await request.json();
    
    // Memperbarui dokumen instruktur
    const instructor = await Instructor.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
    
    if (!instructor) {
      return NextResponse.json(
        { success: false, message: "Instruktur tidak ditemukan" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Data instruktur berhasil diperbarui",
      data: {
        ...instructor.toObject(),
        _id: instructor._id.toString(),
      },
    });
  } catch (error) {
    console.error("Error updating instructor:", error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat memperbarui data instruktur";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Menghapus data instruktur berdasarkan ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    await connectToDatabase();
    
    const id = await params;
    
    // Validasi ID
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID instruktur tidak ditemukan" },
        { status: 400 }
      );
    }
    
    // Menghapus dokumen instruktur
    const instructor = await Instructor.findByIdAndDelete(id);
    
    if (!instructor) {
      return NextResponse.json(
        { success: false, message: "Instruktur tidak ditemukan" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Data instruktur berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting instructor:", error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus data instruktur";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
} 
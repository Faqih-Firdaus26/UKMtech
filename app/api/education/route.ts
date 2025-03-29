import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Education from "@/models/Education";
import Instructor from "@/models/Instructor";
import mongoose from "mongoose";

// Tipe data untuk objek dokumen MongoDB
interface MongoDocument {
  _id: mongoose.Types.ObjectId;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// GET - Mendapatkan semua data edukasi dengan paginasi dan filter
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Mengambil parameter query
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category") || "";
    
    // Menghitung skip untuk paginasi
    const skip = (page - 1) * limit;
    
    // Menyiapkan filter
    const filter: Record<string, unknown> = { isActive: true };
    if (category) {
      filter.category = category;
    }
    
    // Menghitung total
    const total = await Education.countDocuments(filter);
    
    // Mendapatkan data dengan paginasi dan sorting
    const educations = await Education.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Menghitung totalPages
    const totalPages = Math.ceil(total / limit);
    
    // Mengambil data instruktur untuk semua edukasi
    const educationsWithInstructors = await Promise.all(
      educations.map(async (edu) => {
        // Type assertion untuk edu
        const eduDoc = edu as MongoDocument;
        
        let instructorData = null;
        if (eduDoc.instructor) {
          try {
            const instructor = await Instructor.findById(eduDoc.instructor)
              .select('_id name image expertise')
              .lean();
              
            // Type assertion untuk instructorData
            instructorData = instructor as MongoDocument;
          } catch (err) {
            console.error(`Error fetching instructor for education ${eduDoc._id}:`, err);
          }
        }
        
        return {
          ...eduDoc,
          _id: eduDoc._id.toString(),
          instructor: instructorData ? {
            _id: instructorData._id.toString(),
            name: instructorData.name,
            image: instructorData.image,
            expertise: instructorData.expertise
          } : undefined,
          createdAt: eduDoc.createdAt ? eduDoc.createdAt.toISOString() : null,
          updatedAt: eduDoc.updatedAt ? eduDoc.updatedAt.toISOString() : null
        };
      })
    );
    
    return NextResponse.json({
      success: true,
      count: educationsWithInstructors.length,
      total,
      page,
      totalPages,
      data: educationsWithInstructors,
    });
  } catch (error) {
    console.error("Error fetching educations:", error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data edukasi";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

// POST - Menambahkan data edukasi baru
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Mengambil data dari request body
    const data = await request.json();
    
    // Validasi data
    if (!data.title || !data.description || !data.category || !data.date || !data.duration || !data.instructor) {
      return NextResponse.json(
        { success: false, message: "Harap isi semua field yang diperlukan" },
        { status: 400 }
      );
    }
    
    // Membuat dokumen edukasi baru
    const education = await Education.create(data);
    
    return NextResponse.json({
      success: true,
      message: "Data edukasi berhasil ditambahkan",
      data: {
        ...education.toObject(),
        _id: education._id.toString(),
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating education:", error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat menambahkan data edukasi";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
} 
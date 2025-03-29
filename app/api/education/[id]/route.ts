/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Education from "@/models/Education";
import Instructor from "@/models/Instructor";
import mongoose from "mongoose";

// Tipe data untuk objek dokumen MongoDB
interface MongoDocument {
  _id: mongoose.Types.ObjectId;
  [key: string]: any;
}

// GET - Mendapatkan detail edukasi berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    await connectToDatabase();
    
    const { id } = (await params);
    
    // Validasi ID
    if (!id || id.length !== 24) {
      return NextResponse.json(
        { success: false, message: "ID edukasi tidak valid" },
        { status: 400 }
      );
    }
    
    // Mencari data edukasi berdasarkan ID
    const education = await Education.findById(id).lean();
    
    if (!education) {
      return NextResponse.json(
        { success: false, message: "Data edukasi tidak ditemukan" },
        { status: 404 }
      );
    }
    
    // Type assertion untuk objek education
    const educationDoc = education as MongoDocument;
    
    // Mendapatkan informasi instruktur jika ada
    let instructorData = null;
    if (educationDoc.instructor) {
      try {
        const instructor = await Instructor.findById(educationDoc.instructor).lean();
        if (instructor) {
          // Type assertion untuk objek instructor
          const instructorDoc = instructor as MongoDocument;
          
          instructorData = {
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
    
    return NextResponse.json({
      success: true,
      data: {
        ...educationDoc,
        _id: educationDoc._id.toString(),
        instructorDetails: instructorData
      },
    });
  } catch (error) {
    console.error(`Error fetching education with ID ${params}:`, error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data edukasi";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    await connectToDatabase();
    
    const { id } = (await params);
    
    // Validasi ID
    if (!id || id.length !== 24) {
      return NextResponse.json(
        { success: false, message: "ID edukasi tidak valid" },
        { status: 400 }
      );
    }
    
    // Mengambil data update dari request body
    const updateData = await request.json();
    
    // Mencari dan update data
    const updatedEducation = await Education.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();
    
    if (!updatedEducation) {
      return NextResponse.json(
        { success: false, message: "Data edukasi tidak ditemukan" },
        { status: 404 }
      );
    }
    
    // Type assertion
    const updatedDoc = updatedEducation as MongoDocument;
    
    return NextResponse.json({
      success: true,
      message: "Data edukasi berhasil diperbarui",
      data: {
        ...updatedDoc,
        _id: updatedDoc._id.toString(),
      },
    });
  } catch (error) {
    console.error(`Error updating education with ID ${params}:`, error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat memperbarui data edukasi";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Menghapus data edukasi berdasarkan ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    await connectToDatabase();
    
    const { id } = (await params);
    
    // Validasi ID
    if (!id || id.length !== 24) {
      return NextResponse.json(
        { success: false, message: "ID edukasi tidak valid" },
        { status: 400 }
      );
    }
    
    // Menghapus data
    const deletedEducation = await Education.findByIdAndDelete(id).lean();
    
    if (!deletedEducation) {
      return NextResponse.json(
        { success: false, message: "Data edukasi tidak ditemukan" },
        { status: 404 }
      );
    }
    
    // Type assertion
    const deletedDoc = deletedEducation as MongoDocument;
    
    return NextResponse.json({
      success: true,
      message: "Data edukasi berhasil dihapus",
      data: {
        ...deletedDoc,
        _id: deletedDoc._id.toString(),
      },
    });
  } catch (error) {
    console.error(`Error deleting education with ID ${params}:`, error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus data edukasi";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
} 
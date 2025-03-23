import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Education from "@/models/Education";

// GET - Mendapatkan semua edukasi yang dibawakan oleh instruktur tertentu
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    // Validasi ID
    if (!id || id.length !== 24) {
      return NextResponse.json(
        { success: false, message: "ID instruktur tidak valid" },
        { status: 400 }
      );
    }
    
    // Mengambil parameter query
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "5");
    
    // Mencari edukasi berdasarkan instruktur ID
    const educations = await Education.find({ 
      instructor: id,
      isActive: true 
    })
      .sort({ date: -1 })
      .limit(limit)
      .lean();
    
    return NextResponse.json({
      success: true,
      count: educations.length,
      data: educations.map(edu => ({
        ...edu,
        _id: edu._id?.toString(),
      })),
    });
  } catch (error) {
    console.error(`Error fetching educations for instructor ${params}:`, error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data edukasi";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Education from "@/models/Education";

// Definisi tipe untuk hasil Mongoose
interface MongooseDocument {
  _id: {
    toString(): string;
  };
  __v: number;
  [key: string]: unknown;
}

// GET - Mendapatkan daftar edukasi berdasarkan instruktur
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Mengambil ID instruktur dari query string
    const searchParams = request.nextUrl.searchParams;
    const instructorId = searchParams.get("instructorId");
    
    // Validasi ID instruktur
    if (!instructorId || instructorId.length !== 24) {
      return NextResponse.json(
        { success: false, message: "ID instruktur tidak valid" },
        { status: 400 }
      );
    }
    
    // Mencari data edukasi berdasarkan ID instruktur
    const educations = await Education.find({ instructor: instructorId }).lean();
    
    // Mengubah format _id menjadi string
    const formattedEducations = educations.map((edu) => ({
      ...edu,
      _id: (edu as MongooseDocument)._id.toString(),
    }));
    
    return NextResponse.json({
      success: true,
      data: formattedEducations,
    });
  } catch (error) {
    console.error("Error fetching educations by instructor:", error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data edukasi";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
} 
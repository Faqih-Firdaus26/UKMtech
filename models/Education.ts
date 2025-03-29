import mongoose, { Schema, Document } from "mongoose";

export interface IEducation extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  duration: number;
  instructor: string;
  content?: string;
  benefits?: string[];
  target_audience?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Judul diperlukan"],
      maxlength: [100, "Judul tidak boleh lebih dari 100 karakter"],
    },
    description: {
      type: String,
      required: [true, "Deskripsi diperlukan"],
      maxlength: [500, "Deskripsi tidak boleh lebih dari 500 karakter"],
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80",
    },
    category: {
      type: String,
      required: [true, "Kategori diperlukan"],
      maxlength: [50, "Kategori tidak boleh lebih dari 50 karakter"],
    },
    date: {
      type: String,
      required: [true, "Tanggal diperlukan"],
    },
    duration: {
      type: Number,
      required: [true, "Durasi diperlukan"],
    },
    instructor: {
      type: String,
      required: [true, "Nama instruktur diperlukan"],
      maxlength: [100, "Nama instruktur tidak boleh lebih dari 100 karakter"],
    },
    content: {
      type: String,
      default: "",
    },
    benefits: {
      type: [String],
      default: [],
    },
    target_audience: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hindari kompilasi model berulang saat hot-reloading
export default mongoose.models.Education || mongoose.model<IEducation>("Education", EducationSchema); 
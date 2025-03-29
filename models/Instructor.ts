import mongoose, { Schema, Document } from "mongoose";

export interface IInstructor extends Document {
  name: string;
  email: string;
  phone?: string;
  bio: string;
  expertise: string[];
  image: string;
  social_media?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InstructorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Nama instruktur diperlukan"],
      maxlength: [100, "Nama tidak boleh lebih dari 100 karakter"],
    },
    email: {
      type: String,
      required: [true, "Email diperlukan"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Format email tidak valid",
      ],
    },
    phone: {
      type: String,
      validate: {
        validator: function(v: string) {
          return /^(\+62|62|0)[0-9]{9,12}$/.test(v);
        },
        message: "Format nomor telepon tidak valid"
      }
    },
    bio: {
      type: String,
      required: [true, "Biografi diperlukan"],
      maxlength: [1000, "Biografi tidak boleh lebih dari 1000 karakter"],
    },
    expertise: {
      type: [String],
      required: [true, "Keahlian diperlukan"],
      validate: [
        (val: string[]) => val.length > 0, 
        "Setidaknya satu keahlian harus diisi"
      ],
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
    social_media: {
      website: String,
      linkedin: String,
      twitter: String,
      instagram: String,
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
export default mongoose.models.Instructor || mongoose.model<IInstructor>("Instructor", InstructorSchema); 
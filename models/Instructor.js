import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    required: true
  },
  expertise: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  social_media: {
    website: String,
    linkedin: String,
    twitter: String,
    instagram: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Cek apakah model sudah ada untuk mencegah error "Cannot overwrite model once compiled"
const Instructor = mongoose.models.Instructor || mongoose.model('Instructor', instructorSchema);

export default Instructor; 
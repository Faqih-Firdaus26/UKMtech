import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/800x400'
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // dalam menit
    default: 60
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  benefits: [{
    type: String,
    trim: true
  }],
  target_audience: {
    type: String
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
const Education = mongoose.models.Education || mongoose.model('Education', educationSchema);

export default Education; 
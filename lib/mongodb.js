import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables dari .env.local
dotenv.config({ path: '.env.local' });

// Koneksi URL MongoDB dari environment variable
const MONGODB_URI = process.env.MONGODB_URI;

console.log('MongoDB URI:', MONGODB_URI);

// Mencegah warning dari Mongoose
mongoose.set('strictQuery', false);

// Fungsi untuk koneksi ke MongoDB
export async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log('Menggunakan koneksi MongoDB yang sudah ada');
      return mongoose.connection;
    }
    
    console.log('Menghubungkan ke MongoDB...');
    return await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('Gagal terhubung ke MongoDB:', error.message);
    throw error;
  }
}

// Export fungsi untuk mendapatkan koneksi MongoDB
export async function getMongoConnection() {
  return await connectToDatabase();
}

export default { connectToDatabase, getMongoConnection }; 
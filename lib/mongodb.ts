import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ukmtech';

// Variabel untuk menyimpan status koneksi
let isConnected = false;

/**
 * Fungsi untuk terhubung ke MongoDB
 */
export async function connectToDatabase() {
  // Cek jika sudah terhubung
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('MongoDB terhubung');
  } catch (error) {
    console.error('Gagal terhubung ke MongoDB:', error);
    throw error;
  }
} 
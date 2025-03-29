import { seedDatabase } from '../lib/db-seeder.js';
import mongoose from 'mongoose';

console.log('Memulai proses seeding database...');

seedDatabase()
  .then(() => {
    console.log('Seeding selesai, menutup koneksi...');
    mongoose.connection.close();
    console.log('Koneksi database ditutup, proses selesai.');
  })
  .catch(error => {
    console.error('Gagal melakukan seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }); 
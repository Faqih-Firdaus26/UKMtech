import { connectToDatabase } from './mongodb.js';
import seedData from './seed-data.js';
import mongoose from 'mongoose';

// Fungsi untuk mengimpor model yang benar
const importModel = async (modelName) => {
  try {
    // Coba import dari models/ folder
    const moduleImport = await import(`../models/${modelName}.js`);
    return moduleImport.default;
  } catch (error) {
    console.error(`Error loading model ${modelName}:`, error);
    throw new Error(`Could not find model: ${modelName}`);
  }
};

// Fungsi utama seeder
export async function seedDatabase() {
  try {
    // Koneksi ke MongoDB
    await connectToDatabase();
    console.log('Terhubung ke database MongoDB...');
    
    // Load models
    console.log('Loading models...');
    const Instructor = await importModel('Instructor');
    const Education = await importModel('Education');
    
    // Hapus data yang ada (opsional)
    console.log('Menghapus data yang sudah ada...');
    await Instructor.deleteMany({});
    await Education.deleteMany({});
    
    // Masukkan data instruktur
    console.log('Memasukkan data instruktur...');
    const instructorPromises = seedData.instructors.map(instructor => {
      const newInstructor = new Instructor(instructor);
      return newInstructor.save();
    });
    
    const savedInstructors = await Promise.all(instructorPromises);
    console.log(`Berhasil memasukkan ${savedInstructors.length} instruktur`);
    
    // Siapkan mapping untuk ID instruktur
    const instructorIdMap = {};
    savedInstructors.forEach((instructor, index) => {
      instructorIdMap[`instructorId${index + 1}`] = instructor._id.toString();
    });
    
    // Masukkan data edukasi dengan ID instruktur yang benar
    console.log('Memasukkan data edukasi...');
    const educationPromises = seedData.educations.map(education => {
      // Ganti placeholder ID dengan ID instruktur yang sebenarnya
      if (education.instructor && instructorIdMap[education.instructor]) {
        education.instructor = instructorIdMap[education.instructor];
      }
      
      const newEducation = new Education(education);
      return newEducation.save();
    });
    
    const savedEducations = await Promise.all(educationPromises);
    console.log(`Berhasil memasukkan ${savedEducations.length} edukasi`);
    
    console.log('Seeding database selesai!');
    
    // Tampilkan data yang telah dimasukkan
    console.log('\nData instruktur yang dimasukkan:');
    savedInstructors.forEach((instructor, index) => {
      console.log(`${index + 1}. ${instructor.name} (ID: ${instructor._id})`);
    });
    
    console.log('\nData edukasi yang dimasukkan:');
    savedEducations.forEach((education, index) => {
      console.log(`${index + 1}. ${education.title} (ID: ${education._id})`);
    });
    
    return { instructors: savedInstructors, educations: savedEducations };
  } catch (error) {
    console.error('Terjadi kesalahan saat seeding database:', error);
    throw error;
  } finally {
    // Tutup koneksi dengan database setelah selesai
    // await mongoose.connection.close();
    // console.log('Koneksi database ditutup');
  }
}

// Jalankan seeder dari command line
if (process.argv[1] === import.meta.url) {
  seedDatabase()
    .then(() => {
      console.log('Seeding selesai, tutup koneksi...');
      mongoose.connection.close();
    })
    .catch(error => {
      console.error('Gagal melakukan seeding database:', error);
      process.exit(1);
    });
}

export default seedDatabase; 
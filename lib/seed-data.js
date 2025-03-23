// Data dummy untuk instruktur
const instructors = [
  {
    name: "Dr. Budi Santoso",
    email: "budi.santoso@ukmtech.id",
    phone: "+6281234567890",
    bio: "Dr. Budi Santoso adalah seorang pakar strategi bisnis dengan pengalaman lebih dari 15 tahun membantu UKM di Indonesia. Beliau meraih gelar doktor di bidang manajemen bisnis dari Universitas Indonesia dan telah menerbitkan beberapa buku tentang pengembangan UKM di era digital.",
    expertise: ["Strategi Bisnis", "Manajemen Keuangan", "Perencanaan Strategis", "Business Model Canvas"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    social_media: {
      website: "https://budisantoso.com",
      linkedin: "budisantoso",
      twitter: "budisantoso",
      instagram: "drbudi.santoso",
    },
    isActive: true
  },
  {
    name: "Siti Rahma, M.M.",
    email: "siti.rahma@ukmtech.id",
    phone: "+6282345678901",
    bio: "Siti Rahma adalah pakar digital marketing dengan pengalaman lebih dari 10 tahun menangani kampanye pemasaran digital untuk berbagai UKM di Indonesia. Spesialisasi beliau meliputi strategi media sosial, content marketing, dan analisis data pemasaran.",
    expertise: ["Digital Marketing", "Media Sosial", "Content Marketing", "SEO", "SEM"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    social_media: {
      website: "https://sitirahma.id",
      linkedin: "sitirahma",
      twitter: "sitirahma_mm",
      instagram: "siti.rahma.id",
    },
    isActive: true
  },
  {
    name: "Ahmad Wijaya",
    email: "ahmad.wijaya@ukmtech.id",
    phone: "+6283456789012",
    bio: "Ahmad Wijaya adalah konsultan e-commerce dengan pengalaman mendampingi lebih dari 100 UKM untuk mengembangkan kehadiran online mereka. Keahlian utamanya meliputi optimasi marketplace, pengembangan toko online, dan integrasi sistem pembayaran digital.",
    expertise: ["E-commerce", "Marketplace", "Manajemen Produk", "Optimasi Konversi"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    social_media: {
      website: "https://ahmadwijaya.com",
      linkedin: "ahmadwijaya",
      twitter: "ahmad_wijaya",
      instagram: "ahmad.wijaya",
    },
    isActive: true
  },
  {
    name: "Dewi Lestari",
    email: "dewi.lestari@ukmtech.id",
    phone: "+6284567890123",
    bio: "Dewi Lestari adalah pakar keuangan UKM dengan lebih dari 12 tahun pengalaman di industri perbankan dan fintech. Beliau membantu UKM dalam merencanakan keuangan, mengakses pembiayaan, dan mengembangkan strategi finansial yang berkelanjutan.",
    expertise: ["Keuangan UKM", "Akses Permodalan", "Perencanaan Pajak", "Manajemen Cashflow"],
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    social_media: {
      website: "https://dewilestari.id",
      linkedin: "dewilestari",
      twitter: "dewi_lestari",
      instagram: "dewi.lestari.finance",
    },
    isActive: true
  },
  {
    name: "Eko Purnomo",
    email: "eko.purnomo@ukmtech.id",
    phone: "+6285678901234",
    bio: "Eko Purnomo adalah ahli teknologi informasi dengan fokus pada transformasi digital untuk UKM. Dengan pengalaman 14 tahun di bidang IT, beliau membantu UKM dalam menerapkan teknologi yang tepat untuk meningkatkan efisiensi operasional dan daya saing.",
    expertise: ["Transformasi Digital", "Sistem Informasi", "Cloud Computing", "Automasi Bisnis"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    social_media: {
      website: "https://ekopurnomo.tech",
      linkedin: "ekopurnomo",
      twitter: "eko_tech",
      instagram: "eko.purnomo",
    },
    isActive: true
  }
];

// Data dummy untuk edukasi
const educations = [
  {
    title: "Strategi Pemasaran Digital untuk UKM Pemula",
    description: "Kursus komprehensif tentang strategi pemasaran digital khusus untuk UKM yang baru memulai perjalanan online. Materi mencakup dasar-dasar media sosial, content marketing, dan analisis data sederhana.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Pemasaran",
    date: "2024-05-15",
    duration: 120,
    instructor: "instructorId2", // ID Siti Rahma akan diisi saat implementasi seeder
    content: "Kursus ini didesain khusus untuk pengusaha UKM yang ingin memulai perjalanan digital marketing namun belum memiliki pengalaman yang memadai. Materi disusun secara bertahap, mulai dari pengenalan konsep dasar hingga implementasi praktis.\n\n## Materi yang Dipelajari:\n\n1. Dasar-dasar marketing digital untuk UKM\n2. Membangun kehadiran online yang efektif\n3. Strategi content marketing untuk budget terbatas\n4. Mengoptimalkan media sosial untuk bisnis kecil\n5. Analisis data sederhana untuk mengukur keberhasilan\n\nPeserta akan mendapatkan template dan tools praktis yang dapat langsung diimplementasikan dalam bisnis mereka.",
    benefits: [
      "Memahami dasar-dasar marketing digital yang relevan untuk UKM",
      "Mampu membuat dan mengelola kampanye media sosial sederhana",
      "Dapat menghasilkan konten yang menarik dengan budget terbatas",
      "Menguasai tools marketing digital gratis untuk UKM",
      "Mendapatkan template marketing plan yang bisa langsung dipakai"
    ],
    target_audience: "UKM pemula yang ingin memulai pemasaran digital dengan budget terbatas",
    isActive: true
  },
  {
    title: "Manajemen Keuangan Efektif untuk UKM",
    description: "Kursus ini mengajarkan dasar-dasar manajemen keuangan yang krusial untuk keberlangsungan UKM, meliputi pengelolaan cashflow, budgeting, dan perencanaan keuangan jangka panjang.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Keuangan",
    date: "2024-05-20",
    duration: 180,
    instructor: "instructorId4", // ID Dewi Lestari akan diisi saat implementasi seeder
    content: "Kursus ini fokus pada aspek keuangan yang sering menjadi tantangan bagi UKM di Indonesia. Materi disusun berdasarkan pengalaman nyata mendampingi ratusan UKM dengan masalah keuangan yang beragam.\n\n## Materi yang Dipelajari:\n\n1. Prinsip dasar keuangan bisnis untuk non-finansial\n2. Teknik pengelolaan cashflow untuk bisnis kecil\n3. Penyusunan budget dan perencanaan keuangan\n4. Strategi pendanaan dan akses modal untuk UKM\n5. Pengelolaan pajak dan kepatuhan keuangan\n\nPeserta akan mendapatkan template Excel untuk manajemen keuangan yang telah disesuaikan untuk kebutuhan UKM Indonesia.",
    benefits: [
      "Mampu mengelola cashflow bisnis secara efektif",
      "Dapat menyusun laporan keuangan sederhana namun informatif",
      "Memahami strategi pendanaan yang tepat untuk tahap bisnis",
      "Menguasai teknik budgeting untuk pertumbuhan bisnis",
      "Mendapatkan template Excel untuk manajemen keuangan UKM"
    ],
    target_audience: "Pemilik UKM yang ingin meningkatkan kemampuan manajemen keuangan",
    isActive: true
  },
  {
    title: "Mengoptimalkan Toko Online di Marketplace",
    description: "Kursus mendalam tentang strategi memenangkan persaingan di berbagai marketplace Indonesia, termasuk optimasi listing produk, fotografi produk, dan strategi pricing.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "E-commerce",
    date: "2024-05-25",
    duration: 150,
    instructor: "instructorId3", // ID Ahmad Wijaya akan diisi saat implementasi seeder
    content: "Kursus ini dirancang untuk membantu UKM yang sudah memiliki toko online di marketplace namun belum optimal dalam performa penjualan. Fokus pada teknik-teknik praktis yang telah terbukti efektif di marketplace Indonesia.\n\n## Materi yang Dipelajari:\n\n1. Strategi optimasi toko dan produk di marketplace lokal\n2. Teknik fotografi produk profesional dengan budget terbatas\n3. Copywriting yang menjual untuk deskripsi produk\n4. Strategi pricing dan promo yang menguntungkan\n5. Manajemen inventori dan order yang efisien\n\nPeserta akan mendapatkan checklist optimasi toko online dan template SOP untuk operasional e-commerce.",
    benefits: [
      "Mampu mengoptimalkan listing produk agar lebih mudah ditemukan",
      "Dapat menghasilkan foto produk profesional dengan peralatan sederhana",
      "Menguasai teknik copywriting untuk meningkatkan konversi",
      "Memahami strategi pricing dan promosi yang efektif",
      "Mendapatkan template SOP untuk operasional e-commerce"
    ],
    target_audience: "Pemilik UKM yang sudah memiliki toko online di marketplace namun ingin meningkatkan penjualan",
    isActive: true
  },
  {
    title: "Business Model Canvas untuk Inovasi UKM",
    description: "Kursus praktis tentang penggunaan Business Model Canvas untuk menganalisis dan mengembangkan model bisnis UKM yang lebih inovatif dan kompetitif.",
    image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Strategi Bisnis",
    date: "2024-06-01",
    duration: 180,
    instructor: "instructorId1", // ID Dr. Budi Santoso akan diisi saat implementasi seeder
    content: "Kursus ini mengajarkan penggunaan Business Model Canvas (BMC) sebagai alat untuk menganalisis, mengevaluasi, dan menginovasi model bisnis UKM. Materi disusun berdasarkan studi kasus nyata dari UKM Indonesia yang berhasil bertransformasi.\n\n## Materi yang Dipelajari:\n\n1. Pengenalan dan komponen Business Model Canvas\n2. Analisis model bisnis saat ini menggunakan BMC\n3. Identifikasi peluang inovasi dalam setiap blok BMC\n4. Merancang model bisnis baru yang lebih kompetitif\n5. Implementasi dan eksekusi perubahan model bisnis\n\nPeserta akan mendapatkan template BMC dan panduan workshop untuk diterapkan dalam tim internal.",
    benefits: [
      "Mampu menganalisis model bisnis saat ini secara terstruktur",
      "Dapat mengidentifikasi peluang inovasi dalam bisnis",
      "Menguasai teknik merancang model bisnis yang lebih kompetitif",
      "Memahami strategi implementasi perubahan model bisnis",
      "Mendapatkan template BMC dan panduan workshop"
    ],
    target_audience: "Pemilik UKM yang ingin mengevaluasi dan mengembangkan model bisnis mereka",
    isActive: true
  },
  {
    title: "Transformasi Digital untuk UKM",
    description: "Kursus komprehensif tentang penerapan teknologi digital untuk meningkatkan efisiensi dan daya saing UKM, dengan fokus pada solusi terjangkau dan praktis.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Teknologi",
    date: "2024-06-10",
    duration: 150,
    instructor: "instructorId5", // ID Eko Purnomo akan diisi saat implementasi seeder
    content: "Kursus ini membantu UKM memahami dan menerapkan transformasi digital dengan pendekatan yang realistis dan sesuai kebutuhan bisnis kecil menengah. Fokus pada solusi praktis yang terjangkau namun efektif.\n\n## Materi yang Dipelajari:\n\n1. Assessment kesiapan digital untuk UKM\n2. Pemetaan proses bisnis untuk digitalisasi\n3. Pemilihan teknologi yang tepat sesuai kebutuhan dan budget\n4. Implementasi sistem digital secara bertahap\n5. Mengukur ROI dari investasi teknologi\n\nPeserta akan mendapatkan template assessment digital readiness dan roadmap transformasi digital.",
    benefits: [
      "Mampu mengidentifikasi area bisnis yang paling membutuhkan digitalisasi",
      "Dapat memilih teknologi yang tepat sesuai kebutuhan dan budget",
      "Menguasai teknik implementasi sistem digital secara efektif",
      "Memahami cara mengukur dampak teknologi terhadap bisnis",
      "Mendapatkan template assessment dan roadmap transformasi digital"
    ],
    target_audience: "Pemilik UKM yang ingin menerapkan teknologi digital dalam bisnis mereka",
    isActive: true
  },
  {
    title: "Content Marketing yang Efektif untuk UKM",
    description: "Kursus praktis tentang strategi content marketing yang efektif namun terjangkau untuk UKM, termasuk teknik storytelling, content plan, dan distribusi konten.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Pemasaran",
    date: "2024-06-15",
    duration: 120,
    instructor: "instructorId2", // ID Siti Rahma akan diisi saat implementasi seeder
    content: "Kursus ini mengajarkan strategi content marketing yang terbukti efektif khususnya untuk UKM dengan sumber daya terbatas. Pendekatan praktis dengan contoh-contoh nyata dari berbagai industri.\n\n## Materi yang Dipelajari:\n\n1. Dasar-dasar content marketing untuk UKM\n2. Teknik storytelling yang menarik dan autentik\n3. Perencanaan dan produksi konten dengan budget terbatas\n4. Strategi distribusi konten multi-channel\n5. Analisis performa dan optimasi content marketing\n\nPeserta akan mendapatkan template content calendar dan bank ide konten untuk berbagai industri.",
    benefits: [
      "Mampu merancang strategi content yang relevan dengan audiens",
      "Dapat memproduksi konten berkualitas dengan sumber daya terbatas",
      "Menguasai teknik storytelling yang menarik untuk brand UKM",
      "Memahami cara mengoptimalkan distribusi konten",
      "Mendapatkan template content calendar dan bank ide konten"
    ],
    target_audience: "Pemilik UKM atau staf marketing yang ingin meningkatkan strategi content marketing",
    isActive: true
  },
  {
    title: "Strategi Pendanaan untuk Pertumbuhan UKM",
    description: "Kursus mendalam tentang berbagai opsi pendanaan yang tersedia untuk UKM di Indonesia, meliputi pinjaman bank, peer-to-peer lending, investor, hingga crowdfunding.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Keuangan",
    date: "2024-06-20",
    duration: 150,
    instructor: "instructorId4", // ID Dewi Lestari akan diisi saat implementasi seeder
    content: "Kursus ini membahas berbagai opsi pendanaan yang tersedia untuk UKM di Indonesia serta strategi untuk memilih dan mengakses pendanaan yang paling sesuai dengan kebutuhan bisnis.\n\n## Materi yang Dipelajari:\n\n1. Pemetaan kebutuhan pendanaan berdasarkan tahapan bisnis\n2. Opsi pendanaan konvensional (bank, koperasi, lembaga pembiayaan)\n3. Alternatif pendanaan modern (P2P lending, equity crowdfunding, angel investor)\n4. Teknik menyusun proposal pendanaan yang menarik\n5. Strategi negosiasi dengan pemberi dana\n\nPeserta akan mendapatkan template financial projection dan proposal pendanaan.",
    benefits: [
      "Mampu mengidentifikasi jenis pendanaan yang paling sesuai",
      "Dapat menyusun proposal pendanaan yang profesional",
      "Menguasai teknik mempresentasikan bisnis kepada calon investor",
      "Memahami aspek hukum dari berbagai jenis pendanaan",
      "Mendapatkan template financial projection dan proposal pendanaan"
    ],
    target_audience: "Pemilik UKM yang sedang mencari pendanaan untuk ekspansi bisnis",
    isActive: true
  },
  {
    title: "Optimasi SEO untuk Website UKM",
    description: "Kursus praktis tentang teknik SEO (Search Engine Optimization) untuk meningkatkan visibilitas website UKM di mesin pencari, dengan fokus pada strategi lokal dan keyword yang relevan.",
    image: "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Pemasaran",
    date: "2024-06-25",
    duration: 180,
    instructor: "instructorId2", // ID Siti Rahma akan diisi saat implementasi seeder
    content: "Kursus ini dirancang untuk membantu UKM mengoptimalkan website mereka agar lebih mudah ditemukan di mesin pencari. Fokus pada teknik SEO yang praktis dan relevan untuk pasar Indonesia.\n\n## Materi yang Dipelajari:\n\n1. Dasar-dasar SEO untuk website bisnis\n2. Riset keyword yang relevan dengan produk/jasa UKM\n3. Teknik optimasi on-page dan off-page\n4. Strategi SEO lokal untuk bisnis dengan target pasar spesifik\n5. Monitoring dan analisis performa SEO\n\nPeserta akan mendapatkan checklist SEO dan akses ke tools analisis keyword gratis.",
    benefits: [
      "Mampu melakukan riset keyword yang relevan dengan bisnis",
      "Dapat mengoptimalkan konten website untuk mesin pencari",
      "Menguasai teknik SEO lokal untuk target pasar spesifik",
      "Memahami cara menganalisis dan meningkatkan performa SEO",
      "Mendapatkan checklist SEO dan akses ke tools analisis"
    ],
    target_audience: "Pemilik UKM atau staf marketing yang ingin meningkatkan visibilitas online",
    isActive: true
  },
  {
    title: "Pengembangan Tim dan Kepemimpinan untuk UKM",
    description: "Kursus komprehensif tentang teknik pengembangan tim dan kepemimpinan yang efektif dalam konteks UKM, dengan fokus pada rekrutmen, motivasi, dan retensi karyawan.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Kepemimpinan",
    date: "2024-06-30",
    duration: 150,
    instructor: "instructorId1", // ID Dr. Budi Santoso akan diisi saat implementasi seeder
    content: "Kursus ini fokus pada aspek manajemen tim yang sering menjadi tantangan bagi UKM dalam menarik dan mempertahankan talenta terbaik. Materi mencakup strategi praktis yang dapat diterapkan oleh UKM dengan budget SDM terbatas.\n\n## Materi yang Dipelajari:\n\n1. Strategi rekrutmen efektif untuk UKM\n2. Teknik onboarding dan pengembangan karyawan\n3. Membangun budaya kerja positif dengan sumber daya terbatas\n4. Kepemimpinan efektif dalam konteks bisnis kecil menengah\n5. Strategi retensi karyawan tanpa bergantung pada gaji tinggi\n\nPeserta akan mendapatkan template penilaian kinerja dan program pengembangan karyawan.",
    benefits: [
      "Mampu merekrut kandidat berkualitas meski bukan perusahaan besar",
      "Dapat mengembangkan karyawan dengan program pelatihan terjangkau",
      "Menguasai teknik membangun budaya kerja positif",
      "Memahami cara memimpin tim kecil secara efektif",
      "Mendapatkan template penilaian kinerja dan program pengembangan"
    ],
    target_audience: "Pemilik UKM atau manajer yang ingin meningkatkan kemampuan mengelola tim",
    isActive: true
  }
];

// Export data untuk digunakan dalam script seeder
export { instructors, educations };
export default { instructors, educations }; 
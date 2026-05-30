// data/projects.ts

export interface ProjectItem {
  id: number;
  title: string;
  category: 'Logo' | 'Flyer Digital' | 'Spanduk' | 'Sertifikat' | 'Twibbon' | 'Animasi';
  shortDesc: string;
  fullDesc: string;
  image: string;
  span: string;  // Untuk mengatur ukuran kotak di Bento Grid (lebar/tinggi)
  color: string; // Background cadangan sebelum gambar dimuat
}

export const projectsData: ProjectItem[] = [
  // === CONTOH LOGO (Rasio 1:1 - Kotak Persegi Standar) ===
  {
    id: 1,
    title: "Logo Pertama",
    category: "Logo",
    shortDesc: "Rasio 1:1 • Logo Identitas",
    fullDesc: "Eksplorasi desain identitas visual berbentuk karakter manusia dengan presisi vektor yang tajam.",
    image: "/galeri/logo/logo-pertama.webp", // Taruh di folder public
    span: "md:col-span-1",    // Persegi standar (1 kolom)
    color: "bg-orange-50/30 dark:bg-orange-900/20"
  },
  
  // === CONTOH FLYER DIGITAL (Rasio 4:5 - Agak Tinggi ke Bawah) ===
  {
    id: 2,
    title: "Hari Kebangkitan Nasional",
    category: "Flyer Digital",
    shortDesc: "Rasio 4:5 • Publikasi Instagram",
    fullDesc: "Desain flyer instagram hari kebangkitan nasional dengan komposisi warna modern untuk feeds Instagram.",
    image: "/galeri/flyer/harkitnas.webp",
    span: "md:col-span-1 md:row-span-2", // Makan 2 baris ke bawah agar memanjang kebawah sesuai rasio 4:5
    color: "bg-pink-50/30 dark:bg-pink-900/20"
  },

  // === CONTOH SPANDUK (Rasio 1:2 - Melebar ke Samping) ===
  {
    id: 3,
    title: "Backdrop Milad TIF Ke-26",
    category: "Spanduk",
    shortDesc: "Rasio 1:2 • Desain Backdrop",
    fullDesc: "Representasi mini dari desain spanduk asli ukuran 3x1 meter yang disederhanakan agar pas di layar.",
    image: "/galeri/spanduk/Backdrop-Milad-TIFke-26.webp",
    span: "md:col-span-1",    // Makan 2 kolom ke samping agar melebar sesuai rasio spanduk
    color: "bg-blue-50/30 dark:bg-blue-900/20"
  },

  // === CONTOH TWIBBON (Rasio 1:1 - Kotak Persegi Standar) ===
  {
    id: 4,
    title: "Twibbon Maba TIF 2025",
    category: "Twibbon",
    shortDesc: "Rasio 1:1 • Bingkai Kampanye",
    fullDesc: "Bingkai twibbon untuk mahasiswa baru program studi Teknik Informatika.",
    image: "/galeri/twibbon/twibbon-maba-tif-2025.webp",
    span: "md:col-span-1",
    color: "bg-teal-50/30 dark:bg-teal-900/20"
  },

  {
    id: 5,
    title: "Sertifikat Simatif 2024",
    category: "Sertifikat",
    shortDesc: "Rasio 1:1 • Sertifikat Kegiatan",
    fullDesc: "Sertifikat kegiatan untuk peserta Simatif 2024.",
    image: "/galeri/sertifikat/Sertifikat-Peserta-Simatif-2024.webp",
    span: "md:col-span-1",
    color: "bg-green-50/30 dark:bg-green-900/20"
  },

  {
    id: 6,
    title: "Logo Asomatif 2024",
    category: "Logo",
    shortDesc: "Rasio 1:1 • Logo Identitas",
    fullDesc: "Logo identitas untuk kegiatan Asomatif 2024.",
    image: "/galeri/logo/Logo-Asomatif-2024.webp",
    span: "md:col-span-1",
    color: "bg-green-50/30 dark:bg-green-900/20"
  }



  // 💡 JIKA MAU MENAMBAH GAMBAR BARU SAMPAI 100 BIJI:
  // Tinggal copy-paste format kurung kurawal di atas, pisahkan dengan koma (,), lalu urutkan id-nya!
];
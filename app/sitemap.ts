import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ghilmanzikra.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly', // Beranda sering kamu oprek, set ke weekly biar robot Google rajin mampir
      priority: 1.0, // Prioritas utama halaman utama
    },
    {
      url: 'https://ghilmanzikra.vercel.app/galeri',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8, // Prioritas untuk halaman galeri karya
    },
  ];
}
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/', // Mengizinkan semua jenis robot pencari untuk masuk mendata webmu
    },
    sitemap: 'https://ghilmanzikra.vercel.app/sitemap.xml',
  };
}
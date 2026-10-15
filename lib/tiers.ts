import { TierConfig } from './types';

export const ORDER_BUMP_PRICE = 29000;
export const ORDER_BUMP_TITLE = "Audiobook Summary (Format MP3)";
export const ORDER_BUMP_DESC = "Dengarkan sari pati isi buku 'The Prompt' dalam format audio ringkas 45 menit saat commuting atau santai.";

export const PRODUCT_TIERS: Record<string, TierConfig> = {
  starter: {
    id: 'starter',
    name: 'Paket Starter',
    originalPrice: 149000,
    price: 99000,
    description: 'Akses membaca ebook komprehensif 400+ halaman karya Budhi Prasetyo untuk menguasai pondasi komunikasi AI.',
    features: [
      'Ebook PDF Lengkap 400+ Halaman (20 Bab & 5 Bagian)',
      'Penguasaan Kerangka PKIF (Peran, Konteks, Instruksi, Format)',
      '20+ Latihan "Coba Sekarang" di Setiap Bab',
      'Format Ramah Baca di Smartphone, Tablet & Laptop',
      'Lisensi Digital Personal Resmi dengan Watermark',
    ],
    recommended: false,
  },
  pro: {
    id: 'pro',
    name: 'Paket Pro (Paling Populer)',
    badge: 'Paling Diminati - Hemat 40%',
    originalPrice: 299000,
    price: 179000,
    description: 'Paket terlengkap untuk profesional, pebisnis & kreator. Dapatkan ebook 400+ halaman plus seluruh 82+ template prompt siap pakai.',
    features: [
      'Ebook PDF & ePub Lengkap (400+ Halaman, 20 Bab)',
      'The Mega Prompt Vault (82+ Template Siap Salin dari Bab 14-18)',
      'Cheatsheet Cetak Meja Kerja: Rumus Kerangka PKIF (A4 PDF)',
      'Panduan Bedah Kasus Nyata (Rina vs Dimas Skincare, Bisnis, Otomasi)',
      'Akses Gratis Seluruh Update & Revisi Versi Baru Selamanya',
    ],
    recommended: true,
  },
  vip: {
    id: 'vip',
    name: 'VIP Complete Bundle',
    badge: 'Akses Eksklusif All-in-One',
    originalPrice: 499000,
    price: 279000,
    description: 'Solusi lengkap bagi yang ingin menguasai AI dari level pengguna biasa hingga pengguna cerdas dan bijak.',
    features: [
      'Semua Isi & Hak Akses di Paket Pro',
      'Audiobook Summary Eksklusif (Sari Pati 20 Bab dalam MP3)',
      'Template Notion "AI Command Center Workspace"',
      'Panduan Praktis 12 Prinsip Penggunaan AI yang Bijak & Etis',
      'Template Otomasi Excel, Google Apps Script & Zapier (Bab 18)',
      'Akses Komunitas Diskusi Eksklusif Pembaca The Prompt',
    ],
    recommended: false,
  },
};

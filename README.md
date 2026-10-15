# The Prompt - Seni Berbicara dengan AI 🚀
## Dokumentasi Pengembangan Platform Penjualan Ebook

Selamat datang di repositori dokumentasi pengembangan website penjualan ebook **"The Prompt - Seni Berbicara dengan AI"**. Repositori ini berisi seluruh spesifikasi, rancangan arsitektur, panduan implementasi, strategi konversi, hingga SOP operasional peluncuran.

---

## 📚 Daftar Dokumentasi Tahapan Pengembangan

Dokumentasi ini disusun secara komprehensif mengikuti siklus hidup pengembangan perangkat lunak (SDLC) yang berorientasi pada konversi penjualan tinggi (*High-Converting Digital Product Funnel*):

| No | Dokumen | Tahapan | Deskripsi Utama |
|---|---|---|---|
| 01 | [**Product Requirements Document (PRD)**](file:///d:/projects/theprompt/docs/01-PRD-Product-Requirements-Document.md) | Inisiasi & Kebutuhan | Analisis target audiens, value proposition, user story, ruang lingkup MVP vs Fase 2, serta indikator keberhasilan (KPI). |
| 02 | [**System Architecture & Tech Stack**](file:///d:/projects/theprompt/docs/02-System-Architecture-and-Tech-Stack.md) | Arsitektur & Keamanan | Pemilihan stack (Next.js, Tailwind, Supabase/PostgreSQL, Cloudflare R2), ERD database, sistem proteksi PDF (watermarking dinamis), dan security. |
| 03 | [**UI/UX & High-Converting Copywriting**](file:///d:/projects/theprompt/docs/03-UI-UX-and-Landing-Page-Copywriting.md) | Desain & Penjualan | Struktur anatomi landing page (AIDA/PAS), draft copywriting persuasif khusus pasar Indonesia, wireframe checkout modal 1-klik. |
| 04 | [**API & Integration Specification**](file:///d:/projects/theprompt/docs/04-API-and-Integration-Specification.md) | Integrasi Teknis | Alur Webhook Midtrans/Xendit, integrasi email transaksional Resend, notifikasi WhatsApp, signed download URLs dengan limitasi unduhan. |
| 05 | [**Implementation Roadmap & Tasks**](file:///d:/projects/theprompt/docs/05-Implementation-Roadmap-and-Tasks.md) | Rencana Pengerjaan | Rincian sprint kerja (Sprint 1 - 5), milestone, estimasi timeline, serta checklist *Definition of Done* (DoD). |
| 06 | [**QA, Testing & Security Checklist**](file:///d:/projects/theprompt/docs/06-QA-Testing-and-Security-Checklist.md) | Pengujian Mutu | Rencana skenario pengujian (Happy path, edge cases, simulasi webhook gagal, load test, Core Web Vitals) & checklist keamanan. |
| 07 | [**Deployment & Operations Guide**](file:///d:/projects/theprompt/docs/07-Deployment-and-Operations-Guide.md) | Rilis & Operasional | Panduan deployment ke Vercel/Cloudflare, konfigurasi domain & SSL, tracking analytics (Meta Pixel, GA4, TikTok Pixel), dan SOP komplain pelanggan. |

---

## 🎯 Gambaran Ringkas Proyek

- **Judul Produk:** The Prompt - Seni Berbicara Dengan AI
- **Penulis:** Budhi Prasetyo (Bogor, 2026)
- **Format:** Ebook Digital (PDF & ePub) setebal 400+ Halaman (5 Bagian, 20 Bab Lengkap)
- **Kerangka Inti:** Kerangka PKIF (Peran, Konteks, Instruksi, Format)
- **Koleksi Template:** 82+ Template Prompt Siap Pakai di Bab 14 - 18 (Menulis, Belajar, Karier/Bisnis, Finansial, Otomasi)
- **Model Bisnis:** Direct-to-Consumer (D2C) One-Time Purchase dengan Tiers (Starter, Pro, VIP Complete Bundle)
- **Target Pasar:** Profesional, Pebisnis, Content Creator, Pelajar/Mahasiswa, & Pengguna AI di Indonesia
- **Sistem Pembayaran:** Midtrans Snap (QRIS, Virtual Account BCA/Mandiri/BNI/BRI, GoPay, ShopeePay)
- **Proteksi Hak Cipta:** Dynamic Watermarking `pdf-lib` (Nama & Email pembeli di setiap halaman PDF).

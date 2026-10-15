# 06 - Rencana Pengujian Mutu (QA) & Checklist Keamanan
## Produk: Platform E-Commerce Digital "The Prompt - Seni Berbicara dengan AI"

---

## 1. Rencana Pengujian Fungsional (Functional Test Cases)

Tabel berikut mencakup skenario pengujian menyeluruh (*end-to-end*) sebelum website dirilis ke publik:

| ID Tes | Skenario Pengujian | Langkah Pengujian | Hasil yang Diharapkan | Status |
|---|---|---|---|---|
| **TC-01** | Happy Path: Pembelian via QRIS | 1. Isi form nama, email, WA.<br/>2. Pilih paket Pro.<br/>3. Klik "Bayar Sekarang".<br/>4. Scan QRIS di simulator Midtrans.<br/>5. Tunggu webhook & cek email. | • Modal pembayaran terbuka mulus.<br/>• Status order berubah menjadi `PAID`.<br/>• Email konfirmasi masuk dalam < 10 detik.<br/>• PDF terunduh dengan watermark nama/email pembeli. | [ ] PASS |
| **TC-02** | Happy Path: Pembelian dengan Order Bump | 1. Centang opsi "Audio Summary (+ Rp 29.000)".<br/>2. Lakukan pembayaran. | • Total harga terhitung presisi (Rp 179k + 29k = Rp 208k).<br/>• File bonus audio MP3 disertakan di link portal unduhan. | [ ] PASS |
| **TC-03** | Validasi Input Form Checkout | 1. Masukkan email tidak valid (contoh: `budi@com` atau kosong).<br/>2. Masukkan nomor telepon acak (`abc`). | • Form menolak submit dan memunculkan pesan error jelas.<br/>• Mencegah salah ketik domain populer (`@gmai.com` -> peringatan otomatis). | [ ] PASS |
| **TC-04** | Keamanan Kuota Unduhan (Max Limit) | 1. Unduh file PDF sebanyak 5 kali berturut-turut.<br/>2. Coba lakukan unduhan ke-6 dengan tautan yang sama. | • Unduhan ke-1 s/d ke-5 berjalan lancar.<br/>• Unduhan ke-6 ditolak dengan halaman peringatan: *"Batas kuota unduhan habis. Hubungi admin untuk reset tautan."* | [ ] PASS |
| **TC-05** | Kedaluwarsa Tautan (Time Expiry) | 1. Buka token unduh yang telah melampaui masa aktif 48 jam. | • Sistem menampilkan pesan bahwa token telah kedaluwarsa demi keamanan.<br/>• Tombol "Kirim Ulang Link ke Email Terdaftar" berfungsi. | [ ] PASS |
| **TC-06** | Idempotency Webhook (Duplikasi Callback) | 1. Kirim webhook Midtrans berstatus `settlement` untuk order yang sama 3 kali berturut-turut. | • Server hanya memproses update status dan mengirim email 1 kali saja.<br/>• Callback ke-2 dan ke-3 langsung merespons `200 OK` tanpa duplikasi pengiriman email. | [ ] PASS |
| **TC-07** | Penolakan Webhook Palsu (Signature Spoofing) | 1. Kirim request HTTP POST manual ke `/api/webhooks/midtrans` dengan signature acak/palsu. | • Server menolak request dengan status `403 Forbidden`.<br/>• Tidak ada status database yang berubah. | [ ] PASS |
| **TC-08** | In-App Browser Compatibility | 1. Buka tautan landing page dari dalam aplikasi Instagram/TikTok/LinkedIn (WebView).<br/>2. Lakukan checkout. | • Tombol bayar dan modal QRIS tetap bisa dibuka normal tanpa crash atau freeze pada browser bawaan aplikasi sosial media. | [ ] PASS |

---

## 2. Pengujian Kinerja & Core Web Vitals

Karena kecepatan adalah faktor utama konversi penjualan iklan digital:

```
Target Metrik Google Lighthouse (Mobile Profile - 4G Throttling):
┌─────────────────────────────────┬──────────────┬───────────────┐
│ Metrik Performa                 │ Standar Baik │ Target Proyek │
├─────────────────────────────────┼──────────────┼───────────────┤
│ Largest Contentful Paint (LCP)  │ < 2.5 detik  │ < 1.4 detik   │
│ First Input Delay / INP         │ < 200 ms     │ < 50 ms       │
│ Cumulative Layout Shift (CLS)   │ < 0.1        │ 0.00          │
│ Total Blocking Time (TBT)       │ < 200 ms     │ < 80 ms       │
│ Skor Keseluruhan Lighthouse     │ > 85         │ > 95          │
└─────────────────────────────────┴──────────────┴───────────────┘
```

### Checklist Optimasi Frontend:
- [ ] Semua gambar (mockup buku, avatar testimoni) dikompresi ke format **WebP / AVIF** menggunakan `next/image` dengan atribut `sizes` dan `priority` pada banner utama.
- [ ] Font lokal menggunakan `next/font/google` dengan `display: swap` untuk mencegah *Flash of Invisible Text (FOIT)*.
- [ ] Script analitik pihak ketiga (Meta Pixel, Google Tag Manager) dimuat menggunakan `next/script` dengan strategi `afterInteractive` atau `lazyOnload`.

---

## 3. Checklist Audit Keamanan (Security Audit Checklist)

- [ ] **1. Proteksi Akses Berkas:**
  - File master PDF disimpan dalam Cloudflare R2 dengan setting **Private Access (Block All Public Requests)**. Akses hanya melalui IAM credentials backend.
- [ ] **2. Pencegahan IDOR (Insecure Direct Object References):**
  - Token unduhan dibuat menggunakan generator string acak kriptografis (`crypto.randomBytes(32).toString('hex')`) sehingga mustahil ditebak oleh pengunjung lain.
- [ ] **3. Rate Limiting & Proteksi DDoS:**
  - Terapkan rate limiter pada endpoint `/api/checkout` (maksimal 5 request per menit per alamat IP) untuk mencegah *spamming transaction bot*.
  - Terapkan rate limiter pada endpoint `/api/download` (maksimal 10 request per 10 menit per IP).
- [ ] **4. Keamanan Lingkungan & Kunci API:**
  - Pastikan file `.env.local` masuk ke dalam `.gitignore`.
  - Pastikan kunci rahasia (`MIDTRANS_SERVER_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) tidak pernah menggunakan awalan `NEXT_PUBLIC_`.
- [ ] **5. Kebijakan Header HTTP Aman:**
  - Tambahkan konfigurasi security headers pada `next.config.js`:
    - `X-Content-Type-Options: nosniff`
    - `X-Frame-Options: SAMEORIGIN`
    - `Referrer-Policy: strict-origin-when-cross-origin`
    - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- [ ] **6. Validasi Data Masukan:**
  - Gunakan library schema validation (seperti `Zod`) pada seluruh payload endpoint server actions untuk memblokir injeksi karakter jahat (SQL Injection & XSS).

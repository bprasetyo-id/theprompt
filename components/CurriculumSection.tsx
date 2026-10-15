'use client';

import React, { useState } from 'react';
import { BookOpen, ChevronDown, CheckCircle2, Sparkles, Layers, Bookmark } from 'lucide-react';

const PARTS = [
  {
    id: 1,
    title: 'Bagian 1: Fondasi & Mindset Berbicara dengan AI',
    subtitle: 'Bab 1 - 3 (Halaman 1 - 40)',
    chapters: [
      {
        number: '01',
        page: '2',
        title: 'Kamu Tidak Sendirian. Ini Masalah Semua Orang!',
        desc: 'Indonesia pengguna AI ke-3 di dunia, tapi indeks literasi hanya 49,9/100. Kenapa kita seperti bisa mengapung tapi belum bisa berenang? Membedah kisah Rina vs Dimas (skincare Cahaya), 3 mitos AI, dan latihan prompt pertama.',
        highlights: ['Data 84% pengguna internet RI mencoba AI', 'Kisah Rina vs Dimas: dari 30 menit ke 3 menit', 'Kamu tidak bodoh & AI-mu tidak rusak'],
      },
      {
        number: '02',
        page: '13',
        title: 'Cara Kerja AI yang Perlu Kamu Tahu (Tanpa Rumus)',
        desc: 'AI bukan mesin pencari Google. Analogi perpustakaan: AI adalah orang yang membaca semua buku dan menghasilkan jawaban kata demi kata. Memahami halusinasi dan 3 jenis informasi yang selalu dicari AI.',
        highlights: ['AI menghasilkan, bukan mencari', 'Mengapa percakapan lebih kuat dari 1 pertanyaan tunggal', 'Latihan: Menjelaskan bunga majemuk ke 3 audiens berbeda'],
      },
      {
        number: '03',
        page: '26',
        title: '7 Kesalahan Prompt yang Paling Sering Dilakukan',
        desc: 'Diagnosis jujur kebiasaan buruk yang menurunkan kualitas jawaban AI: terlalu singkat, tanpa konteks diri, lupa menentukan audiens, lupa format output, minta terlalu banyak, menerima draf pertama, dan prompt kaku untuk semua situasi.',
        highlights: ['Diagnosis diri: identifikasi kesalahan pribadimu', 'Mengapa AI mengira kamu minta lemari padahal butuh rak buku', 'Latihan: Perbaiki prompt lamamu yang gagal'],
      },
    ],
  },
  {
    id: 2,
    title: 'Bagian 2: Kerangka PKIF (Jantung Seluruh Buku)',
    subtitle: 'Bab 4 - 7 (Halaman 41 - 106)',
    chapters: [
      {
        number: '04',
        page: '42',
        title: 'Empat Komponen Prompt yang Kuat (Kerangka PKIF)',
        desc: 'Memperkenalkan Kerangka PKIF: Peran, Konteks, Instruksi, dan Format. Satu kerangka universal yang berlaku untuk semua AI, semua platform, dan tidak akan pernah usang seumur hidup.',
        highlights: ['Bedah 4 pilar PKIF', 'Contoh transformasi sebelum dan sesudah PKIF', 'Latihan: Menyusun prompt wawancara kerja & proposal'],
      },
      {
        number: '05',
        page: '59',
        title: 'Teknik "Berikan AI Sebuah Peran"',
        desc: 'Memberikan "topi" spesialis kepada AI. Mengapa peran mengubah kosakata dan analisis AI secara dramatis. 3 lapisan peran yang efektif, 4 jenis peran paling berguna, teknik peran ganda, dan kumpulan peran siap pakai.',
        highlights: ['3 Lapisan: Profesi, Spesialisasi, Karakteristik', 'Teknik Peran Ganda (Pengusaha vs Akuntan Konservatif)', 'Kumpulan peran siap pakai untuk menulis, bisnis, & karier'],
      },
      {
        number: '06',
        page: '73',
        title: 'Konteks adalah Kuncinya! Semakin Banyak, Semakin Baik!',
        desc: 'Konteks bukan sekadar latar belakang, ia menentukan bagaimana AI menafsirkan instruksi. 5 dimensi konteks berpengaruh, teknik "Dump Konteks" untuk situasi rumit, konteks bertahap, dan batas privasi yang wajib dijaga.',
        highlights: ['5 Dimensi: Diri, Tujuan, Audiens, Situasi, Anti-Preferensi', 'Teknik Dump Konteks untuk keputusan karier & bisnis', 'Konteks konkret vs abstrak: pentingnya angka & nama'],
      },
      {
        number: '07',
        page: '89',
        title: 'Minta Format yang Kamu Inginkan',
        desc: 'Format sebagai investasi waktu agar output langsung siap pakai tanpa 30 menit editing manual. 4 dimensi format (struktur, panjang, nada, elemen khusus), teknik "Tunjukkan Contohnya", dan panduan format lintas platform.',
        highlights: ['4 Dimensi Format: Struktur, Panjang, Nada, Elemen Khusus', 'Teknik "Tunjukkan Contohnya" (Showing vs Telling)', 'Menggabungkan Peran, Konteks, Instruksi & Format secara utuh'],
      },
    ],
  },
  {
    id: 3,
    title: 'Bagian 3: Teknik-Teknik Lanjutan Prompt Engineering',
    subtitle: 'Bab 8 - 13 (Halaman 107 - 218)',
    chapters: [
      {
        number: '08',
        page: '108',
        title: 'Mengajarkan AI dengan Contoh (Teknik Few-Shot)',
        desc: 'Tunjukkan contohnya, AI akan menangkap polanya. Anatomi Few-Shot prompt, negative examples (tunjukkan apa yang TIDAK kamu inginkan), menjaga konsistensi brand voice, dan formatting data terstruktur (JSON/CSV).',
        highlights: ['Zero-shot vs One-shot vs Few-shot', 'Negative examples: memblokir gaya iklan generik', 'Few-shot untuk mempertahankan suara asli penulis'],
      },
      {
        number: '09',
        page: '125',
        title: 'Minta AI Berpikir Bertahap, Bukan Langsung Menjawab!',
        desc: 'Chain-of-Thought (CoT): memaksa AI menunjukkan proses berpikir sebelum mengambil kesimpulan. 4 variasi CoT, meminta AI menjadi kritikus atas jawabannya sendiri, dan studi kasus investasi alat katering Rp 80 juta.',
        highlights: ['Mengapa CoT melipatgandakan akurasi penalaran', 'Minta AI periksa asumsinya sendiri sebelum menjawab', 'Studi kasus evaluasi bisnis katering & cash flow'],
      },
      {
        number: '10',
        page: '142',
        title: 'Seni Iterasi! Percakapan yang Makin Lama, Makin Tajam',
        desc: 'Prompt bukan formulir satu kali kirim, melainkan awal percakapan. 3 jenis iterasi: Penyempurnaan, Ekspansi, dan Perubahan Arah. Teknik "Simpan yang Bagus, Ubah yang Kurang", dan kapan harus memulai chat baru.',
        highlights: ['3 Jenis Iterasi yang perlu dikuasai', 'Teknik mengunci paragraf yang sudah bagus agar tidak berubah', 'Refleksi 20 detik sebelum mengirim instruksi revisi'],
      },
      {
        number: '11',
        page: '159',
        title: 'Kendalikan Panjang, Nada, dan Gaya Jawaban AI',
        desc: 'Menjadi "pemesan kopi yang tepat". Mengontrol 3 dimensi kemasan output (panjang kata/karakter, 6 jenis nada suara, dan gaya bahasa EYD/santai). Menyesuaikan kemasan untuk Instagram, LinkedIn, email, dan slide presentasi.',
        highlights: ['6 Pilihan Nada: Formal, Semi-Formal, Santai, Empatik, Tegas, Inspiratif', 'Teknik Referensi Gaya (contoh: Tirto.id, Morning Brew)', 'Panduan kemasan spesifik untuk IG, LinkedIn, & WhatsApp'],
      },
      {
        number: '12',
        page: '177',
        title: 'Debug Prompt! Apa yang Dilakukan saat AI Meleset?',
        desc: 'Jangan panik dan jangan hapus semua dari nol! Diagnosis 5 penyebab utama output meleset (ambiguitas, konteks hilang, instruksi kontradiktif, beban berlebih, ekspektasi keliru) dan 5 cara memperbaikinya secara bedah mikro.',
        highlights: ['Minta AI mendiagnosis asumsi salahnya sendiri', 'Teknik memberikan contoh keberhasilan vs kegagalan', 'Kapan saat yang tepat untuk mulai dari nol'],
      },
      {
        number: '13',
        page: '199',
        title: 'Prompt Berantai: Menyelesaikan Tugas Kompleks Selangkah demi Selangkah',
        desc: 'Prompt Chaining: cara kerja para pengguna AI paling produktif. 3 pola rantai: Rantai Linear (dari umum ke spesifik), Rantai Verifikasi (bangun-kritisi-perbaiki), dan Rantai Paralel Sintesis.',
        highlights: ['Memecah tugas raksasa menjadi langkah-langkah terhubung', 'Rantai Verifikasi: Bangun, Kritisi, Perbaiki, Poles Final', 'Cara menyambungkan konteks antar prompt tanpa hilang fokus'],
      },
    ],
  },
  {
    id: 4,
    title: 'Bagian 4: Penerapan Praktis di Berbagai Bidang (82+ Template)',
    subtitle: 'Bab 14 - 18 (Halaman 219 - 355)',
    chapters: [
      {
        number: '14',
        page: '220',
        title: 'Untuk yang Sering Menulis Konten, Email, dan Laporan (20 Template)',
        desc: 'AI sebagai kolaborator, bukan ghostwriter. 20 template prompt siap pakai untuk caption Instagram berkarakter, artikel dengan angle unik, email penawaran bisnis, email berita buruk, notulen rapat, dan ringkasan eksekutif.',
        highlights: ['20 Template Prompt Siap Pakai untuk Menulis', 'Menulis bersama AI: Kolaborator vs Ghostwriter', 'Email cold outreach dengan tingkat balasan tinggi'],
      },
      {
        number: '15',
        page: '242',
        title: 'Untuk yang Ingin Belajar Lebih Cepat (12 Template)',
        desc: 'Mengubah AI menjadi guru les dan mentor pribadi. 12 template prompt: merangkum dengan tujuan spesifik, teknik "jelaskan sampai saya mengerti", Socratic questioning, sesi flashcard adaptif, dan sparring partner debat.',
        highlights: ['12 Template Belajar & Ujian Cepat', 'Metode Sokrates untuk pemahaman konseptual mendalam', 'Waspadai "Ilusi Pemahaman" & teknik retrieval practice'],
      },
      {
        number: '16',
        page: '267',
        title: 'Untuk yang Ingin Maju di Karier dan Bisnis (18 Template)',
        desc: 'Bekerja dengan leverage: 18 template siap pakai untuk analisis keputusan (second-order thinking & pre-mortem), brainstorming tak terduga, simulasi negosiasi kenaikan gaji, audit profil LinkedIn & CV, dan rutinitas produktivitas.',
        highlights: ['18 Template Karier, Bisnis & Negosiasi', 'AI sebagai Mitra Strategis, bukan asisten administratif', 'Simulasi wawancara kerja & simulasi negosiasi realistis'],
      },
      {
        number: '17',
        page: '298',
        title: 'Untuk Kehidupan Sehari-hari yang Lebih Mudah (20 Template)',
        desc: 'Menyelesaikan keputusan kecil yang melelahkan otak: 20 template prompt untuk itinerary liburan keluarga realistis, meal prep mingguan & resep dari bahan sisa kulkas, audit pengeluaran bulanan, strategi lunasi utang, hingga komunikasi parenting.',
        highlights: ['20 Template Kehidupan, Finansial & Nutrisi', 'Itinerary liburan tanpa jadwal ambisius yang melelahkan', 'Meal planner mingguan & resep sisa bahan kulkas'],
      },
      {
        number: '18',
        page: '329',
        title: 'Untuk yang Tidak Berlatar Teknologi tapi Butuh Otomasi (12 Template)',
        desc: 'Meruntuhkan tembok antara orang teknis dan non-teknis. 12 template prompt untuk formula Excel/Sheets pencarian data (VLOOKUP/XLOOKUP/COUNTIF), macro Google Apps Script, otomasi email massal, dan troubleshooting komputer lambat.',
        highlights: ['12 Template Otomasi & Troubleshooting Teknis', 'Deskripsikan kebutuhanmu dalam bahasa biasa, AI tulis kodenya', 'Panduan aman otomasi file, spreadsheet, dan Google Apps Script'],
      },
    ],
  },
  {
    id: 5,
    title: 'Bagian 5: Menjadi Pengguna AI yang Cerdas & Bijak',
    subtitle: 'Bab 19 - 20 (Halaman 356 - 401)',
    chapters: [
      {
        number: '19',
        page: '357',
        title: 'AI Juga Bisa Salah: Cara Mengenali dan Memverifikasi',
        desc: 'Mengapa halusinasi terjadi dan mengapa nada percaya diri AI bukan bukti kebenaran. Tanda-tanda waspada (klaim obscure, kutipan fiktif), 5 cara memverifikasi output AI, dan konsep calibrated trust.',
        highlights: ['Mengenal halusinasi AI & mengapa ini bukan bug sementara', '5 Cara memverifikasi: Minta sumber, cross-check, steelman', 'Mental model Calibrated Trust dalam pengambilan keputusan'],
      },
      {
        number: '20',
        page: '381',
        title: 'Privasi, Etika, dan Hal yang Tidak Boleh Kamu Ceritakan ke AI',
        desc: 'Apa yang terjadi pada chatmu setelah tekan enter? 3 kategori sensitivitas data (Aman, Hati-hati, Dilarang Keras), etika penggunaan, persuasi vs manipulasi, mencegah atrofi otak, dan 12 Prinsip Penggunaan AI yang Bijak.',
        highlights: ['3 Kategori Data: Jangan pernah bagikan password, KTP & data rahasia', '12 Prinsip Penggunaan AI yang Bijak & Bertanggung Jawab', 'Refleksi akhir: Menjadi Pengguna AI yang Cerdas dan Bijak'],
      },
    ],
  },
];

export default function CurriculumSection() {
  const [activePart, setActivePart] = useState<number>(1);
  const [openChapter, setOpenChapter] = useState<string | null>('01');

  const selectedPartData = PARTS.find((p) => p.id === activePart) || PARTS[0];

  const toggleChapter = (num: string) => {
    setOpenChapter(openChapter === num ? null : num);
  };

  return (
    <section id="daftar-isi" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Struktur Kurikulum Lengkap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Daftar Isi Buku: 5 Bagian & 20 Bab Lengkap (400+ Halaman)
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Ditulis langsung oleh <strong>Budhi Prasetyo</strong> secara sistematis. Dari mendiagnosis kesalahan umum, menguasai <strong>Kerangka PKIF</strong>, hingga <strong>82+ template prompt siap pakai</strong> di dunia nyata.
          </p>
        </div>

        {/* Tab Selector 5 Bagian */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {PARTS.map((part) => (
            <button
              key={part.id}
              onClick={() => {
                setActivePart(part.id);
                setOpenChapter(part.chapters[0].number);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all border ${
                activePart === part.id
                  ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              Bagian {part.id}
            </button>
          ))}
        </div>

        {/* Current Part Info */}
        <div className="mt-8 p-5 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-brand-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-brand-400 uppercase tracking-widest block">
              {selectedPartData.subtitle}
            </span>
            <h3 className="text-base sm:text-lg font-black text-white pt-0.5">
              {selectedPartData.title}
            </h3>
          </div>
          <span className="text-xs bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full border border-brand-500/30 font-semibold whitespace-nowrap">
            {selectedPartData.chapters.length} Bab Termasuk
          </span>
        </div>

        {/* Chapters Accordion */}
        <div className="mt-6 space-y-3.5">
          {selectedPartData.chapters.map((ch) => {
            const isOpen = openChapter === ch.number;
            return (
              <div
                key={ch.number}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-brand-500/50 shadow-lg shadow-brand-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleChapter(ch.number)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <span className="font-mono text-xs sm:text-sm font-extrabold text-brand-400 bg-brand-500/10 px-3 py-1.5 rounded-lg border border-brand-500/20 whitespace-nowrap">
                      Bab {ch.number}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {ch.title}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-medium">Halaman {ch.page}</span>
                    </div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-brand-500/20 text-brand-300' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-800/80 space-y-4">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {ch.desc}
                    </p>
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Poin Kunci & Latihan di Bab Ini:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ch.highlights.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

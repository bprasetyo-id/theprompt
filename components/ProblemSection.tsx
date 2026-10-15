'use client';

import React from 'react';
import { AlertTriangle, XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section id="masalah" className="py-20 bg-slate-900/40 border-y border-slate-850 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Fakta Nyata dari Halaman 3-5 Buku The Prompt</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Kita Sudah Masuk Kolam Renang, Tapi Baru Bisa Mengapung—Belum Bisa Berenang.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Indonesia adalah pengguna AI terbesar ke-3 di dunia. 84% pengguna internet sudah mencoba ChatGPT, Gemini, atau Copilot. Tapi indeks literasi kita baru <strong>49,9 dari 100</strong>. Kebanyakan dari kita masih memperlakukan AI seperti mesin pencari Google: <em>ketik kata kunci pendek, lalu kecewa saat hasilnya generik</em>.
          </p>
        </div>

        {/* The Truth Box */}
        <div className="mt-8 max-w-2xl mx-auto bg-brand-500/10 border border-brand-500/30 rounded-2xl p-5 text-center">
          <p className="text-base sm:text-lg font-bold text-white">
            "Kamu tidak bodoh. Dan AI-mu tidak rusak!"
          </p>
          <p className="text-xs sm:text-sm text-brand-200 pt-1">
            Masalahnya ada di tengah: di celah komunikasi antara pikiranmu dan instruksi yang kamu berikan.
          </p>
        </div>

        {/* 7 Kesalahan Prompt dari Bab 3 */}
        <div className="mt-14">
          <h3 className="text-center text-lg sm:text-xl font-bold text-white pb-6">
            Apakah Kamu Sering Melakukan 7 Kesalahan Ini? (Bab 3)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-red-400 font-bold text-xs">#1 Terlalu Singkat & Umum</span>
              <p className="text-xs text-slate-400">"Buatkan artikel kesehatan" tanpa menyebutkan untuk siapa dan topik spesifiknya.</p>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-red-400 font-bold text-xs">#2 Tanpa Konteks Diri Sendiri</span>
              <p className="text-xs text-slate-400">Tidak menceritakan siapa kamu, profesimu, atau situasi nyata yang sedang kamu hadapi.</p>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-red-400 font-bold text-xs">#3 Lupa Menentukan Audiens</span>
              <p className="text-xs text-slate-400">Penjelasan untuk anak SMA tentu berbeda dengan presentasi ke jajaran Direksi.</p>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-red-400 font-bold text-xs">#4 Lupa Menentukan Format</span>
              <p className="text-xs text-slate-400">Butuh poin slide 3 baris, tapi AI malah memberi esai 5 paragraf yang melelahkan.</p>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-red-400 font-bold text-xs">#5 Terlalu Banyak dalam 1 Prompt</span>
              <p className="text-xs text-slate-400">Meminta business plan, keuangan 3 tahun, dan strategi investor dalam satu tarikan napas.</p>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-red-400 font-bold text-xs">#6 Menerima Draf Pertama</span>
              <p className="text-xs text-slate-400">Berhenti di percobaan awal tanpa melakukan iterasi terarah seperti bekerja dengan asisten.</p>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 sm:col-span-2">
              <span className="text-red-400 font-bold text-xs">#7 Prompt yang Sama untuk Semua Situasi</span>
              <p className="text-xs text-slate-400">Memakai satu template kaku untuk segala kebutuhan, dari resep masakan hingga analisis laporan keuangan.</p>
            </div>
          </div>
        </div>

        {/* Before vs After: Kisah Nyata Rina vs Dimas (Halaman 5-6) */}
        <div className="mt-16 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="text-center pb-6">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Studi Kasus Asli (Bab 1, Hlm 5)</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white pt-1">
              Kisah Dua Pengguna AI: Rina vs Dimas (Brand Skincare 'Cahaya')
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 pt-1">
              Menggunakan AI yang sama dan platform yang sama, tapi hasilnya berbeda bagai bumi dan langit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Sisi Kiri: Cara Rina */}
            <div className="bg-slate-950/90 border border-red-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> CARA RINA (PROMPT ASAL-ASALAN)
                </span>
                <span className="text-[11px] text-slate-500">Waktu Revisi: 30 Menit</span>
              </div>
              <div className="bg-slate-900/60 p-3.5 rounded-xl font-mono text-xs text-slate-300">
                "Buatkan caption Instagram untuk produk skincare kami."
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-300">Hasilnya:</strong> AI merespons dengan caption yang sangat generik. Rina harus mengedit berulang kali karena nadanya kaku dan tidak cocok dengan karakter brand. Rina menyimpulkan AI kurang berguna.
              </p>
            </div>

            {/* Sisi Kanan: Cara Dimas */}
            <div className="bg-slate-950/90 border border-brand-500/50 rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> CARA DIMAS (KERANGKA PKIF)
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold">Selesai dalam: 3 Menit!</span>
              </div>
              <div className="bg-slate-900/60 p-3.5 rounded-xl font-mono text-xs text-brand-200 leading-relaxed">
                "Kamu adalah copywriter senior yang ahli di industri kecantikan [PERAN]. Saya memiliki brand skincare lokal bernama 'Cahaya' yang menyasar perempuan usia 25–35 tahun, urban, peduli lingkungan [KONTEKS]. Buatkan 3 variasi caption Instagram untuk produk pelembab baru bahan lidah buaya & niacinamide [INSTRUKSI]. Setiap caption maksimal 150 karakter, sertakan 1 pertanyaan interaksi, akhiri 3-5 hashtag [FORMAT]."
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-brand-300">Hasilnya:</strong> 3 caption siap posting tanpa banyak edit. Tone tepat sasaran, relevan dengan audiens, dan hemat waktu kerja 90%!
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

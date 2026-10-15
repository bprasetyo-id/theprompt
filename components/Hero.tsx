'use client';

import React from 'react';
import { Sparkles, ArrowRight, Star, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenCheckout: () => void;
}

export default function Hero({ onOpenCheckout }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-accent-violet/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Kolom Kiri: Copywriting & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-brand-500/30 text-xs font-semibold text-brand-300 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
              <span>Buku Baru Karya Budhi Prasetyo (Bogor, 2026)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Indonesia Pengguna AI Terbesar ke-3 di Dunia, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-400 via-brand-200 to-accent-violet bg-clip-text text-transparent">
                Tapi Literasi Kita Baru 49,9 dari 100.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              "Kamu tidak bodoh, dan AI-mu tidak rusak! Masalahnya ada di tengah: <strong>cara berkomunikasi dengannya</strong>." Kuasai <strong>Kerangka PKIF</strong> (Peran, Konteks, Instruksi, Format) dalam buku setebal <strong>400+ halaman (20 Bab & 5 Bagian)</strong> untuk mengubah AI dari sekadar chatbot biasa menjadi mitra kerja paling cerdas dalam karier dan kehidupanmu.
            </p>

            {/* Social Proof Star Rating */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-200">4.9/5.0</span>
              <span className="text-slate-500">•</span>
              <span className="text-xs sm:text-sm text-slate-400">400+ Halaman • 20 Bab • 82+ Template Prompt Siap Pakai</span>
            </div>

            {/* CTA Buttons & Micro-guarantee */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onOpenCheckout}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-brand-500 via-brand-600 to-accent-violet hover:from-brand-600 hover:to-accent-violet text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Dapatkan Ebook Sekarang</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="#daftar-isi"
                  className="w-full sm:w-auto flex items-center justify-center px-6 py-4 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white font-semibold text-sm transition-all"
                >
                  Lihat 20 Bab Lengkap (Daftar Isi)
                </a>
              </div>

              {/* Guarantees Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-brand-400" />
                  <span>Akses Instan ke Email</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Garansi Uang Kembali 14 Hari</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  <span>QRIS & Virtual Account</span>
                </div>
              </div>
            </div>

          </div>

          {/* Kolom Kanan: 3D Ebook Visual Mockup (Cover Asli Hitam Pekat Elegan) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Visual Book Presentation */}
            <div className="relative group cursor-pointer" onClick={onOpenCheckout}>
              {/* Glow Behind Book */}
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/30 to-accent-violet/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-80" />

              {/* Mockup Container (Sesuai Cover PDF Asli) */}
              <div className="relative w-64 sm:w-72 md:w-80 h-[400px] sm:h-[450px] rounded-r-2xl rounded-l-md bg-black border-y border-r border-slate-800 p-8 flex flex-col justify-between shadow-2xl shadow-black/90 transform rotate-1 group-hover:rotate-0 transition-transform duration-500">
                
                {/* Book Spine Highlight */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-neutral-950 via-neutral-800 to-black rounded-l-sm border-r border-neutral-700/30" />

                {/* Top Badge on Cover */}
                <div className="pl-2">
                  <div className="inline-block px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                    400+ Halaman • 5 Bagian
                  </div>
                </div>

                {/* Cover Title Sesuai Halaman 1 Buku */}
                <div className="pl-2 space-y-3 my-auto">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-white tracking-wider leading-tight">
                    THE PROMPT
                  </h2>
                  <p className="text-base sm:text-lg font-serif italic text-slate-200">
                    Seni Berbicara Dengan AI
                  </p>
                </div>

                {/* Cover Bottom: Nama Penulis Sesuai Buku */}
                <div className="pl-2 pt-6 border-t border-neutral-800 flex flex-col justify-between text-xs">
                  <span className="font-serif font-bold uppercase tracking-widest text-slate-300 text-sm">
                    BUDHI PRASETYO
                  </span>
                  <span className="text-[10px] text-slate-400 pt-1">
                    Bogor, 2026 • Kerangka PKIF Teruji
                  </span>
                </div>

                {/* Promo Ribbon */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg transform rotate-6">
                  EDISI LENGKAP
                </div>
              </div>

              {/* Floating Mini Badge */}
              <div className="absolute -bottom-4 -left-6 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-white">82+ Template Prompt Siap Pakai</div>
                  <div className="text-[10px] text-slate-400">Dari Bab 14 hingga Bab 18</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

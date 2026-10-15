'use client';

import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Budi Wicaksono',
    role: 'Digital Marketing Lead di Tech Startup Jakarta',
    comment:
      'Gila sih, bab tentang Reverse Prompting benar-benar membuka mata saya! Sekarang saat bikin campaign brief baru, saya biarkan AI mewawancarai saya dulu. Waktu drafting ide turun dari 4 jam jadi cuma 25 menit.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Siti Rahmawati',
    role: 'Freelance Copywriter & Content Strategist',
    comment:
      'Sebelum baca buku ini, hasil ChatGPT saya selalu terdengar klise dan hambar. Setelah menerapkan rumus di Bab 4 (Voice & Tone Control), klien-klien saya bahkan tidak sadar kalau draf awal dibantu AI karena tetap punya sentuhan manusia yang kuat.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Dimas Pratama',
    role: 'Software Engineer & AI Enthusiast',
    comment:
      'Banyak buku prompt cuma jualan list perintah dangkal. Tapi buku ini mengajarkan cara berpikir di balik LLM. Bonus Cheatsheet-nya saya laminasi dan taruh tepat di samping monitor kantor. Worth it banget!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  },
];

export default function TestimonialSection() {
  return (
    <section id="testimoni" className="py-20 bg-slate-950 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            <span>Kisah Sukses Nyata</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Apa Kata Mereka yang Sudah Menerapkan Framework "The Prompt"?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Ulasan jujur dari pembaca edisi beta yang telah mempraktikkan langsung rumus di buku ini dalam pekerjaan profesional harian mereka.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 relative hover:border-slate-700 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700" />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1">
                    {t.name}
                    <CheckCircle className="w-3.5 h-3.5 text-brand-400" />
                  </div>
                  <div className="text-[11px] text-slate-400 leading-tight">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

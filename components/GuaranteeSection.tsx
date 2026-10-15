'use client';

import React from 'react';
import { ShieldCheck, HeartHandshake, Lock } from 'lucide-react';

export default function GuaranteeSection() {
  return (
    <section className="py-16 bg-slate-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-slate-900 via-brand-950/40 to-slate-900 border border-brand-500/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 shadow-xl">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-brand-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-12 h-12 text-emerald-400" />
          </div>
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-block px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
              100% Risk-Free Guarantee
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Garansi 100% Uang Kembali Selama 14 Hari Tanpa Syarat Rumit
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Kami ingin Anda membeli dengan rasa tenang. Jika dalam 14 hari setelah membaca buku ini Anda merasa skill komunikasi AI Anda tidak berkembang sama sekali, cukup kirimkan satu pesan WhatsApp atau email ke tim kami. Kami kembalikan 100% uang Anda tanpa berbelit-belit. Risiko sepenuhnya ada di tangan kami!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

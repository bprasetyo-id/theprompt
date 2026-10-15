'use client';

import React from 'react';
import { Gift, Sparkles, Layers, FileText, LayoutTemplate, Check } from 'lucide-react';

export default function BonusSection() {
  return (
    <section id="bonus" className="py-20 bg-slate-900/50 border-y border-slate-800/80 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-violet/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-xs font-semibold text-purple-300">
            <Gift className="w-3.5 h-3.5" />
            <span>Bonus Spesial Peluncuran</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Dapatkan 3 Bonus Eksklusif Senilai <span className="text-amber-400">Rp 325.000</span> Secara Gratis!
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Kami tidak hanya memberikan materi bacaan, melainkan seluruh perlengkapan senjata siap pakai agar Anda bisa langsung merasakan akselerasi produktivitas kerja hari ini.
          </p>
        </div>

        {/* 3 Bonus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          
          {/* Bonus 1 */}
          <div className="bg-slate-950/80 border border-slate-850 hover:border-brand-500/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative group transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                <FileText className="w-6 h-6" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded bg-brand-500/20 text-brand-300 text-[11px] font-bold">
                BONUS #1 • SENILAI RP 150.000
              </div>
              <h3 className="text-lg font-bold text-white">The Mega Prompt Vault (82+ Template Bab 14-18)</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Seluruh 82 template prompt siap pakai dari buku: 20 template menulis & email, 12 template belajar cepat, 18 template karier & bisnis, 20 template finansial & nutrisi, serta 12 template formula Excel/Sheets.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800/80 text-xs text-brand-400 font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Format Digital Siap Salin (Copy-Paste)</span>
            </div>
          </div>

          {/* Bonus 2 */}
          <div className="bg-slate-950/80 border border-slate-850 hover:border-accent-violet/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative group transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Layers className="w-6 h-6" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[11px] font-bold">
                BONUS #2 • SENILAI RP 75.000
              </div>
              <h3 className="text-lg font-bold text-white">Printable Cheatsheet Rumus PKIF (A4 PDF)</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Lembar contekan meja kerja 2 halaman berisi panduan ringkas Kerangka PKIF (Peran, Konteks, Instruksi, Format), 5 cara verifikasi halusinasi, dan checklist 20 detik sebelum menekan enter.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800/80 text-xs text-purple-400 font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Resolusi Tinggi Siap Cetak & Laminasi</span>
            </div>
          </div>

          {/* Bonus 3 */}
          <div className="bg-slate-950/80 border border-slate-850 hover:border-amber-500/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative group transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <LayoutTemplate className="w-6 h-6" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[11px] font-bold">
                BONUS #3 • SENILAI RP 100.000
              </div>
              <h3 className="text-lg font-bold text-white">Notion AI Command Center & 12 Prinsip Etika</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Dashboard Notion interaktif untuk mendokumentasikan prompt favorit pribadimu, mencatat eksperimen iterasi, serta checklist 12 prinsip penggunaan AI yang bijak dari Bab 20.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800/80 text-xs text-amber-400 font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>1-Click Duplicate ke Akun Notion Pribadi</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

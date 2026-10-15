'use client';

import React, { useState, useEffect } from 'react';
import { Check, Sparkles, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { PRODUCT_TIERS } from '@/lib/tiers';
import { ProductTier } from '@/lib/types';

interface PricingSectionProps {
  onSelectTier: (tier: ProductTier) => void;
}

export default function PricingSection({ onSelectTier }: PricingSectionProps) {
  // Simulated countdown timer for urgency
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="harga" className="py-24 bg-slate-900/30 border-y border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header & Urgency Countdown */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Investasi Sekali, Manfaat Selamanya</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Pilih Paket yang Sesuai dengan Kebutuhan Anda
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Dapatkan harga spesial peluncuran perdana hari ini sebelum harga kembali ke tarif normal.
          </p>

          {/* Countdown Timer Box */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold shadow-inner">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Harga Spesial Berakhir Dalam:</span>
              <span className="font-mono bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded border border-amber-500/30 font-bold">
                {String(timeLeft.hours).padStart(2, '0')}j : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}d
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-14 items-stretch">
          {Object.values(PRODUCT_TIERS).map((tier) => {
            const isRec = tier.recommended;
            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isRec
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-brand-500 shadow-2xl shadow-brand-500/20 lg:-translate-y-3'
                    : 'bg-slate-950/80 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular Pill Badge */}
                {isRec && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-accent-violet text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                    {tier.badge || 'Paling Diminati'}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Tier Title & Description */}
                  <div>
                    <h3 className="text-xl font-black text-white">{tier.name}</h3>
                    <p className="text-xs text-slate-400 pt-2 min-h-[36px] leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs line-through text-slate-500 font-medium">
                        Rp {tier.originalPrice.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                        HEMAT {Math.round(((tier.originalPrice - tier.price) / tier.originalPrice) * 100)}%
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 pt-1">
                      <span className="text-sm font-semibold text-slate-400">Rp</span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {tier.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs text-slate-500">/ sekali bayar</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Apa Saja yang Anda Dapatkan:
                    </span>
                    <ul className="space-y-2.5">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <button
                    onClick={() => onSelectTier(tier.id as ProductTier)}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      isRec
                        ? 'bg-gradient-to-r from-brand-500 via-brand-600 to-accent-violet hover:from-brand-600 hover:to-accent-violet text-white shadow-lg shadow-brand-500/30 hover:scale-[1.02]'
                        : 'bg-slate-800 hover:bg-slate-700 text-white hover:scale-[1.01]'
                    }`}
                  >
                    <span>Pilih {tier.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="text-[11px] text-center text-slate-500 pt-2 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Garansi 14 Hari Uang Kembali</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

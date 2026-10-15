'use client';

import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface StickyMobileBarProps {
  onOpenCheckout: () => void;
}

export default function StickyMobileBar({ onOpenCheckout }: StickyMobileBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-3 px-4 flex items-center justify-between gap-3 shadow-2xl">
      <div>
        <div className="text-[10px] text-slate-400 uppercase font-semibold">Harga Promo Mulai</div>
        <div className="text-sm font-extrabold text-brand-400">Rp 99.000</div>
      </div>
      <button
        onClick={onOpenCheckout}
        className="flex-1 max-w-[220px] bg-gradient-to-r from-brand-500 to-accent-violet hover:from-brand-600 hover:to-accent-violet text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>Beli Ebook Sekarang</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}

'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

function FailedContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center text-slate-100 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 mx-auto">
          <XCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-black text-white">Pembayaran Dibatalkan / Gagal</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Transaksi untuk pesanan <strong className="text-red-400">#{orderId || '-'}</strong> tidak berhasil diselesaikan atau dibatalkan. Saldo Anda tidak terpotong.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <a
            href="/"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Coba Pembelian Ulang</span>
          </a>
          <a
            href="https://wa.me/?text=Halo%20Admin%20The%20Prompt,%20pembayaran%20saya%20gagal"
            className="inline-block text-xs text-slate-400 hover:text-white transition-colors"
          >
            Butuh bantuan? Hubungi WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default function OrderFailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Memuat...</div>}>
      <FailedContent />
    </Suspense>
  );
}

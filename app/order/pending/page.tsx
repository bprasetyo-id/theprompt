'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Clock, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';

function PendingContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center text-slate-100 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto">
          <Clock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-black text-white">Menunggu Pembayaran</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Pesanan Anda dengan nomor <strong className="text-brand-400">#{orderId || '-'}</strong> sedang menunggu penyelesaian pembayaran dari pihak bank / e-wallet.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 text-left space-y-2">
          <p>• Selesaikan pembayaran sesuai instruksi Virtual Account atau QRIS yang dipilih.</p>
          <p>• Setelah transaksi lunas, sistem akan otomatis mengirimkan akses ebook ke email Anda.</p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Cek Status Pembayaran</span>
          </button>
          <a
            href="/"
            className="inline-block text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
}

export default function OrderPendingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Memuat...</div>}>
      <PendingContent />
    </Suspense>
  );
}

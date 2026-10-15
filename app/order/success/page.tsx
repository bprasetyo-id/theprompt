'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { CheckCircle2, Download, ShieldCheck, Mail, ArrowRight, Sparkles, RefreshCw, FileText } from 'lucide-react';
import { PRODUCT_TIERS } from '@/lib/tiers';
import { Order } from '@/lib/types';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [order, setOrder] = useState<Order | null>(null);
  const [downloadToken, setDownloadToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Jalankan confetti saat halaman berhasil dibuka
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }

    if (orderId) {
      fetchOrderDetails();
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/orders?orderId=${orderId}`);
      const data = await res.json();
      if (data.success && data.data) {
        setOrder(data.data);
      }
    } catch (err) {
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentTier = order ? PRODUCT_TIERS[order.tier] : null;

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-center text-slate-100">
        
        {/* Success Icon */}
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Pembayaran Berhasil Dikonfirmasi! 🎉
          </h1>
          <p className="text-sm text-slate-300">
            Terima kasih, <strong className="text-white">{order?.customerName || 'Pelanggan'}</strong>. Berkas ebook dan paket bonus Anda telah siap diunduh.
          </p>
        </div>

        {/* Order Summary Box */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-left space-y-3 text-xs">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-800/80">
            <span className="text-slate-400">Nomor Pesanan:</span>
            <span className="font-mono font-bold text-brand-400">#{orderId || 'TP-UNKNOWN'}</span>
          </div>
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-800/80">
            <span className="text-slate-400">Paket Produk:</span>
            <span className="font-semibold text-white">{currentTier ? currentTier.name : 'The Prompt Ebook'}</span>
          </div>
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-800/80">
            <span className="text-slate-400">Email Penerima:</span>
            <span className="font-semibold text-slate-200">{order?.customerEmail || '-'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Status Transaksi:</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              ● LUNAS (SETTLED)
            </span>
          </div>
        </div>

        {/* Primary Download Action */}
        <div className="space-y-3">
          <a
            href={`/api/download?token=${order?.id || 'sample'}`}
            className="w-full py-4 rounded-xl font-bold text-base bg-gradient-to-r from-brand-500 via-brand-600 to-accent-violet hover:from-brand-600 hover:to-accent-violet text-white shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            <Download className="w-5 h-5" />
            <span>UNDUH EBOOK RESMI ANDA (PDF)</span>
          </a>
          <p className="text-[11px] text-slate-400">
            * File PDF otomatis dilisensikan dengan watermark khusus atas nama dan email Anda.
          </p>
        </div>

        {/* Email Delivery Notice */}
        <div className="bg-brand-500/10 border border-brand-500/20 rounded-2xl p-4 flex items-start gap-3 text-left text-xs text-brand-200">
          <Mail className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-white">Salinan Tautan Juga Telah Dikirim ke Email:</div>
            <p className="text-slate-300">
              Periksa kotak masuk (atau folder Promotions/Spam) email <strong>{order?.customerEmail}</strong> untuk backup tautan unduhan Anda di kemudian hari.
            </p>
          </div>
        </div>

        {/* Navigation Return */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs">
          <a
            href="/"
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Kembali ke Halaman Utama
          </a>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <a
            href="/admin"
            className="text-brand-400 hover:text-brand-300 font-semibold transition-colors"
          >
            Buka Portal Admin
          </a>
        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Memuat data pesanan...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}

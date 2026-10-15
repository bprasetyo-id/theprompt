'use client';

import React, { useState } from 'react';
import { X, Lock, ShieldCheck, ShoppingBag, Sparkles, Check, Headphones, AlertCircle, Loader2 } from 'lucide-react';
import { PRODUCT_TIERS, ORDER_BUMP_PRICE, ORDER_BUMP_TITLE, ORDER_BUMP_DESC } from '@/lib/tiers';
import { ProductTier } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: ProductTier;
  onSelectTier: (tier: ProductTier) => void;
}

// Deklarasi global snap window
declare global {
  interface Window {
    snap?: any;
  }
}

export default function CheckoutModal({
  isOpen,
  onClose,
  selectedTier,
  onSelectTier,
}: CheckoutModalProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [hasOrderBump, setHasOrderBump] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const currentTier = PRODUCT_TIERS[selectedTier] || PRODUCT_TIERS.pro;
  const basePrice = currentTier.price;
  const bumpPrice = hasOrderBump ? ORDER_BUMP_PRICE : 0;
  const grandTotal = basePrice + bumpPrice;

  // Deteksi kemungkinan typo domain email umum
  const emailTypoWarning =
    email.includes('@gmai.') ||
    email.includes('@yaho.') ||
    email.includes('@hotm.') ||
    email.includes('.con');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Harap lengkapi seluruh formulir data pengiriman di bawah.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          tier: selectedTier,
          hasOrderBump,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Gagal memproses pesanan.');
      }

      const { snapToken, orderId, redirectUrl } = result.data;

      // Periksa apakah Midtrans Snap JS tersedia di browser
      if (typeof window !== 'undefined' && window.snap && snapToken && !snapToken.startsWith('SIMULATED-')) {
        window.snap.pay(snapToken, {
          onSuccess: function (resultPayload: any) {
            console.log('Payment success callback:', resultPayload);
            router.push(`/order/success?orderId=${orderId}`);
          },
          onPending: function (resultPayload: any) {
            console.log('Payment pending callback:', resultPayload);
            router.push(`/order/pending?orderId=${orderId}`);
          },
          onError: function (resultPayload: any) {
            console.error('Payment error callback:', resultPayload);
            router.push(`/order/failed?orderId=${orderId}`);
          },
          onClose: function () {
            console.log('Customer closed the payment popup window');
            setLoading(false);
          },
        });
      } else {
        // Mode Simulasi / Sandbox Cepat: Jika belum mengonfigurasi Client Key riil di Midtrans
        console.log('[LOCAL TESTING MODE] Menjalankan simulasi pembayaran...');
        const simRes = await fetch('/api/simulate-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId }),
        });

        if (simRes.ok) {
          router.push(`/order/success?orderId=${orderId}`);
        } else {
          router.push(`/order/pending?orderId=${orderId}`);
        }
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'Terjadi gangguan jaringan. Silakan coba lagi.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white">Selesaikan Pembelian Anda</h3>
            <p className="text-xs text-slate-400">Pembayaran aman dengan QRIS & Virtual Account</p>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          
          {/* Pilih Paket */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">PILIH PAKET ANDA:</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(PRODUCT_TIERS).map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => onSelectTier(t.id as ProductTier)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedTier === t.id
                      ? 'bg-brand-500/20 border-brand-500 text-white shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold truncate">{t.name.split(' ')[1] || t.name}</div>
                  <div className="text-[11px] font-semibold text-brand-300 pt-0.5">
                    Rp {(t.price / 1000).toFixed(0)}k
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Data Pelanggan */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                NAMA LENGKAP <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                ALAMAT EMAIL <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="budi@email.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
              />
              <span className="text-[10px] text-slate-400 block pt-1">
                *File ebook dan link download akan dikirimkan otomatis ke alamat email ini.
              </span>
              {emailTypoWarning && (
                <span className="text-[11px] text-amber-400 block pt-1 font-semibold">
                  ⚠️ Periksa kembali penulisan alamat email Anda agar file tidak salah kirim!
                </span>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                NOMOR WHATSAPP <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="081234567890"
                className="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
              />
              <span className="text-[10px] text-slate-400 block pt-1">
                *Digunakan untuk verifikasi darurat jika pengiriman email Anda tertunda.
              </span>
            </div>
          </div>

          {/* Order Bump Penawaran Kilat */}
          <div
            onClick={() => setHasOrderBump(!hasOrderBump)}
            className={`border rounded-2xl p-3.5 cursor-pointer transition-all flex items-start gap-3 select-none ${
              hasOrderBump
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="pt-0.5">
              <input
                type="checkbox"
                checked={hasOrderBump}
                onChange={() => {}}
                className="w-4 h-4 rounded text-amber-500 border-slate-700 focus:ring-0 cursor-pointer"
              />
            </div>
            <div className="text-xs space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-amber-400" />
                <span>Tambahkan {ORDER_BUMP_TITLE} (+ Rp {ORDER_BUMP_PRICE.toLocaleString('id-ID')})</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                {ORDER_BUMP_DESC}
              </p>
            </div>
          </div>

          {/* Rincian Total */}
          <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>{currentTier.name}</span>
              <span>Rp {basePrice.toLocaleString('id-ID')}</span>
            </div>
            {hasOrderBump && (
              <div className="flex justify-between text-amber-300">
                <span>{ORDER_BUMP_TITLE}</span>
                <span>Rp {ORDER_BUMP_PRICE.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
              <span>Total Pembayaran</span>
              <span className="text-brand-400">Rp {grandTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-extrabold text-sm sm:text-base bg-gradient-to-r from-brand-500 via-brand-600 to-accent-violet hover:from-brand-600 hover:to-accent-violet text-white shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Memproses Pesanan Anda...</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>BAYAR SEKARANG (Rp {grandTotal.toLocaleString('id-ID')})</span>
              </>
            )}
          </button>

          <div className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Enkripsi 256-Bit SSL • Garansi 100% Uang Kembali 14 Hari</span>
          </div>

        </form>

      </div>
    </div>
  );
}

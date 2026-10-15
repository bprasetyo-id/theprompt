'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Apakah buku ini cocok untuk pemula yang tidak punya latar belakang IT / teknis?',
    a: 'Sangat cocok! Ebook ini ditulis sengaja tanpa menggunakan jargon rumit yang memusingkan. Seluruh konsep dijelaskan menggunakan analogi percakapan sehari-hari dan contoh studi kasus riil yang bisa langsung Anda tiru meskipun baru pertama kali mencoba ChatGPT.',
  },
  {
    q: 'Format file apa yang akan saya dapatkan setelah membeli?',
    a: 'Anda akan mendapatkan berkas PDF berkualitas tinggi yang ramah dibaca di laptop, tablet (iPad), maupun smartphone, serta format ePub untuk aplikasi e-reader seperti Google Play Books atau Apple Books.',
  },
  {
    q: 'Bagaimana cara pengiriman ebook setelah pembayaran?',
    a: 'Pengiriman 100% otomatis secara instan! Begitu pembayaran Anda terverifikasi oleh sistem Midtrans (QRIS atau Virtual Account), tautan unduh aman akan langsung muncul di layar Anda dan salinannya dikirimkan otomatis ke alamat email yang Anda daftarkan.',
  },
  {
    q: 'Apa saja metode pembayaran yang diterima?',
    a: 'Kami menerima QRIS (bisa di-scan dari BCA Mobile, Livin Mandiri, GoPay, OVO, ShopeePay, DANA), Virtual Account seluruh bank nasional (BCA, Mandiri, BNI, BRI, Permata), dan Kartu Kredit.',
  },
  {
    q: 'Apakah saya mendapatkan update gratis jika ada perkembangan model AI baru?',
    a: 'Bagi pembeli Paket Pro dan VIP Complete Bundle, Anda berhak mendapatkan seluruh pembaruan edisi revisi masa depan (Life-time free updates) secara cuma-cuma yang akan langsung kami kirimkan ke email Anda.',
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-900/40 border-t border-slate-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
            <HelpCircle className="w-3.5 h-3.5 text-brand-400" />
            <span>Pertanyaan yang Sering Diajukan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Masih Ada Keraguan? Kami Punya Jawabannya
          </h2>
        </div>

        {/* Accordion FAQ */}
        <div className="mt-12 space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-800 rounded-2xl bg-slate-950/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-brand-300 bg-brand-500/20' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-800 text-sm text-slate-300 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

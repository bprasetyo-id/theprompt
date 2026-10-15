'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">The Prompt: Seni Berbicara Dengan AI</div>
            <div className="text-[11px] text-slate-500">Karya Budhi Prasetyo • Bogor, 2026 • 400+ Halaman • Seluruh Hak Cipta Dilindungi.</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
          <a href="#" className="hover:text-white transition-colors">Kebijakan Pengembalian Dana</a>
          <a href="/admin" className="hover:text-brand-400 transition-colors">Dashboard Admin</a>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <a
            href="https://wa.me/?text=Halo%20Admin%20The%20Prompt,%20saya%20tertarik%20dengan%20ebook%20ini"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp CS</span>
          </a>
          <span>•</span>
          <a href="mailto:halo@theprompt.id" className="flex items-center gap-1.5 hover:text-brand-400 transition-colors">
            <Mail className="w-4 h-4 text-brand-400" />
            <span>Email</span>
          </a>
        </div>

      </div>
    </footer>
  );
}

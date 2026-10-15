'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, ShieldCheck, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOpenCheckout: () => void;
}

export default function Navbar({ onOpenCheckout }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-violet flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-brand-200" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              The Prompt
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
                Ebook
              </span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Seni Berbicara Dengan AI • Budhi Prasetyo</span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#masalah" className="hover:text-brand-400 transition-colors">
            Masalah AI
          </a>
          <a href="#daftar-isi" className="hover:text-brand-400 transition-colors">
            Daftar Isi
          </a>
          <a href="#bonus" className="hover:text-brand-400 transition-colors">
            Bonus
          </a>
          <a href="#testimoni" className="hover:text-brand-400 transition-colors">
            Testimoni
          </a>
          <a href="#harga" className="hover:text-brand-400 transition-colors">
            Paket Harga
          </a>
          <a href="#faq" className="hover:text-brand-400 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="/admin"
            className="hidden sm:inline-flex text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all"
          >
            Portal Admin
          </a>
          <button
            onClick={onOpenCheckout}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Beli Sekarang</span>
          </button>
        </div>
      </div>
    </header>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  DollarSign,
  CheckCircle2,
  Clock,
  Download,
  Send,
  RefreshCw,
  Search,
  ArrowLeft,
  FileCheck,
  ShieldAlert,
} from 'lucide-react';
import { Order } from '@/lib/types';
import { PRODUCT_TIERS } from '@/lib/tiers';

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Custom watermark tester state
  const [testName, setTestName] = useState('Budi Santoso');
  const [testEmail, setTestEmail] = useState('budi.santoso@example.com');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulatePayment = async (orderId: string) => {
    setProcessingId(orderId);
    setActionMessage('');
    try {
      const res = await fetch('/api/simulate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`✓ Sukses: Order #${orderId} telah ditandai LUNAS dan email pengiriman diproses!`);
        fetchOrders();
      } else {
        setActionMessage(`❌ Error: ${data.error}`);
      }
    } catch (err: any) {
      setActionMessage(`❌ Error: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  // Metrics Calculation
  const totalOrders = orders.length;
  const paidOrders = orders.filter((o) => o.status === 'PAID');
  const pendingOrders = orders.filter((o) => o.status === 'PENDING');
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <a href="/" className="text-slate-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </a>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Portal Admin & Testing Simulator
              </h1>
            </div>
            <p className="text-xs text-slate-400 pt-1">
              Pantau transaksi penjualan ebook, kelola status pesanan, dan uji coba sistem watermarking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Muat Ulang Data</span>
            </button>
            <a
              href="/"
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              Buka Landing Page
            </a>
          </div>
        </div>

        {actionMessage && (
          <div className="p-4 bg-brand-500/10 border border-brand-500/30 rounded-2xl text-xs sm:text-sm font-semibold text-brand-300">
            {actionMessage}
          </div>
        )}

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Omzet Penjualan</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </div>
            <div className="text-[11px] text-emerald-400">Dari {paidOrders.length} transaksi berhasil</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Pesanan Masuk</span>
              <ShoppingBag className="w-4 h-4 text-brand-400" />
            </div>
            <div className="text-2xl font-black text-white">{totalOrders}</div>
            <div className="text-[11px] text-slate-400">Semua status order</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Transaksi Sukses</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">{paidOrders.length}</div>
            <div className="text-[11px] text-slate-400">
              Konversi: {totalOrders > 0 ? ((paidOrders.length / totalOrders) * 100).toFixed(1) : 0}%
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Menunggu Pembayaran</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400">{pendingOrders.length}</div>
            <div className="text-[11px] text-slate-400">Pending QRIS / VA</div>
          </div>
        </div>

        {/* Section: Sandbox Simulator & Tester */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-brand-400" />
            <h2 className="text-base font-bold text-white">
              Simulator Watermark PDF Instan
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Gunakan alat ini untuk menguji bagaimana sistem <code>pdf-lib</code> menyuntikkan watermark diagonal anti-pembajakan dan lisensi permanen ke dalam berkas PDF.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Nama Tester"
              className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-brand-500"
            />
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Email Tester"
              className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-brand-500"
            />
            <a
              href={`/api/download?token=sample`}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Tes Unduh PDF Ter-watermark</span>
            </a>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl space-y-4 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Daftar Transaksi Pesanan</h2>
              <p className="text-xs text-slate-400">Total {filteredOrders.length} transaksi ditemukan</p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama, email, atau order ID..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold border-y border-slate-800">
                <tr>
                  <th className="py-3 px-4">Order ID & Waktu</th>
                  <th className="py-3 px-4">Pembeli</th>
                  <th className="py-3 px-4">Paket & Bump</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi Cepat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      {loading ? 'Memuat data pesanan...' : 'Belum ada transaksi pesanan yang dibuat. Coba lakukan pembelian di landing page!'}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => {
                    const tier = PRODUCT_TIERS[ord.tier];
                    const isPaid = ord.status === 'PAID';
                    return (
                      <tr key={ord.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-mono font-bold text-brand-400">#{ord.id}</div>
                          <div className="text-[10px] text-slate-500 pt-0.5">
                            {new Date(ord.createdAt).toLocaleString('id-ID')}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{ord.customerName}</div>
                          <div className="text-[11px] text-slate-400">{ord.customerEmail}</div>
                          <div className="text-[10px] text-slate-500">{ord.customerPhone}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-200">{tier ? tier.name : ord.tier}</div>
                          {ord.hasOrderBump && (
                            <span className="inline-block mt-0.5 px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded text-[10px] font-medium">
                              + Audio Summary
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-white">
                          Rp {ord.totalAmount.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3.5 px-4">
                          {isPaid ? (
                            <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              ● PAID
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                              ● PENDING
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          {!isPaid && (
                            <button
                              onClick={() => handleSimulatePayment(ord.id)}
                              disabled={processingId === ord.id}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors disabled:opacity-50"
                            >
                              {processingId === ord.id ? 'Memproses...' : 'Tandai Lunas'}
                            </button>
                          )}
                          <a
                            href={`/api/download?token=${ord.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors"
                          >
                            <Download className="w-3 h-3" />
                            <span>Unduh PDF</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Prompt - Seni Berbicara dengan AI | Ebook Panduan Praktis',
  description:
    'Kuasai cara menyusun prompt presisi tinggi untuk ChatGPT, Claude, dan Gemini. Hemat 15+ jam kerja setiap minggu dengan studi kasus nyata Bahasa Indonesia.',
  keywords: [
    'the prompt',
    'seni berbicara dengan ai',
    'ebook prompt engineering',
    'chatgpt indonesia',
    'panduan prompt ai',
  ],
  openGraph: {
    title: 'The Prompt - Seni Berbicara dengan AI',
    description: 'Buku panduan prompt engineering nomor 1 di Indonesia. Hemat waktu dan tingkatkan kualitas jawaban AI hingga 10x lipat.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
  const snapScriptUrl = isProduction
    ? 'https://app.midtrans.com/snap/snap.js'
    : 'https://app.sandbox.midtrans.com/snap/snap.js';
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-sample-key';

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        {children}

        {/* Script Midtrans Snap Popup */}
        <Script
          src={snapScriptUrl}
          data-client-key={clientKey}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

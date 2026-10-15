import { NextResponse } from 'next/server';
import { getDownloadToken, incrementDownloadCount, getOrder } from '@/lib/store';
import { ensureMasterPdf, stampDynamicWatermark } from '@/lib/watermark';
import { DownloadToken } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new NextResponse(renderErrorPage('Tautan Tidak Valid', 'Tautan unduhan tidak menyertakan token keamanan yang sah.'), {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  let tokenData = await getDownloadToken(token);

  // Jika token belum ditemukan, periksa apakah token adalah orderId atau mode sample testing
  if (!tokenData) {
    const order = await getOrder(token);
    if (order) {
      tokenData = {
        id: order.id,
        token: order.id,
        orderId: order.id,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        tier: order.tier,
        downloadCount: 0,
        maxDownloads: 10,
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        createdAt: order.createdAt,
      };
    } else if (token === 'sample' || token.startsWith('SIMULATED-')) {
      tokenData = {
        id: 'sample-id',
        token: 'sample',
        orderId: 'TP-SAMPLE-PREVIEW',
        customerName: 'Pembeli Resmi (Tester)',
        customerEmail: 'pembeli@theprompt.id',
        tier: 'pro',
        downloadCount: 0,
        maxDownloads: 99,
        expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
      };
    }
  }

  if (!tokenData) {
    return new NextResponse(renderErrorPage('Tautan Tidak Ditemukan', 'Token unduhan ini tidak terdaftar dalam sistem kami atau telah dihapus.'), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // Cek apakah masa berlaku sudah habis
  const now = new Date();
  const expiresAt = new Date(tokenData.expiresAt);
  if (now > expiresAt) {
    return new NextResponse(
      renderErrorPage(
        'Tautan Telah Kedaluwarsa',
        `Demi alasan keamanan aset digital, tautan unduhan berlaku 48 jam dan telah berakhir pada ${expiresAt.toLocaleString('id-ID')}. Silakan hubungi admin untuk memperpanjang tautan Anda.`
      ),
      {
        status: 410,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    );
  }

  // Cek kuota unduhan
  if (tokenData.downloadCount >= tokenData.maxDownloads) {
    return new NextResponse(
      renderErrorPage(
        'Batas Unduhan Tercapai',
        `Anda telah mengunduh berkas ini sebanyak ${tokenData.maxDownloads} kali (batas maksimal per tautan). Jika Anda kehilangan berkas Anda, silakan hubungi tim kami melalui email atau WhatsApp resmi untuk reset kuota.`
      ),
      {
        status: 429,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    );
  }

  try {
    // Ambil master PDF (menghasilkan dokumen default jika file belum diunggah)
    const masterBuffer = await ensureMasterPdf();

    // Suntikkan Dynamic Watermark Nama & Email Pembeli
    const watermarkedPdf = await stampDynamicWatermark(
      masterBuffer,
      tokenData.customerName,
      tokenData.customerEmail,
      tokenData.orderId
    );

    // Tambah counter unduhan di database
    await incrementDownloadCount(token);

    const filename = `The-Prompt-Seni-Berbicara-dengan-AI-${tokenData.tier.toUpperCase()}.pdf`;

    return new NextResponse(Buffer.from(watermarkedPdf), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error('Error generating watermarked PDF:', error);
    return new NextResponse(renderErrorPage('Gagal Memproses Berkas', 'Terjadi kesalahan sistem saat membubuhkan lisensi personal pada berkas PDF Anda. Silakan coba kembali sesaat lagi.'), {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}

function renderErrorPage(title: string, message: string): string {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - The Prompt</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: #020617;
          color: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          padding: 20px;
        }
        .card {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 16px;
          padding: 36px;
          max-width: 480px;
          text-align: center;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
        }
        h1 { color: #ef4444; margin-top: 0; font-size: 22px; }
        p { color: #94a3b8; font-size: 15px; line-height: 1.6; }
        .btn {
          display: inline-block;
          margin-top: 24px;
          background: #0c87eb;
          color: #fff;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>⚠️ ${title}</h1>
        <p>${message}</p>
        <a href="https://wa.me/?text=Halo%20Admin%20The%20Prompt,%20saya%20mengalami%20kendala%20unduhan%20ebook" class="btn">Hubungi WhatsApp Support</a>
      </div>
    </body>
    </html>
  `;
}

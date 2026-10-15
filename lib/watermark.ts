import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';

const ASSETS_DIR = path.join(process.cwd(), 'assets');
const MASTER_PDF_PATH = path.join(ASSETS_DIR, 'the-prompt-master.pdf');

/**
 * Membuat file PDF master dummy jika belum tersedia di assets/
 * agar sistem watermarking dapat langsung diuji coba tanpa error.
 */
export async function ensureMasterPdf(): Promise<Buffer> {
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  if (fs.existsSync(MASTER_PDF_PATH)) {
    return fs.readFileSync(MASTER_PDF_PATH);
  }

  console.log('[MASTER PDF] Menghasilkan file PDF master The Prompt untuk sample...');
  const doc = await PDFDocument.create();
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);

  // Halaman 1: Cover
  const coverPage = doc.addPage([595.28, 841.89]); // A4
  const { width, height } = coverPage.getSize();

  // Background cover hitam pekat elegan seperti PDF asli
  coverPage.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.02, 0.02, 0.02),
  });

  coverPage.drawText('THE PROMPT', {
    x: 60,
    y: height - 220,
    size: 40,
    font: fontBold,
    color: rgb(1.0, 1.0, 1.0),
  });

  coverPage.drawText('Seni Berbicara Dengan AI', {
    x: 60,
    y: height - 265,
    size: 22,
    font: fontRegular,
    color: rgb(0.85, 0.9, 0.95),
  });

  coverPage.drawText('BUDHI PRASETYO', {
    x: 60,
    y: 120,
    size: 16,
    font: fontBold,
    color: rgb(0.8, 0.8, 0.8),
  });

  coverPage.drawText('Bogor, 2026 • 400+ Halaman • 20 Bab • Kerangka PKIF', {
    x: 60,
    y: 90,
    size: 11,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Halaman 2: Bab 1 Sneak Peek
  const page2 = doc.addPage([595.28, 841.89]);
  page2.drawText('BAB 1: Kamu Tidak Sendirian. Ini Masalah Semua Orang!', {
    x: 60,
    y: height - 80,
    size: 16,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.1),
  });

  page2.drawText(
    '84% masyarakat Indonesia yang terhubung ke internet sudah mencoba AI,\n' +
    'namun indeks literasi AI kita baru menyentuh angka 49,9 dari 100.\n\n' +
    'Bukan salah kamu, dan bukan salah AI-nya! Masalahnya ada di celah komunikasi.\n' +
    'Kuasai Kerangka PKIF (Peran, Konteks, Instruksi, Format) di buku ini.\n\n' +
    'Selamat membaca dan selamat naik level!\n— Budhi Prasetyo (Bogor, 2026)',
    {
      x: 60,
      y: height - 130,
      size: 11,
      font: fontRegular,
      color: rgb(0.25, 0.25, 0.25),
      lineHeight: 18,
    }
  );

  const pdfBytes = await doc.save();
  const buffer = Buffer.from(pdfBytes);
  fs.writeFileSync(MASTER_PDF_PATH, buffer);
  return buffer;
}

/**
 * Menyuntikkan watermark dinamis (nama pembeli, email, nomor order)
 * di setiap halaman dokumen PDF secara otomatis.
 */
export async function stampDynamicWatermark(
  originalPdfBuffer: Buffer,
  buyerName: string,
  buyerEmail: string,
  orderNumber: string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(originalPdfBuffer);
  const pages = pdfDoc.getPages();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const diagonalWatermark = `DILISENSIKAN KEPADA: ${buyerName.toUpperCase()} (${buyerEmail})`;
  const footerWatermark = `The Prompt: Seni Berbicara Dengan AI | Penulis: Budhi Prasetyo | Pembeli Resmi: ${buyerEmail} | Order #${orderNumber}`;

  for (const page of pages) {
    const { width, height } = page.getSize();

    // 1. Watermark diagonal transparan di tengah halaman (Anti-Piracy)
    page.drawText(diagonalWatermark, {
      x: width * 0.15,
      y: height * 0.45,
      size: 13,
      font: fontBold,
      color: rgb(0.7, 0.72, 0.75),
      opacity: 0.18,
      rotate: degrees(45),
    });

    // 2. Footer kecil di bagian bawah setiap lembar halaman
    page.drawText(footerWatermark, {
      x: 35,
      y: 18,
      size: 7.5,
      font: fontRegular,
      color: rgb(0.4, 0.45, 0.5),
      opacity: 0.85,
    });
  }

  return await pdfDoc.save();
}

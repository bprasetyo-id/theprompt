import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getOrder, updateOrder, createDownloadToken } from '@/lib/store';
import { sendDeliveryEmail } from '@/lib/email';
import { PRODUCT_TIERS } from '@/lib/tiers';
import { DownloadToken } from '@/lib/types';

/**
 * Endpoint Simulasi Pembayaran (Khusus Testing & UAT)
 * Berguna saat developer / merchant ingin menguji alur pembayaran berhasil
 * tanpa harus membuka simulator Midtrans secara eksternal.
 */
export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ success: false, error: 'Order ID wajib diisi.' }, { status: 400 });
    }

    const order = await getOrder(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order tidak ditemukan.' }, { status: 404 });
    }

    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
    const secureToken = crypto.randomBytes(32).toString('hex');

    const downloadTokenData: DownloadToken = {
      id: crypto.randomUUID(),
      token: secureToken,
      orderId: order.id,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      tier: order.tier,
      downloadCount: 0,
      maxDownloads: 5,
      expiresAt,
      createdAt: now,
    };

    await createDownloadToken(downloadTokenData);

    await updateOrder(order.id, {
      status: 'PAID',
      paymentType: 'qris_simulated',
      paidAt: now,
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const downloadUrl = `${baseUrl}/api/download?token=${secureToken}`;
    const tierInfo = PRODUCT_TIERS[order.tier];

    await sendDeliveryEmail({
      toEmail: order.customerEmail,
      recipientName: order.customerName,
      orderId: order.id,
      tierName: tierInfo ? tierInfo.name : 'The Prompt Ebook',
      totalAmount: order.totalAmount,
      downloadUrl,
      expiresInHours: 48,
    });

    return NextResponse.json({
      success: true,
      message: 'Simulasi pembayaran sukses berhasil diproses!',
      data: {
        orderId: order.id,
        status: 'PAID',
        token: secureToken,
        downloadUrl,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

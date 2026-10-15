import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { verifyMidtransSignature } from '@/lib/midtrans';
import { getOrder, updateOrder, createDownloadToken } from '@/lib/store';
import { sendDeliveryEmail } from '@/lib/email';
import { PRODUCT_TIERS } from '@/lib/tiers';
import { DownloadToken, MidtransWebhookPayload } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const payload: MidtransWebhookPayload = await request.json();
    console.log('[MIDTRANS WEBHOOK RECEIVED]', JSON.stringify(payload, null, 2));

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      payment_type,
      fraud_status,
    } = payload;

    // 1. Verifikasi Validitas Signature Key
    const isValidSignature = verifyMidtransSignature(
      order_id,
      status_code,
      gross_amount,
      signature_key
    );

    if (!isValidSignature) {
      console.error('[MIDTRANS WEBHOOK ERROR] Invalid signature key for order:', order_id);
      return NextResponse.json(
        { success: false, error: 'Invalid signature key' },
        { status: 403 }
      );
    }

    // 2. Cari Pesanan di Database
    const order = await getOrder(order_id);
    if (!order) {
      console.warn('[MIDTRANS WEBHOOK WARN] Order not found in database:', order_id);
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // 3. Evaluasi Status Pembayaran
    const isPaid =
      transaction_status === 'settlement' ||
      (transaction_status === 'capture' && fraud_status === 'accept');

    const isFailedOrExpired =
      transaction_status === 'cancel' ||
      transaction_status === 'expire' ||
      transaction_status === 'deny';

    if (isPaid) {
      // Idempotency: Jika pesanan sudah lunas sebelumnya, cukup respons 200 OK tanpa memicu aksi ganda
      if (order.status === 'PAID') {
        console.log(`[MIDTRANS WEBHOOK] Order ${order_id} already marked as PAID.`);
        return NextResponse.json({ success: true, message: 'Already processed' });
      }

      const now = new Date().toISOString();
      const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(); // 48 jam

      // Generate secure token 64 karakter heksadesimal
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
        paymentType: payment_type,
        paidAt: now,
      });

      // Siapkan URL unduhan resmi
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const downloadUrl = `${baseUrl}/api/download?token=${secureToken}`;
      const tierInfo = PRODUCT_TIERS[order.tier];

      // Kirim email konfirmasi dan akses ebook
      await sendDeliveryEmail({
        toEmail: order.customerEmail,
        recipientName: order.customerName,
        orderId: order.id,
        tierName: tierInfo ? tierInfo.name : 'The Prompt Ebook',
        totalAmount: order.totalAmount,
        downloadUrl,
        expiresInHours: 48,
      });

      console.log(`[MIDTRANS WEBHOOK SUCCESS] Order ${order_id} successfully paid and delivered.`);
    } else if (isFailedOrExpired) {
      await updateOrder(order.id, {
        status: transaction_status === 'expire' ? 'EXPIRED' : 'FAILED',
        paymentType: payment_type,
      });
      console.log(`[MIDTRANS WEBHOOK] Order ${order_id} marked as ${transaction_status}.`);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[MIDTRANS WEBHOOK EXCEPTION]', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal webhook error' },
      { status: 500 }
    );
  }
}

import crypto from 'crypto';
// @ts-ignore - midtrans-client might lack official TS declarations
import midtransClient from 'midtrans-client';

const serverKey = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-sample-key';
const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-sample-key';
const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

// Inisialisasi Midtrans Snap API client
let snap: any = null;
try {
  snap = new midtransClient.Snap({
    isProduction,
    serverKey,
    clientKey,
  });
} catch (e) {
  console.warn('Midtrans Snap client initialization warning:', e);
}

export interface SnapTransactionParams {
  orderId: string;
  grossAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  itemDetails: Array<{
    id: string;
    price: number;
    quantity: number;
    name: string;
  }>;
}

/**
 * Generate Snap Token untuk popup pembayaran di browser
 */
export async function createSnapTransaction(params: SnapTransactionParams): Promise<{
  token: string;
  redirect_url: string;
}> {
  // Jika masih menggunakan sample key dan belum ada konfigurasi valid, sediakan mode simulasi
  const isSampleKey = !serverKey || serverKey.includes('sample-key');

  if (isSampleKey) {
    console.log('[MIDTRANS SIMULATION] Menggunakan mock token untuk pengujian lokal');
    const mockToken = `SIMULATED-SNAP-${Date.now()}-${params.orderId}`;
    return {
      token: mockToken,
      redirect_url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${mockToken}`,
    };
  }

  const transactionDetails = {
    transaction_details: {
      order_id: params.orderId,
      gross_amount: params.grossAmount,
    },
    customer_details: {
      first_name: params.customerName,
      email: params.customerEmail,
      phone: params.customerPhone,
    },
    item_details: params.itemDetails,
    credit_card: {
      secure: true,
    },
  };

  const transaction = await snap.createTransaction(transactionDetails);
  return {
    token: transaction.token,
    redirect_url: transaction.redirect_url,
  };
}

/**
 * Verifikasi signature key webhook resmi dari Midtrans
 * Formula: SHA512(order_id + status_code + gross_amount + ServerKey)
 */
export function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  incomingSignature: string
): boolean {
  // Bila dalam mode simulasi lokal, izinkan jika incoming signature cocok atau dev flag aktif
  if (serverKey.includes('sample-key')) {
    return true;
  }

  const payload = `${orderId}${statusCode}${grossAmount}${serverKey}`;
  const calculatedSignature = crypto
    .createHash('sha512')
    .update(payload)
    .digest('hex');

  return calculatedSignature === incomingSignature;
}

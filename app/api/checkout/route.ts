import { NextResponse } from 'next/server';
import { PRODUCT_TIERS, ORDER_BUMP_PRICE, ORDER_BUMP_TITLE } from '@/lib/tiers';
import { createOrder } from '@/lib/store';
import { createSnapTransaction } from '@/lib/midtrans';
import { Order, ProductTier } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, tier, hasOrderBump } = body;

    if (!name || !email || !phone || !tier) {
      return NextResponse.json(
        { success: false, error: 'Harap lengkapi nama, email, nomor WhatsApp, dan paket pilihan Anda.' },
        { status: 400 }
      );
    }

    const selectedTier = PRODUCT_TIERS[tier as ProductTier];
    if (!selectedTier) {
      return NextResponse.json(
        { success: false, error: 'Paket produk tidak valid.' },
        { status: 400 }
      );
    }

    // Hitung total harga
    let totalAmount = selectedTier.price;
    const itemDetails: Array<{
      id: string;
      price: number;
      quantity: number;
      name: string;
    }> = [
      {
        id: selectedTier.id,
        price: selectedTier.price,
        quantity: 1,
        name: `The Prompt - ${selectedTier.name}`.slice(0, 50),
      },
    ];

    if (hasOrderBump) {
      totalAmount += ORDER_BUMP_PRICE;
      itemDetails.push({
        id: 'order-bump-audio',
        price: ORDER_BUMP_PRICE,
        quantity: 1,
        name: ORDER_BUMP_TITLE.slice(0, 50),
      });
    }

    // Buat nomor faktur unik: TP-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `TP-${dateStr}-${randomSuffix}`;

    // Minta Snap Token dari Midtrans
    const snapResult = await createSnapTransaction({
      orderId,
      grossAmount: totalAmount,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      itemDetails,
    });

    const now = new Date().toISOString();
    const newOrder: Order = {
      id: orderId,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      tier: tier as ProductTier,
      hasOrderBump: !!hasOrderBump,
      totalAmount,
      status: 'PENDING',
      snapToken: snapResult.token,
      snapRedirectUrl: snapResult.redirect_url,
      createdAt: now,
      updatedAt: now,
    };

    await createOrder(newOrder);

    return NextResponse.json({
      success: true,
      data: {
        orderId,
        snapToken: snapResult.token,
        redirectUrl: snapResult.redirect_url,
        totalAmount,
      },
    });
  } catch (error: any) {
    console.error('Error handling checkout request:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan sistem saat memproses checkout.' },
      { status: 500 }
    );
  }
}

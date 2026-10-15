import { NextResponse } from 'next/server';
import { listOrders, getOrder } from '@/lib/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  if (orderId) {
    const order = await getOrder(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Pesanan tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: order });
  }

  const orders = await listOrders();
  return NextResponse.json({ success: true, data: orders });
}

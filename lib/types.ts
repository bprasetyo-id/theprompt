export type ProductTier = 'starter' | 'pro' | 'vip';

export interface TierConfig {
  id: ProductTier;
  name: string;
  badge?: string;
  originalPrice: number;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface Order {
  id: string;              // e.g. TP-20261015-8942
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tier: ProductTier;
  hasOrderBump: boolean;
  totalAmount: number;     // in IDR
  status: 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED';
  snapToken?: string;
  snapRedirectUrl?: string;
  paymentType?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DownloadToken {
  id: string;
  token: string;
  orderId: string;
  customerEmail: string;
  customerName: string;
  tier: ProductTier;
  downloadCount: number;
  maxDownloads: number;
  expiresAt: string;
  createdAt: string;
}

export interface MidtransWebhookPayload {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
  transaction_status: string;
  payment_type: string;
  transaction_id: string;
  transaction_time: string;
  fraud_status?: string;
}

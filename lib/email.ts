export interface SendDeliveryEmailParams {
  toEmail: string;
  recipientName: string;
  orderId: string;
  tierName: string;
  totalAmount: number;
  downloadUrl: string;
  expiresInHours: number;
}

/**
 * Mengirim email transaksional konfirmasi pembayaran dan link unduh aman.
 * Jika RESEND_API_KEY belum dikonfigurasi, sistem akan menampilkan draf isi email di terminal
 * agar alur transaksi tidak terputus dan developer dapat melihat isi pesan secara transparan.
 */
export async function sendDeliveryEmail(params: SendDeliveryEmailParams): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || 'The Prompt <halo@theprompt.id>';

  const emailSubject = `Akses Ebook Anda: The Prompt - Seni Berbicara dengan AI 🚀 [Order #${params.orderId}]`;

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #0c87eb; margin: 0; font-size: 26px;">The Prompt</h1>
        <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Seni Berbicara dengan AI</p>
      </div>

      <p style="font-size: 16px; line-height: 1.6;">Hai <strong>${params.recipientName}</strong>,</p>
      
      <p style="font-size: 15px; line-height: 1.6;">
        Selamat! Pembayaran Anda untuk <strong>${params.tierName}</strong> telah berhasil kami terima.
        Terima kasih banyak telah berinvestasi untuk meningkatkan kemampuan Anda berinteraksi dengan AI.
      </p>

      <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin: 20px 0; border-left: 4px solid #0c87eb;">
        <p style="margin: 4px 0; font-size: 14px;"><strong>Nomor Pesanan:</strong> #${params.orderId}</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Paket Produk:</strong> ${params.tierName}</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Total Pembayaran:</strong> Rp ${params.totalAmount.toLocaleString('id-ID')}</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">LUNAS</span></p>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${params.downloadUrl}" style="background-color: #0c87eb; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
          📥 UNDUH EBOOK & BONUS ANDA
        </a>
      </div>

      <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
        * Demi keamanan hak cipta, file PDF telah dilisensikan secara khusus atas nama dan email Anda.
        Tautan di atas berlaku selama ${params.expiresInHours} jam ke depan. Harap segera unduh dan simpan berkas di komputer/perangkat Anda.
      </p>

      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />

      <p style="font-size: 13px; color: #94a3b8; text-align: center;">
        Ada kendala saat membuka file? Balas langsung email ini atau hubungi kami melalui WhatsApp support resmi.<br/>
        &copy; 2026 The Prompt. Seluruh Hak Cipta Dilindungi.
      </p>
    </div>
  `;

  if (!resendApiKey) {
    console.log('\n======================================================');
    console.log('📨 [SIMULATED EMAIL DISPATCH - RESEND API KEY NOT SET]');
    console.log(`To: ${params.toEmail} (${params.recipientName})`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`Download URL: ${params.downloadUrl}`);
    console.log('======================================================\n');
    return {
      success: true,
      messageId: `simulated-${Date.now()}`,
    };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: params.toEmail,
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Error from Resend API:', data);
      return { success: false, error: data.message || 'Gagal mengirim email' };
    }

    return { success: true, messageId: data.id };
  } catch (err: any) {
    console.error('Network error sending email via Resend:', err);
    return { success: false, error: err.message };
  }
}

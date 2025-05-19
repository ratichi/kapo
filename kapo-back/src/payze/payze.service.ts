import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PayzeService {
  private readonly API_URL = 'https://payze.io/api/v1';
  private readonly SECRET_KEY = '100F35A63A834BD499C5492A7E416AFB';

async createPayment(amount: number, callbackUrl: string, email: string, phone: string) {
  // Convert amount to smallest currency unit
  const amountInTetri = Math.round(amount * 100);

  try {
    const response = await axios.post(`${this.API_URL}/init-payment`, {
      amount: amountInTetri,
      callback: callbackUrl,
      email,
      phone,
      lang: 'KA',
      merchantPaymentId: `order-${Date.now()}`,
      // hookUrl is optional, omit or provide if you have a real URL
      // hookUrl: 'https://your-public-webhook-url.com/payze-webhook',
    }, {
      headers: {
        Authorization: `Bearer ${this.SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = response.data as { transactionUrl: string };
    if (!data.transactionUrl) {
      throw new Error('Failed to get transaction URL from Payze');
    }
    return data.transactionUrl;
  } catch (error: any) {
    if (error.response) {
      console.error('Payze API error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response from Payze API:', error.request);
    } else {
      console.error('Axios error:', error.message);
    }
    throw error;
  }
}


}

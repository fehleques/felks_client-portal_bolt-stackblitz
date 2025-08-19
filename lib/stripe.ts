type StripeClient = any;
let stripe: StripeClient | null = null;

export function getStripe(): StripeClient {
  if (!stripe) {
    const Stripe = require('stripe');
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16',
    });
  }
  return stripe;
}

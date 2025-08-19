import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const sig = req.headers.get('stripe-signature') || ''
  const raw = await req.text()
  let event
  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    console.log('Checkout session completed')
    // Persist subscription details to your storage here
  }

  return NextResponse.json({ received: true })
}

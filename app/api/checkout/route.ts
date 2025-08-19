import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST() {
  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/client/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/client/dashboard`,
    })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'stripe_error' }, { status: 500 })
  }
}

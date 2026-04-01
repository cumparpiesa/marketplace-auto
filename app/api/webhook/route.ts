import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()

  // 🔥 FIX AICI
  const headerList = await headers()
  const sig = headerList.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  // 🔥 aici tratezi evenimente Stripe
  if (event.type === "checkout.session.completed") {
    console.log("Plată completată")
  }

  return NextResponse.json({ received: true })
}
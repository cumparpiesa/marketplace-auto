import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }

  // 🔥 aici poți trata plata (opțional)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any

    console.log("Plată reușită pentru:", session.metadata.user_id)
  }

  return NextResponse.json({ received: true })
}
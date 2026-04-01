import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

// 🔥 fără apiVersion (IMPORTANT)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: Request) {
  try {
    const body = await req.text()

    const headersList = await headers()
    const sig = headersList.get("stripe-signature")

    if (!sig) {
      return new NextResponse("No signature", { status: 400 })
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!webhookSecret) {
      return new NextResponse("Webhook secret missing", { status: 500 })
    }

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      webhookSecret
    )

    if (event.type === "checkout.session.completed") {
      console.log("✅ Payment success")
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.log("🔥 ERROR:", err.message)
    return new NextResponse("Error", { status: 500 })
  }
}
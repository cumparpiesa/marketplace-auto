import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

// 🔐 Stripe init
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
})

export async function POST(req: Request) {
  try {
    // 📦 body RAW (important pentru Stripe)
    const body = await req.text()

    // 🔥 FIX IMPORTANT (headers async)
    const headersList = await headers()
    const sig = headersList.get("stripe-signature")

    if (!sig) {
      console.log("❌ No stripe signature")
      return new NextResponse("No signature", { status: 400 })
    }

    // 🔐 verificare webhook secret
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.log("❌ Missing STRIPE_WEBHOOK_SECRET")
      return new NextResponse("Webhook secret missing", { status: 500 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        webhookSecret
      )
    } catch (err: any) {
      console.log("❌ Webhook signature error:", err.message)
      return new NextResponse(`Webhook Error: ${err.message}`, {
        status: 400,
      })
    }

    // 🎯 HANDLE EVENTS
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      console.log("✅ Payment successful:", session.id)

      // 👉 AICI faci ce vrei:
      // ex:
      // - marchezi firma ca PRO
      // - salvezi plata în DB
      // - activezi promovare

      // EXEMPLU:
      // await supabase.from("firme").update({ promoted: true }).eq("id", ...)
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.log("🔥 STRIPE WEBHOOK ERROR:", err.message)
    return new NextResponse("Server error", { status: 500 })
  }
}
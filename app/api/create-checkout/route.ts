import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST() {
  try {
    console.log("START CHECKOUT")

    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("❌ STRIPE_SECRET_KEY missing")
    }

    if (!process.env.NEXT_PUBLIC_URL) {
      throw new Error("❌ NEXT_PUBLIC_URL missing")
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    console.log("Stripe init OK")

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: "Promovare firmă",
            },
            unit_amount: 30000,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    })

    console.log("SESSION CREATED:", session.id)

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("🔥 STRIPE FULL ERROR:", err)
    return NextResponse.json(
      { error: err.message || "Stripe error" },
      { status: 500 }
    )
  }
}
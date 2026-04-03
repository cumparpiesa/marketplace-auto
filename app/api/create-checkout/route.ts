import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(req: Request) {
  const { type, user_id } = await req.json()

  let price = ""
  let metadata: any = { user_id }

  // 🔥 abonament
  if (type === "pro") {
    price = "price_PRO_ID"
    metadata.type = "subscription"
  }

  // 🔥 credite
  if (type === "credits") {
    price = "price_CREDITS_ID"
    metadata.type = "credits"
    metadata.amount = 100
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
    metadata,
  })

  return NextResponse.json({ url: session.url })
}
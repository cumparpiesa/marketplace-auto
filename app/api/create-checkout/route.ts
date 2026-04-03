import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { plan, email } = await req.json()

  let price = 0
  let name = ""

  if (plan === "business") {
    price = 300
    name = "Abonament BUSINESS"
  }

  if (plan === "gold") {
    price = 500
    name = "Abonament GOLD"
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: email,
    metadata: {
      plan,
      email,
    },
    line_items: [
      {
        price_data: {
          currency: "ron",
          product_data: { name },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/abonament`,
  })

  return NextResponse.json({ url: session.url })
}
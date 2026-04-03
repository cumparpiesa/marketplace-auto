import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  const { plan } = await req.json()

  let price = 0

  if (plan === "business") price = 30000 // 300 lei
  if (plan === "gold") price = 50000 // 500 lei

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "ron",
          product_data: {
            name: `Abonament ${plan.toUpperCase()}`,
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?plan=${plan}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/abonament`,
  })

  return NextResponse.json({ url: session.url })
}
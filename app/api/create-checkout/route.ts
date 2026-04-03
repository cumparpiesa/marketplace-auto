import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "ron",
          product_data: {
            name: "100 credite marketplace",
          },
          unit_amount: 5000,
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/abonament`,

    metadata: {
      user_id: body.user_id,
      type: "credits",
    },
  })

  return NextResponse.json({ url: session.url })
}
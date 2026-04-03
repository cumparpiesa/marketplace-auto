import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/lib/supabaseServer"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Nu ești logat" }, { status: 401 })
  }

  const { plan } = await req.json()

  let price = 0

  if (plan === "business") price = 30000
  if (plan === "gold") price = 50000

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    metadata: {
      user_id: user.id,
      plan: plan,
    },

    line_items: [
      {
        price_data: {
          currency: "ron",
          product_data: {
            name: `Abonament ${plan}`,
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/abonament`,
  })

  return NextResponse.json({ url: session.url })
}
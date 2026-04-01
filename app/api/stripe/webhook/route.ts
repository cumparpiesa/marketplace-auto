import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get("stripe-signature")!

  let event: any

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.whsec_0OMECY6iekYVmlFRdZNk7DYBFvWwmp41!
    )
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object

    const user_id = session.metadata?.user_id

    if (user_id) {
      await supabase
        .from("firme")
        .update({ is_pro: true })
        .eq("user_id", user_id)
    }
  }

  return NextResponse.json({ received: true })
}
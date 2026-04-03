import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object

    const userId = session.metadata?.user_id

    // 🔥 ACTIVARE PRO
    if (session.metadata?.type === "subscription") {
      await supabase
        .from("profiles")
        .update({ is_pro: true })
        .eq("id", userId)
    }

    // 🔥 ADAUGARE CREDITE
    if (session.metadata?.type === "credits") {
      const amount = Number(session.metadata.amount)

      const { data } = await supabase
        .from("credits")
        .select("credits")
        .eq("user_id", userId)
        .single()

      const current = data?.credits || 0

      await supabase
        .from("credits")
        .upsert({
          user_id: userId,
          credits: current + amount,
        })

      await supabase.from("credit_transactions").insert([
        {
          user_id: userId,
          amount,
          type: "buy",
        },
      ])
    }
  }

  return NextResponse.json({ received: true })
}
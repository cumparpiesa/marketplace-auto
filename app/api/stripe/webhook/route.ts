import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6a2RpaWV6YWJqaXR6cHpxam9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MjQ0NjUsImV4cCI6MjA5MDAwMDQ2NX0.Y5B-ReAUtmYs3N1HFSsQ10E7140pQGQ9Wtgd_1Nzgds!,
  process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6a2RpaWV6YWJqaXR6cHpxam9wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQyNDQ2NSwiZXhwIjoyMDkwMDAwNDY1fQ.xZi7bcZdU2CBlQs2bALI-uuHvo823jGCVpqA4Z-u5L8!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event

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

    const userId = session.metadata.user_id
    const plan = session.metadata.plan

    if (userId) {
      await supabase
        .from("profiles")
        .update({
          is_pro: true,
          subscription: plan,
          plan: plan,
        })
        .eq("id", userId)
    }
  }

  return NextResponse.json({ received: true })
}
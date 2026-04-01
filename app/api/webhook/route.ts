import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("EVENT:", event.type);

  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;

    console.log("SESSION:", session);

    await supabase
      .from("profiles")
      .update({
        stripe_customer_id: session.customer,
        plan: session.metadata.plan,
      })
      .eq("id", session.metadata.userId);
  }

  return NextResponse.json({ received: true });
}
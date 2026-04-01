import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    console.log("USER ID:", userId);

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single();

    console.log("PROFILE:", profile);

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    if (!profile?.stripe_customer_id) {
      return NextResponse.json(
        { error: "No Stripe customer found" },
        { status: 400 }
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: "http://localhost:3000/abonament",
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("PORTAL ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
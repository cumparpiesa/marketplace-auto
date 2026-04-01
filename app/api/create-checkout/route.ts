import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { plan, userId } = await req.json();

    console.log("PLAN:", plan);
    console.log("USER:", userId);

    const priceMap: any = {
      pro: "price_1TGeBWGUUQj4RS9kR4f2Qjnt",       // 🔥 PUNE DIN STRIPE
      business: "price_1TGebhGUUQj4RS9knPXOf2yl",
    };

    const priceId = priceMap[plan];

    if (!priceId) {
      return NextResponse.json({ error: "Plan invalid" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000",
      metadata: {
        userId,
        plan,
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("STRIPE ERROR:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
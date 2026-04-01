import { headers } from "next/headers"

export async function POST(req: Request) {
  const body = await req.text()

  const headersList = await headers()
  const sig = headersList.get("stripe-signature")

  if (!sig) {
    return new Response("No signature", { status: 400 })
  }

  // restul codului...
}
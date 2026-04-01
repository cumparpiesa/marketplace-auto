import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase-server"

export async function POST(req: Request) {
  const supabase = await createSupabaseServer() // 🔥 FOARTE IMPORTANT

  const body = await req.json()
  const { titlu } = body

  const { data, error } = await supabase
    .from("anunturi")
    .insert([
      {
        titlu,
      },
    ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}
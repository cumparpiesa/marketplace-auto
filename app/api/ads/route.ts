import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase-server"

export async function POST(req: Request) {
  const supabase = createSupabaseServer()

  const body = await req.json()

  const { titlu, descriere, pret } = body

  const { data, error } = await supabase
    .from("anunturi")
    .insert([
      {
        titlu,
        descriere,
        pret,
      },
    ])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}
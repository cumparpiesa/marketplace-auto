import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

export async function POST(req: Request) {
  const supabase = supabaseServer()

  const body = await req.json()

  const { titlu, pret } = body

  const { data, error } = await supabase
    .from("anunturi")
    .insert([{ titlu, pret }])

  if (error) {
    return NextResponse.json({ error: error.message })
  }

  return NextResponse.json({ success: true })
}
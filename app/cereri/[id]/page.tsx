"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import SendOffer from "@/app/components/SendOffer"

export default function CerereDetaliu({ params }: any) {
  const [cerere, setCerere] = useState<any>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await supabase
      .from("cereri")
      .select("*")
      .eq("id", params.id)
      .single()

    setCerere(data)
  }

  if (!cerere) return <p>Se încarcă...</p>

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h1>{cerere.titlu}</h1>
      <p>📍 {cerere.oras}</p>
      <p>{cerere.descriere}</p>

      {/* 🔥 OFERTE */}
      <SendOffer cerereId={cerere.id} />
    </div>
  )
}
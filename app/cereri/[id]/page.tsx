"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabaseServer } from "../@/lib/supabaseClientServer"

export default function CerereDetalii() {
  const { id } = useParams()

  const [cerere, setCerere] = useState<any>(null)
  const [plan, setPlan] = useState("free")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    // 🔥 cerere
    const { data: c } = await supabase
      .from("cereri")
      .select(`
        *,
        categories(name),
        judete(name),
        orase(name)
      `)
      .eq("id", id)
      .single()

    setCerere(c)

    // 🔥 user plan
    const { data: userData } = await supabase.auth.getUser()

    if (userData.user) {
      const { data: p } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.user.id)
        .single()

      setPlan(p?.plan || "free")
    }
  }

  if (!cerere) return <p>Loading...</p>

  return (
    <div style={{ padding: 30 }}>
      <h1>{cerere.title}</h1>

      {/* 🔒 FREE */}
      {plan === "free" ? (
        <div
          style={{
            background: "#fff3cd",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <p>🔒 Upgrade la BUSINESS pentru detalii</p>
        </div>
      ) : (
        <>
          <p>{cerere.description}</p>

          <p>
            {cerere.orase?.name}, {cerere.judete?.name}
          </p>
        </>
      )}
    </div>
  )
}
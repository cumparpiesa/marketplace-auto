"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import SendOffer from "@/app/components/SendOffer"

export default function CerereDetaliu({ params }: { params: { id: string } }) {
  const [cerere, setCerere] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.id) {
      fetchData()
    }
  }, [params.id])

  const fetchData = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("cereri")
      .select("*")
      .eq("id", params.id)
      .single()

    if (error) {
      console.log("EROARE:", error)
      setLoading(false)
      return
    }

    setCerere(data)
    setLoading(false)
  }

  if (loading) return <p>Se încarcă...</p>

  if (!cerere) return <p>Cererea nu există</p>

  return (
    <div style={styles.container}>
      <h1>{cerere.titlu}</h1>
      <p style={styles.city}>📍 {cerere.oras}</p>
      <p>{cerere.descriere}</p>

      {/* 🔥 OFERTE */}
      <SendOffer cerereId={cerere.id} />
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
  },

  city: {
    color: "#666",
    marginBottom: "10px",
  },
}
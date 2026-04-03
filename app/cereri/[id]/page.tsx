"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function CerereDetaliu() {
  const params = useParams()
  const [cerere, setCerere] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.id) fetchCerere()
  }, [params?.id])

  const fetchCerere = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("cereri")
      .select("*")
      .eq("id", params.id)
      .single()

    console.log("DATA:", data)
    console.log("ERROR:", error)

    if (error || !data) {
      setCerere(null)
    } else {
      setCerere(data)
    }

    setLoading(false)
  }

  if (loading) return <p style={{ padding: 20 }}>Se încarcă...</p>

  if (!cerere) return <p style={{ padding: 20 }}>Cererea nu există</p>

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src={cerere.imagine || "https://via.placeholder.com/600x300"}
          style={styles.image}
        />

        <h1>{cerere.titlu}</h1>

        <p style={styles.meta}>📍 {cerere.oras}</p>

        <p style={styles.desc}>{cerere.descriere}</p>

        {/* 🔥 NU arătăm telefon (exact cum ai vrut) */}

        <button style={styles.btn}>
          Trimite ofertă
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: "40px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    maxWidth: "700px",
    width: "100%",
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover" as const,
    borderRadius: "10px",
    marginBottom: "15px",
  },
  meta: {
    color: "#666",
    marginBottom: "10px",
  },
  desc: {
    marginBottom: "20px",
  },
  btn: {
    padding: "12px",
    width: "100%",
    background: "#0070f3",
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
}
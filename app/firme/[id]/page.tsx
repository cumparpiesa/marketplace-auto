"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function FirmaPage() {
  const { id } = useParams()
  const [firma, setFirma] = useState<any>(null)

  useEffect(() => {
    const fetchFirma = async () => {
      const { data } = await supabase
        .from("firme")
        .select("*")
        .eq("id", id)
        .single()

      setFirma(data)
    }

    fetchFirma()
  }, [id])

  if (!firma) return <p style={{ padding: 20 }}>Se încarcă...</p>

  return (
    <div style={styles.container}>

      <img
        src={firma.image_url || "https://via.placeholder.com/800x300"}
        style={styles.image}
      />

      <h1>{firma.nume}</h1>

      <p>📍 {firma.oras}</p>

      <p>{firma.descriere}</p>

      <p>📞 {firma.telefon}</p>

      {firma.plan === "pro" && (
        <span style={styles.badge}>PRO</span>
      )}

    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
  },
  image: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover" as const,
    marginBottom: "20px",
  },
  badge: {
    background: "gold",
    padding: "5px 10px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
}
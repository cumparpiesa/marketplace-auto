"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function FirmaPage() {
  const params = useParams()
  const id = params?.id as string

  const [firma, setFirma] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchFirma = async () => {
      const { data, error } = await supabase
        .from("firme")
        .select("*")
        .eq("id", id)
        .single()

      console.log("ID:", id)
      console.log("DATA:", data)
      console.log("ERROR:", error)

      if (data) setFirma(data)
      setLoading(false)
    }

    fetchFirma()
  }, [id])

  if (loading) return <p style={{ padding: 20 }}>Se încarcă...</p>

  if (!firma) return <p style={{ padding: 20 }}>Firma nu a fost găsită ❌</p>

  return (
    <div style={styles.container}>
      <img
        src={firma.image_url || "https://via.placeholder.com/800x300"}
        style={styles.image}
      />

      <h1 style={styles.title}>{firma.nume}</h1>

      <p style={styles.city}>📍 {firma.oras}</p>

      <p style={styles.desc}>{firma.descriere}</p>

      <button style={styles.contact}>
        📞 Contactează firma
      </button>
    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover" as const,
    borderRadius: "10px",
    marginBottom: "15px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
  },
  city: {
    color: "#777",
    marginTop: "5px",
  },
  desc: {
    marginTop: "10px",
    fontSize: "15px",
  },
  contact: {
    marginTop: "20px",
    padding: "10px 15px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
}
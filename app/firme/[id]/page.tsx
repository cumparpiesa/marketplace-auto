"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function FirmaPage() {
  const params = useParams()
  const id = params.id

  const [firma, setFirma] = useState<any>(null)

  useEffect(() => {
    const fetchFirma = async () => {
      const { data, error } = await supabase
        .from("firme")
        .select("*")
        .eq("id", id)
        .single()

      if (error) console.log(error)
      else setFirma(data)
    }

    fetchFirma()
  }, [id])

  if (!firma) return <p style={{ padding: 20 }}>Se încarcă...</p>

  return (
    <div style={{ padding: 20 }}>

      {/* HEADER */}
      <div style={styles.header}>
        <img
          src={firma.image_url || "https://via.placeholder.com/800x300"}
          style={styles.image}
        />

        <h1>{firma.nume}</h1>
        <p>📍 {firma.oras}</p>
      </div>

      {/* CONTINUT */}
      <div style={styles.container}>

        {/* DESCRIERE */}
        <div style={{ flex: 2 }}>
          <h2>Descriere</h2>
          <p>{firma.descriere}</p>
        </div>

        {/* CONTACT */}
        <div style={styles.contactBox}>
          <h3>Contact rapid</h3>

          <a href={`tel:${firma.telefon}`} style={styles.callBtn}>
            📞 Sună
          </a>

          <a
            href={`https://wa.me/4${firma.telefon}`}
            target="_blank"
            style={styles.whatsappBtn}
          >
            💬 WhatsApp
          </a>

          <p style={{ marginTop: 10 }}>{firma.telefon}</p>
        </div>
      </div>
    </div>
  )
}

const styles: any = {
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  image: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover" as const,
    borderRadius: "10px",
  },
  container: {
    display: "flex",
    gap: "30px",
  },
  contactBox: {
    flex: 1,
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
    height: "fit-content",
  },
  callBtn: {
    display: "block",
    background: "green",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    textAlign: "center",
    marginTop: "10px",
    textDecoration: "none",
  },
  whatsappBtn: {
    display: "block",
    background: "#25D366",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    textAlign: "center",
    marginTop: "10px",
    textDecoration: "none",
  },
}
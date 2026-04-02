"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function FirmaPage() {
  const params = useParams()
  const id = params.id

  const [firma, setFirma] = useState<any>(null)

  useEffect(() => {
    if (!id) return

    const fetchFirma = async () => {
      const { data, error } = await supabase
        .from("firma")
        .select("*")
        .eq("id", id)
        .single()

      if (data) setFirma(data)
    }

    fetchFirma()
  }, [id])

  if (!firma) return <p style={{ padding: 20 }}>Se încarcă...</p>

  return (
    <div style={styles.container}>
      
      {/* 🔥 BANNER */}
      <div style={styles.banner}>
        <img
          src={firma.image_url || "https://via.placeholder.com/1200x300"}
          style={styles.bannerImg}
        />
      </div>

      {/* 🔥 CARD INFO */}
      <div style={styles.card}>
        
        <div style={styles.header}>
          <h1 style={styles.title}>{firma.nume}</h1>

          {firma.plan === "pro" && (
            <span style={styles.proBadge}>PRO</span>
          )}
        </div>

        <p style={styles.location}>📍 {firma.oras}</p>

        <p style={styles.desc}>{firma.descriere}</p>

        {/* 🔥 CONTACT */}
        <div style={styles.actions}>
          <a
            href={`https://wa.me/${firma.telefon}`}
            target="_blank"
            style={styles.whatsapp}
          >
            WhatsApp
          </a>

          <a href={`tel:${firma.telefon}`} style={styles.call}>
            Sună
          </a>
        </div>

      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "20px",
  },

  banner: {
    width: "100%",
    height: "250px",
    overflow: "hidden",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  bannerImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  title: {
    fontSize: "26px",
    fontWeight: "bold",
  },

  proBadge: {
    background: "green",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
  },

  location: {
    marginTop: "10px",
    color: "#555",
  },

  desc: {
    marginTop: "15px",
    lineHeight: "1.5",
  },

  actions: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
  },

  whatsapp: {
    background: "#25D366",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  call: {
    background: "#0070f3",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },
}
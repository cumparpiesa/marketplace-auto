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

      console.log("DATA:", data)
      console.log("ERROR:", error)

      if (data) setFirma(data)
      setLoading(false)
    }

    fetchFirma()
  }, [id])

  if (loading) return <p style={{ padding: 20 }}>Se încarcă...</p>
  if (!firma) return <p style={{ padding: 20 }}>Firma nu a fost găsită ❌</p>

  const telefon = firma.telefon || ""
  const telefonClean = telefon.replace(/\D/g, "")

  return (
    <div style={styles.wrapper}>

      {/* HEADER */}
      <div style={styles.header}>
        <img
          src={firma.image_url || "https://via.placeholder.com/1000x300"}
          style={styles.image}
        />

        <div style={styles.overlay}>
          <h1 style={styles.title}>{firma.nume}</h1>
          <p style={styles.city}>📍 {firma.oras}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div style={styles.container}>

        <div style={styles.left}>

          <h2>Descriere</h2>
          <p style={styles.desc}>{firma.descriere}</p>

        </div>

        <div style={styles.right}>

          <div style={styles.card}>

            <h3>Contact rapid</h3>

            <div style={styles.buttons}>

              {/* TELEFON */}
              <a href={`tel:${telefon}`}>
                <button style={styles.call}>
                  📞 Sună
                </button>
              </a>

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/${telefonClean}`}
                target="_blank"
              >
                <button style={styles.whatsapp}>
                  💬 WhatsApp
                </button>
              </a>

            </div>

            <p style={styles.phone}>
              📱 {telefon}
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

const styles = {
  wrapper: {
    fontFamily: "Arial",
  },

  header: {
    position: "relative" as const,
  },

  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover" as const,
  },

  overlay: {
    position: "absolute" as const,
    bottom: "20px",
    left: "20px",
    color: "#fff",
    background: "rgba(0,0,0,0.5)",
    padding: "10px 15px",
    borderRadius: "8px",
  },

  title: {
    fontSize: "26px",
    fontWeight: "bold",
  },

  city: {
    fontSize: "14px",
  },

  container: {
    display: "flex",
    gap: "30px",
    padding: "20px",
  },

  left: {
    flex: 2,
  },

  right: {
    flex: 1,
  },

  desc: {
    marginTop: "10px",
    lineHeight: "1.6",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  buttons: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  call: {
    padding: "10px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  whatsapp: {
    padding: "10px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  phone: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
  },
}
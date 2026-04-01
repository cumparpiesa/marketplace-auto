"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function FirmePage() {
  const [firme, setFirme] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFirme = async () => {
      const { data, error } = await supabase
        .from("firme")
        .select("*")
        .order("plan", { ascending: false }) // 🔥 PRO sus
        .order("created_at", { ascending: false })

      if (!error) setFirme(data || [])
      setLoading(false)
    }

    fetchFirme()
  }, [])

  if (loading) return <p style={{ textAlign: "center" }}>Se încarcă...</p>

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Firme</h1>

      {firme.length === 0 && <p>Nu există firme.</p>}

      {firme.map((firma) => (
        <div key={firma.id} style={styles.card}>
          {/* HEADER */}
          <div style={styles.header}>
            <h2 style={styles.name}>
              {firma.nume}
              {firma.plan === "business" && (
                <span style={styles.badge}>PRO</span>
              )}
            </h2>

            {firma.image_url && (
              <img src={firma.image_url} style={styles.image} />
            )}
          </div>

          {/* INFO */}
          <div style={styles.info}>
            <p><strong>Oraș:</strong> {firma.oras}</p>
            <p><strong>Telefon:</strong> {firma.telefon}</p>
            <p>{firma.descriere}</p>
          </div>

          {/* 🔥 BUTON PROMOVARE */}
          {firma.plan !== "business" && (
            <button
              onClick={async () => {
                const res = await fetch("/api/create-checkout", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    firmaId: firma.id,
                    plan: "business",
                  }),
                })

                const data = await res.json()
                window.location.href = data.url
              }}
              style={styles.button}
            >
              🚀 Promovează (300 lei)
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

// 🎨 STILURI PRO
const styles: any = {
  container: {
    maxWidth: 900,
    margin: "40px auto",
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  title: {
    textAlign: "center",
  },
  card: {
    border: "1px solid #eee",
    borderRadius: 12,
    padding: 20,
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  badge: {
    background: "gold",
    color: "black",
    padding: "4px 10px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: "bold",
  },
  image: {
    width: 80,
    height: 80,
    objectFit: "cover",
    borderRadius: 10,
  },
  info: {
    marginTop: 10,
  },
  button: {
    marginTop: 15,
    background: "#16a34a",
    color: "white",
    padding: "10px 16px",
    borderRadius: 8,
    cursor: "pointer",
    border: "none",
    fontWeight: "bold",
  },
}
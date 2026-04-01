"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function FirmePage() {
  const [firme, setFirme] = useState<any[]>([])

  useEffect(() => {
    const fetchFirme = async () => {
      const { data, error } = await supabase
        .from("firme")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error) setFirme(data || [])
    }

    fetchFirme()
  }, [])

  return (
    <div style={styles.container}>
      <h1>Firme</h1>

      {firme.map((firma) => (
        <div key={firma.id} style={styles.card}>
          <h2>
            {firma.nume}{" "}
            {firma.plan === "business" && (
              <span style={styles.badge}>PRO</span>
            )}
          </h2>

          <p>{firma.oras}</p>
          <p>{firma.telefon}</p>
          <p>{firma.descriere}</p>

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
              Promovează (300 lei)
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

// 🎨 STYLES
const styles: any = {
  container: {
    maxWidth: 800,
    margin: "40px auto",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  card: {
    border: "1px solid #ddd",
    padding: 20,
    borderRadius: 8,
    background: "#fff",
  },
  button: {
    marginTop: 10,
    background: "green",
    color: "white",
    padding: "10px 16px",
    borderRadius: 6,
    cursor: "pointer",
    border: "none",
  },
  badge: {
    background: "gold",
    color: "black",
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: 12,
    marginLeft: 10,
  },
}
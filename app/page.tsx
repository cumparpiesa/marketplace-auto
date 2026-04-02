"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function HomePage() {
  const [firme, setFirme] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFirme = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from("firme")
        .select("*")

      console.log("FIRME:", data)
      console.log("ERROR:", error)

      if (error) {
        console.log("Eroare:", error)
        setFirme([])
      } else {
        // 🔥 sort manual (PRO sus)
        const sorted = (data || []).sort((a, b) => {
          if (a.plan === "pro" && b.plan !== "pro") return -1
          if (a.plan !== "pro" && b.plan === "pro") return 1
          return 0
        })

        setFirme(sorted)
      }

      setLoading(false)
    }

    fetchFirme()
  }, [])

  if (loading) {
    return <p style={{ padding: 20 }}>Se încarcă...</p>
  }

  return (
    <div style={{ padding: 20 }}>

      <h2 style={styles.section}>⭐ Firme recomandate</h2>

      {firme.length === 0 && (
        <p>Nu există firme încă</p>
      )}

      <div style={styles.grid}>
        {firme.map((firma) => (
          <Link
            key={firma.id}
            href={`/firme/${firma.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={styles.card}>

              <img
                src={firma.image_url || "https://via.placeholder.com/400x200"}
                style={styles.image}
              />

              <div style={{ padding: 10 }}>
                <h3>{firma.nume}</h3>

                <p style={styles.oras}>📍 {firma.oras}</p>

                <p>{firma.descriere}</p>

                {firma.plan === "pro" && (
                  <span style={styles.badge}>⭐ PRO</span>
                )}
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const styles: any = {
  section: {
    fontSize: "22px",
    marginBottom: "15px",
  },
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    width: "280px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#fff",
    cursor: "pointer",
    transition: "0.3s",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  oras: {
    fontSize: "12px",
    color: "gray",
  },
  badge: {
    background: "gold",
    padding: "4px 8px",
    borderRadius: "5px",
    fontSize: "12px",
    display: "inline-block",
    marginTop: "5px",
  },
}
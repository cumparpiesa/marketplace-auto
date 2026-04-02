"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function HomePage() {
  const [firme, setFirme] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFirme = async () => {
      const { data, error } = await supabase
        .from("firme")
        .select("*")

      console.log("DATA:", data)
      console.log("ERROR:", error)

      if (!error) {
        setFirme(data || [])
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
      <h2 style={styles.title}>⭐ Firme</h2>

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
                <p style={styles.city}>📍 {firma.oras}</p>
                <p>{firma.descriere}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const styles = {
  title: {
    fontSize: "22px",
    marginBottom: "20px",
  },
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap" as const,
  },
  card: {
    width: "280px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#fff",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover" as const,
  },
  city: {
    fontSize: "12px",
    color: "gray",
  },
}
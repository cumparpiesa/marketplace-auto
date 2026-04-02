"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function HomePage() {
  const [firme, setFirme] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFirme = async () => {
      const { data } = await supabase.from("firme").select("*")
      setFirme(data || [])
      setLoading(false)
    }

    fetchFirme()
  }, [])

  if (loading) {
    return <p style={{ padding: 40 }}>Se încarcă...</p>
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⭐ Firme recomandate</h1>

      <div style={styles.grid}>
        {firme.map((firma) => (
          <Link key={firma.id} href={`/firme/${firma.id}`}>
            <div style={styles.card}>
              <img
                src={firma.image_url || "https://via.placeholder.com/400x200"}
                style={styles.image}
              />

              <div style={styles.content}>
                <h3 style={styles.name}>{firma.nume}</h3>
                <p style={styles.city}>📍 {firma.oras}</p>
                <p style={styles.desc}>{firma.descriere}</p>

                <button style={styles.button}>Vezi detalii</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px",
  },

  title: {
    fontSize: "26px",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },

  card: {
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #eee",
    background: "#fff",
    cursor: "pointer",
    transition: "0.2s",
  },

  image: {
    width: "100%",
    height: "170px",
    objectFit: "cover" as const,
  },

  content: {
    padding: "15px",
  },

  name: {
    fontSize: "18px",
    marginBottom: "5px",
  },

  city: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "10px",
  },

  desc: {
    fontSize: "14px",
    marginBottom: "10px",
  },

  button: {
    padding: "8px 12px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
}
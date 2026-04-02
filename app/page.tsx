"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

export default function Home() {
  const [firme, setFirme] = useState<any[]>([])

  useEffect(() => {
    const fetchFirme = async () => {
      const { data, error } = await supabase
        .from("firme") // 🔥 CORECT
        .select("*")

      console.log("DATA:", data)
      console.log("ERROR:", error)

      if (data) setFirme(data)
    }

    fetchFirme()
  }, [])

  return (
    <div style={styles.container}>

      <h2 style={styles.section}>⭐ Firme recomandate</h2>

      <div style={styles.grid}>
        {firme.map((firma) => (
          <div key={firma.id} style={styles.card}>

            <img
              src={firma.image_url || "https://via.placeholder.com/400x200"}
              style={styles.image}
            />

            <div style={styles.content}>
              <h3 style={styles.title}>{firma.nume}</h3>

              <p style={styles.city}>📍 {firma.oras}</p>

              <p style={styles.desc}>{firma.descriere}</p>

              <Link href={`/firme/${firma.id}`}>
                <button style={styles.button}>
                  Vezi detalii →
                </button>
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
  },
  section: {
    fontSize: "22px",
    marginBottom: "20px",
  },
  grid: {
    display: "flex" as const,
    gap: "20px",
    flexWrap: "wrap" as const,
  },
  card: {
    width: "280px",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover" as const,
  },
  content: {
    padding: "10px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  city: {
    fontSize: "13px",
    color: "#777",
  },
  desc: {
    fontSize: "13px",
    marginTop: "5px",
  },
  button: {
    marginTop: "10px",
    padding: "6px 10px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
}
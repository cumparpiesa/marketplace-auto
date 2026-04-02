"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function Home() {
  const [firme, setFirme] = useState<any[]>([])

  useEffect(() => {
    const fetchFirme = async () => {
      const { data, error } = await supabase
        .from("firma")
        .select("*")

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
              src={firma.image_url || "https://via.placeholder.com/300x150"}
              style={styles.image}
            />

            <h3>{firma.nume}</h3>
            <p>📍 {firma.oras}</p>
            <p>{firma.descriere}</p>

            <Link href={`/firma/${firma.id}`} style={styles.btn}>
              Vezi detalii
            </Link>

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
    display: "flex",
    gap: "20px",
    flexWrap: "wrap" as const, // 🔥 IMPORTANT FIX
  },

  card: {
    width: "250px",
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover" as const,
    borderRadius: "8px",
    marginBottom: "10px",
  },

  btn: {
    display: "inline-block",
    marginTop: "10px",
    background: "#0070f3",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "6px",
    textDecoration: "none",
  },
}
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function HomePage() {
  const [firme, setFirme] = useState<any[]>([])

  useEffect(() => {
    const fetchFirme = async () => {
      const { data, error } = await supabase
        .from("firme")
        .select("*")
        .order("plan", { ascending: false }) // 🔥 PRO sus

      if (error) console.log(error)
      else setFirme(data || [])
    }

    fetchFirme()
  }, [])

  return (
    <div style={{ padding: 20 }}>

      {/* ⭐ TITLU */}
      <h2 style={styles.section}>⭐ Firme recomandate</h2>

      {/* GRID */}
      <div style={styles.grid}>
        {firme.map((firma) => (
          
          // 🔥 TOT CARDUL CLICKABLE
          <Link
            key={firma.id}
            href={`/firme/${firma.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={styles.card}>

              {/* IMAGINE */}
              <img
                src={firma.image_url || "https://via.placeholder.com/400x200"}
                style={styles.image}
              />

              {/* CONTINUT */}
              <div style={{ padding: 10 }}>
                <h3>{firma.nume}</h3>

                <p style={styles.oras}>📍 {firma.oras}</p>

                <p>{firma.descriere}</p>

                {/* 🔥 BADGE PRO */}
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
    objectFit: "cover" as const,
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
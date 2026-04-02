"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function HomePage() {
  const [firme, setFirme] = useState<any[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchFirme()
  }, [])

  const fetchFirme = async () => {
    let query = supabase.from("firme").select("*")

    if (search) {
      query = query.ilike("nume", `%${search}%`)
    }

    const { data } = await query
    setFirme(data || [])
  }

  return (
    <div>
      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Găsește piese auto rapid 🔧</h1>

        <div style={styles.searchBox}>
          <input
            placeholder="Caută firmă, piese, dezmembrări..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
          <button onClick={fetchFirme} style={styles.searchBtn}>
            Caută
          </button>
        </div>
      </div>

      {/* CATEGORII */}
      <div style={styles.categories}>
        <button style={styles.catBtn}>🔧 Piese auto</button>
        <button style={styles.catBtn}>🚗 Dezmembrări</button>
        <button style={styles.catBtn}>🏢 Firme</button>
        <button style={styles.catBtn}>📦 Cereri</button>
      </div>

      {/* CONTENT */}
      <div style={styles.container}>
        <h2 style={styles.section}>⭐ Firme recomandate</h2>

        <div style={styles.grid}>
          {firme.map((firma) => (
            <Link key={firma.id} href={`/firme/${firma.id}`}>
              <div style={styles.card}>
                <img
                  src={
                    firma.image_url ||
                    "https://via.placeholder.com/400x200"
                  }
                  style={styles.image}
                />

                <div style={styles.cardContent}>
                  <h3>{firma.nume}</h3>
                  <p style={styles.city}>📍 {firma.oras}</p>
                  <p>{firma.descriere}</p>

                  <button style={styles.btn}>Vezi detalii</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  hero: {
    background: "#111",
    padding: "60px 20px",
    textAlign: "center" as const,
    color: "#fff",
  },

  heroTitle: {
    fontSize: "32px",
    marginBottom: "20px",
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },

  input: {
    width: "350px",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
  },

  searchBtn: {
    padding: "12px 20px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  categories: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    padding: "20px",
  },

  catBtn: {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },

  section: {
    fontSize: "22px",
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
    transition: "0.2s",
    cursor: "pointer",
  },

  image: {
    width: "100%",
    height: "170px",
    objectFit: "cover" as const,
  },

  cardContent: {
    padding: "15px",
  },

  city: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "10px",
  },

  btn: {
    padding: "8px 12px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
}
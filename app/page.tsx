"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function HomePage() {
  const [firme, setFirme] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const fetchFirme = async (searchTerm = "") => {
    setLoading(true)

    let query = supabase.from("firme").select("*")

    // 🔥 SEARCH REAL
    if (searchTerm) {
      query = query.or(
        `nume.ilike.%${searchTerm}%,descriere.ilike.%${searchTerm}%,oras.ilike.%${searchTerm}%`
      )
    }

    const { data, error } = await query

    console.log("FIRME:", data)
    console.log("ERROR:", error)

    if (!error) {
      // 🔥 PRO sus
      const sorted = (data || []).sort((a, b) => {
        if (a.plan === "pro" && b.plan !== "pro") return -1
        if (a.plan !== "pro" && b.plan === "pro") return 1
        return 0
      })

      setFirme(sorted)
    } else {
      setFirme([])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchFirme()
  }, [])

  return (
    <div style={{ padding: 20 }}>

      {/* 🔍 SEARCH BAR */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Caută firmă, oraș, descriere..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <button onClick={() => fetchFirme(search)} style={styles.button}>
          Caută
        </button>
      </div>

      {/* TITLU */}
      <h2 style={styles.section}>⭐ Firme recomandate</h2>

      {loading && <p>Se încarcă...</p>}
      {!loading && firme.length === 0 && <p>Nu s-au găsit rezultate</p>}

      {/* GRID */}
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
  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    background: "#0070f3",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
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
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function FirmePage() {
  const [firme, setFirme] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [oras, setOras] = useState("")

  useEffect(() => {
    const fetchFirme = async () => {
      const { data, error } = await supabase.from("firme").select("*")

      if (error) console.error(error)
      else setFirme(data || [])
    }

    fetchFirme()
  }, [])

  // 🔥 filtrare
  const filtered = firme.filter((f) => {
    return (
      f.nume?.toLowerCase().includes(search.toLowerCase()) &&
      (oras === "" || f.oras === oras)
    )
  })

  // 🔥 lista orașe unice
  const orase = [...new Set(firme.map((f) => f.oras))]

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Firme</h1>

      {/* 🔍 SEARCH + FILTRE */}
      <div style={styles.filters}>
        <input
          placeholder="Caută firmă..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={oras}
          onChange={(e) => setOras(e.target.value)}
          style={styles.select}
        >
          <option value="">Toate orașele</option>
          {orase.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* 🔥 GRID */}
      <div style={styles.grid}>
        {filtered.map((firma) => (
          <div key={firma.id} style={styles.card}>
            <img
              src={firma.image_url || "https://via.placeholder.com/400x200"}
              style={styles.image}
            />

            <div style={styles.content}>
              <h3>{firma.nume}</h3>

              <p style={styles.location}>📍 {firma.oras}</p>

              <p>{firma.descriere}</p>

              <p style={styles.phone}>📞 {firma.telefon}</p>

              <a href={`/firme/${firma.id}`} style={styles.btn}>
                Vezi magazin
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ marginTop: 20 }}>Nu există rezultate.</p>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
    background: "#f2f4f5",
    minHeight: "100vh",
  },

  heading: {
    marginBottom: "20px",
  },

  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    flex: 1,
  },

  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },

  card: {
    borderRadius: "12px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover" as const,
  },

  content: {
    padding: "12px",
  },

  location: {
    fontSize: "12px",
    color: "#777",
  },

  phone: {
    fontSize: "13px",
    marginTop: "5px",
  },

  btn: {
    display: "inline-block",
    marginTop: "10px",
    background: "#002f34",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "6px",
    textDecoration: "none",
  },
}
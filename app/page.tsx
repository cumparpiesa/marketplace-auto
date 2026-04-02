"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function HomePage() {
  const [firme, setFirme] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 🔥 filtre
  const [search, setSearch] = useState("")
  const [oras, setOras] = useState("")
  const [plan, setPlan] = useState("")

  const fetchFirme = async () => {
    setLoading(true)

    let query = supabase.from("firme").select("*")

    // 🔍 SEARCH
    if (search) {
      query = query.or(
        `nume.ilike.%${search}%,descriere.ilike.%${search}%,oras.ilike.%${search}%`
      )
    }

    // 📍 FILTRU ORAȘ
    if (oras) {
      query = query.ilike("oras", `%${oras}%`)
    }

    // ⭐ FILTRU PLAN
    if (plan) {
      query = query.eq("plan", plan)
    }

    const { data, error } = await query

    console.log("FIRME:", data)
    console.log("ERROR:", error)

    if (!error) {
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

      {/* 🔥 FILTRE */}
      <div style={styles.filters}>

        <input
          type="text"
          placeholder="🔍 Caută firmă..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="📍 Oraș"
          value={oras}
          onChange={(e) => setOras(e.target.value)}
          style={styles.input}
        />

        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          style={styles.select}
        >
          <option value="">Toate</option>
          <option value="pro">PRO</option>
          <option value="free">FREE</option>
        </select>

        <button onClick={fetchFirme} style={styles.button}>
          Aplică filtre
        </button>

      </div>

      {/* TITLU */}
      <h2 style={styles.section}>⭐ Firme</h2>

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
  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  select: {
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
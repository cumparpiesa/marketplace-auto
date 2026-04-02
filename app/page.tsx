"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function HomePage() {
  const [firme, setFirme] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // filtre
  const [search, setSearch] = useState("")
  const [oras, setOras] = useState("")
  const [plan, setPlan] = useState("toate")
  const [sort, setSort] = useState("noi")

  useEffect(() => {
    fetchFirme()
  }, [])

  const fetchFirme = async () => {
    setLoading(true)

    let query = supabase.from("firme").select("*")

    // 🔍 SEARCH
    if (search) {
      query = query.ilike("nume", `%${search}%`)
    }

    // 📍 ORAȘ
    if (oras) {
      query = query.ilike("oras", `%${oras}%`)
    }

    // ⭐ PLAN
    if (plan !== "toate") {
      query = query.eq("plan", plan)
    }

    // 🔃 SORT
    if (sort === "noi") {
      query = query.order("id", { ascending: false })
    } else {
      query = query.order("id", { ascending: true })
    }

    const { data } = await query

    setFirme(data || [])
    setLoading(false)
  }

  return (
    <div style={styles.layout}>
      {/* SIDEBAR FILTRE */}
      <div style={styles.sidebar}>
        <h3>Filtre</h3>

        <input
          placeholder="Caută firmă..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Oraș"
          value={oras}
          onChange={(e) => setOras(e.target.value)}
          style={styles.input}
        />

        <select value={plan} onChange={(e) => setPlan(e.target.value)} style={styles.input}>
          <option value="toate">Toate</option>
          <option value="free">Free</option>
          <option value="pro">PRO</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.input}>
          <option value="noi">Cele mai noi</option>
          <option value="vechi">Cele mai vechi</option>
        </select>

        <button onClick={fetchFirme} style={styles.applyBtn}>
          Aplică filtre
        </button>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        <h2 style={styles.title}>⭐ Firme</h2>

        {loading ? (
          <p>Se încarcă...</p>
        ) : firme.length === 0 ? (
          <p>Nu s-au găsit rezultate</p>
        ) : (
          <div style={styles.grid}>
            {firme.map((firma) => (
              <Link key={firma.id} href={`/firme/${firma.id}`}>
                <div style={styles.card}>
                  <img
                    src={firma.image_url || "https://via.placeholder.com/400x200"}
                    style={styles.image}
                  />

                  <div style={styles.cardContent}>
                    <h3>{firma.nume}</h3>
                    <p style={styles.city}>📍 {firma.oras}</p>
                    <p>{firma.descriere}</p>

                    {firma.plan === "pro" && (
                      <span style={styles.badge}>PRO</span>
                    )}

                    <button style={styles.btn}>Vezi detalii</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  layout: {
    display: "flex",
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "20px",
    gap: "20px",
  },

  sidebar: {
    width: "250px",
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "10px",
    height: "fit-content",
    background: "#fff",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },

  applyBtn: {
    width: "100%",
    padding: "10px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  content: {
    flex: 1,
  },

  title: {
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
    position: "relative",
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

  badge: {
    position: "absolute" as const,
    top: "10px",
    left: "10px",
    background: "gold",
    padding: "5px 8px",
    borderRadius: "6px",
    fontSize: "12px",
  },

  btn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
}
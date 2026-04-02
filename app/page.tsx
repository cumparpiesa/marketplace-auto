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
  const [sort, setSort] = useState("new")

  const fetchFirme = async () => {
    setLoading(true)

    let query = supabase.from("firme").select("*")

    // 🔍 SEARCH
    if (search) {
      query = query.or(
        `nume.ilike.%${search}%,descriere.ilike.%${search}%,oras.ilike.%${search}%`
      )
    }

    // 📍 ORAȘ
    if (oras) {
      query = query.ilike("oras", `%${oras}%`)
    }

    // ⭐ PLAN
    if (plan) {
      query = query.eq("plan", plan)
    }

    // 🔽 SORTARE
    if (sort === "new") {
      query = query.order("created_at", { ascending: false })
    } else if (sort === "old") {
      query = query.order("created_at", { ascending: true })
    } else if (sort === "az") {
      query = query.order("nume", { ascending: true })
    }

    const { data, error } = await query

    console.log(data, error)

    if (!error) {
      // 🔥 PRO sus mereu
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

      {/* 🔥 FILTRE BAR */}
      <div style={styles.filters}>

        <input
          placeholder="🔍 Caută firmă..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="📍 Oraș"
          value={oras}
          onChange={(e) => setOras(e.target.value)}
          style={styles.input}
        />

        <select value={plan} onChange={(e) => setPlan(e.target.value)} style={styles.select}>
          <option value="">Toate</option>
          <option value="pro">PRO</option>
          <option value="free">FREE</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.select}>
          <option value="new">Cele mai noi</option>
          <option value="old">Cele mai vechi</option>
          <option value="az">A-Z</option>
        </select>

        <button onClick={fetchFirme} style={styles.button}>
          Aplică
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
    flexWrap: "wrap",
    marginBottom: "20px",
    background: "#f5f5f5",
    padding: "10px",
    borderRadius: "10px",
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
    marginTop: "5px",
    display: "inline-block",
  },
}
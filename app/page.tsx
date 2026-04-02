"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import type { CSSProperties } from "react"

type Firma = {
  id: number
  nume: string
  oras: string
  descriere: string
  image_url?: string
  plan: "free" | "pro"
}

export default function HomePage() {
  const [firme, setFirme] = useState<Firma[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [oras, setOras] = useState("")
  const [plan, setPlan] = useState<"toate" | "free" | "pro">("toate")
  const [sort, setSort] = useState<"noi" | "vechi">("noi")

  // 🔥 AUTO SEARCH (DEBOUNCE)
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchFirme()
    }, 400)

    return () => clearTimeout(delay)
  }, [search, oras, plan, sort])

  const fetchFirme = async () => {
    setLoading(true)

    let query = supabase.from("firme").select("*")

    if (search) query = query.ilike("nume", `%${search}%`)
    if (oras) query = query.ilike("oras", `%${oras}%`)
    if (plan !== "toate") query = query.eq("plan", plan)

    query =
      sort === "noi"
        ? query.order("id", { ascending: false })
        : query.order("id", { ascending: true })

    const { data, error } = await query

    if (error) console.error(error)

    setFirme((data as Firma[]) || [])
    setLoading(false)
  }

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h3 style={{ marginBottom: 15 }}>Filtre</h3>

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

        <select value={plan} onChange={(e) => setPlan(e.target.value as any)} style={styles.input}>
          <option value="toate">Toate</option>
          <option value="free">Free</option>
          <option value="pro">PRO</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value as any)} style={styles.input}>
          <option value="noi">Cele mai noi</option>
          <option value="vechi">Cele mai vechi</option>
        </select>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        <h2 style={styles.title}>Descoperă firme</h2>

        {loading ? (
          <p>Se încarcă...</p>
        ) : firme.length === 0 ? (
          <p>Nu s-au găsit rezultate</p>
        ) : (
          <div style={styles.grid}>
            {firme.map((firma) => (
              <Link key={firma.id} href={`/firme/${firma.id}`} style={styles.link}>
                <div style={styles.card} className="card">
                  <img
                    src={firma.image_url || "https://via.placeholder.com/400x200"}
                    style={styles.image}
                    alt={firma.nume}
                  />

                  {firma.plan === "pro" && (
                    <span style={styles.badge}>PRO</span>
                  )}

                  <div style={styles.cardContent}>
                    <h3 style={styles.cardTitle}>{firma.nume}</h3>
                    <p style={styles.city}>📍 {firma.oras}</p>
                    <p style={styles.desc}>{firma.descriere}</p>

                    <button style={styles.btn}>Vezi detalii</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 🔥 GLOBAL STYLE */}
      <style>
        {`
        body {
          background: #f5f7fb;
        }

        .card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        button:hover {
          opacity: 0.9;
        }
      `}
      </style>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  page: {
    display: "flex",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    gap: "40px",
  },

  sidebar: {
    width: "260px",
    padding: "20px",
    borderRadius: "14px",
    background: "#fff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },

  content: {
    flex: 1,
  },

  title: {
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: "600",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
    alignItems: "stretch",
  },

  link: {
    textDecoration: "none",
    color: "inherit",
  },

  card: {
    borderRadius: "16px",
    overflow: "hidden",
    background: "#fff",
    transition: "all 0.3s ease",
    cursor: "pointer",
    position: "relative",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },

  cardContent: {
    padding: "18px",
  },

  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
  },

  city: {
    fontSize: "13px",
    color: "#777",
    marginBottom: "6px",
  },

  desc: {
    fontSize: "14px",
    color: "#555",
    marginTop: "6px",
    lineHeight: "1.4",
  },

  badge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "linear-gradient(135deg, gold, orange)",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  btn: {
    marginTop: "14px",
    padding: "10px 14px",
    background: "linear-gradient(135deg, #0070f3, #0055cc)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },
}
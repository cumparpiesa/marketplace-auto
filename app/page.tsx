"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Home() {
  const [firme, setFirme] = useState<any[]>([])
  const [dezmembrari, setDezmembrari] = useState<any[]>([])
  const [piese, setPiese] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data: firmeData, error: fErr } = await supabase
        .from("firme")
        .select("*")

      const { data: dezData } = await supabase
        .from("dezmembrari")
        .select("*")
        .limit(6)

      const { data: pieseData } = await supabase
        .from("products")
        .select("*")
        .limit(6)

      if (fErr) console.error(fErr)

      setFirme(firmeData || [])
      setDezmembrari(dezData || [])
      setPiese(pieseData || [])
    }

    fetchData()
  }, [])

  const firmePro = firme.filter(f => f.plan === "pro")
  const firmeFree = firme.filter(f => f.plan !== "pro")

  return (
    <div style={styles.container}>

      {/* 🔥 FIRME PRO */}
      <h2 style={styles.sectionTitle}>⭐ Firme recomandate</h2>
      <div style={styles.grid}>
        {firmePro.map(f => (
          <Card key={f.id} data={f} highlight />
        ))}
      </div>

      {/* 🏢 FIRME */}
      <h2 style={styles.sectionTitle}>🏢 Toate firmele</h2>
      <div style={styles.grid}>
        {firmeFree.map(f => (
          <Card key={f.id} data={f} />
        ))}
      </div>

      {/* 🔧 DEZMEMBRARI */}
      <h2 style={styles.sectionTitle}>🔧 Dezmembrări recente</h2>
      <div style={styles.grid}>
        {dezmembrari.map(d => (
          <Card key={d.id} data={d} />
        ))}
      </div>

      {/* 📦 PIESE */}
      <h2 style={styles.sectionTitle}>📦 Piese noi</h2>
      <div style={styles.grid}>
        {piese.map(p => (
          <Card key={p.id} data={p} />
        ))}
      </div>

    </div>
  )
}

function Card({ data, highlight }: any) {
  return (
    <div
      style={{
        ...styles.card,
        ...(highlight ? styles.proCard : {})
      }}
    >
      <div style={styles.imageWrapper}>
        <img
          src={data.image_url || "https://via.placeholder.com/400x200"}
          style={styles.image}
        />

        {highlight && <div style={styles.proBadge}>PRO</div>}
      </div>

      <div style={styles.content}>
        <h3 style={styles.title}>
          {data.nume || data.title || "Anunț"}
        </h3>

        <p style={styles.location}>
          📍 {data.oras || data.location || "România"}
        </p>

        <p style={styles.desc}>
          {data.descriere || data.description || ""}
        </p>

        <button style={styles.button}>
          Vezi detalii
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
    background: "#f5f5f5",
  },

  sectionTitle: {
    margin: "30px 0 15px",
    fontSize: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid #ddd",
    transition: "0.2s",
    cursor: "pointer",
  },

  proCard: {
    border: "2px solid gold",
    boxShadow: "0 0 10px rgba(255,215,0,0.4)",
  },

  imageWrapper: {
    position: "relative" as const,
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover" as const,
  },

  proBadge: {
    position: "absolute" as const,
    top: "10px",
    left: "10px",
    background: "gold",
    padding: "4px 8px",
    fontSize: "12px",
    fontWeight: "bold",
    borderRadius: "5px",
  },

  content: {
    padding: "10px",
  },

  title: {
    fontSize: "16px",
    marginBottom: "5px",
  },

  location: {
    fontSize: "13px",
    color: "#777",
  },

  desc: {
    fontSize: "13px",
    color: "#555",
  },

  button: {
    marginTop: "10px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
}
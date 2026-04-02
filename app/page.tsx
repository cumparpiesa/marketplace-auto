"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

export default function Home() {
  const [firme, setFirme] = useState<any[]>([])

  useEffect(() => {
    const fetchFirme = async () => {
      const { data, error } = await supabase
        .from("firme")
        .select("*")

      console.log("DATA:", data)
      console.log("ERROR:", error)

      if (data) setFirme(data)
    }

    fetchFirme()
  }, [])

  return (
    <div style={styles.container}>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Găsește piese auto rapid 🔧</h1>

        <div style={styles.searchBox}>
          <input
            placeholder="Caută piesă, firmă sau dezmembrare..."
            style={styles.input}
          />
          <button style={styles.searchBtn}>Caută</button>
        </div>
      </div>

      {/* CATEGORII */}
      <div style={styles.categories}>
        <div style={styles.cat}>🔧 Piese auto</div>
        <div style={styles.cat}>🚗 Dezmembrări</div>
        <div style={styles.cat}>🏢 Firme</div>
        <div style={styles.cat}>📦 Cereri</div>
      </div>

      {/* FIRME */}
      <h2 style={styles.section}>⭐ Firme recomandate</h2>

      <div style={styles.grid}>
        {firme.map((firma) => (
          <div
            key={firma.id}
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >

            {/* BADGE PRO */}
            {firma.plan === "pro" && (
              <span style={styles.badge}>PRO</span>
            )}

            <img
              src={firma.image_url || "https://via.placeholder.com/400x200"}
              style={styles.image}
            />

            <div style={styles.content}>
              <h3 style={styles.title}>{firma.nume}</h3>

              <p style={styles.city}>📍 {firma.oras}</p>

              <p style={styles.desc}>{firma.descriere}</p>

              <Link href={`/firme/${firma.id}`}>
                <button style={styles.button}>
                  Vezi detalii →
                </button>
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

const styles = {
  container: {
    fontFamily: "Arial",
  },

  hero: {
    background: "#111",
    color: "#fff",
    padding: "40px 20px",
    textAlign: "center" as const,
  },

  heroTitle: {
    fontSize: "28px",
    marginBottom: "20px",
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },

  input: {
    padding: "10px",
    width: "300px",
    borderRadius: "6px",
    border: "none",
  },

  searchBtn: {
    padding: "10px 15px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  categories: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    padding: "20px",
  },

  cat: {
    background: "#fff",
    padding: "10px 15px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },

  section: {
    fontSize: "22px",
    padding: "0 20px",
    marginBottom: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },

  card: {
    position: "relative" as const,
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    transition: "0.2s",
    cursor: "pointer",
  },

  badge: {
    position: "absolute" as const,
    top: "10px",
    left: "10px",
    background: "gold",
    padding: "3px 6px",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover" as const,
  },

  content: {
    padding: "10px",
  },

  title: {
    fontSize: "16px",
    fontWeight: "bold",
  },

  city: {
    fontSize: "13px",
    color: "#777",
  },

  desc: {
    fontSize: "13px",
    marginTop: "5px",
  },

  button: {
    marginTop: "10px",
    padding: "6px 10px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
}
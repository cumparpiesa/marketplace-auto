"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function FirmePage() {
  const [firme, setFirme] = useState<any[]>([])

  useEffect(() => {
    const fetchFirme = async () => {
      const { data, error } = await supabase.from("firme").select("*")

      if (error) {
        console.error(error)
      } else {
        setFirme(data || [])
      }
    }

    fetchFirme()
  }, [])

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Firme</h1>

      <div style={styles.grid}>
        {firme.map((firma) => (
          <div key={firma.id} style={styles.card}>
            
            {/* imagine */}
            <img
              src={firma.image_url || "https://via.placeholder.com/400x200"}
              style={styles.image}
            />

            {/* content */}
            <div style={styles.content}>
              <h3 style={styles.title}>
                {firma.nume || "Magazin"}
              </h3>

              <p style={styles.location}>📍 {firma.oras}</p>

              <p style={styles.desc}>{firma.descriere}</p>

              <p style={styles.phone}>📞 {firma.telefon}</p>

              <a href={`/firme/${firma.id}`} style={styles.btn}>
                Vezi magazin
              </a>
            </div>
          </div>
        ))}
      </div>

      {firme.length === 0 && (
        <p style={{ marginTop: 20 }}>Nu există firme încă.</p>
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
    transition: "0.2s",
  },

  image: {
  width: "100%",
  height: "180px",
  objectFit: "cover" as const,
},

  content: {
    padding: "12px",
  },

  title: {
    margin: "0 0 5px",
  },

  location: {
    fontSize: "12px",
    color: "#777",
  },

  desc: {
    fontSize: "14px",
    margin: "6px 0",
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
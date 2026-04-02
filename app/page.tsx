"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Home() {
  const [firme, setFirme] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("firme")
        .select("*")

      if (error) console.error(error)
      else setFirme(data || [])
    }

    fetchData()
  }, [])

  return (
    <div style={styles.container}>
      
      <h1 style={styles.title}>Firme recomandate</h1>

      <div style={styles.grid}>
        {firme.map((firma) => (
          <div key={firma.id} style={styles.card}>
            
            <img
              src={firma.image_url || "https://via.placeholder.com/400x200"}
              style={styles.image}
            />

            <div style={styles.content}>
              <h2>{firma.nume}</h2>
              <p>{firma.oras}</p>
              <p>{firma.descriere}</p>

              {firma.plan === "pro" && (
                <span style={styles.badge}>PRO</span>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
  },
  title: {
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#fff",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover" as const,
  },
  content: {
    padding: "10px",
  },
  badge: {
    background: "gold",
    padding: "4px 8px",
    borderRadius: "5px",
    fontSize: "12px",
    fontWeight: "bold",
  },
}
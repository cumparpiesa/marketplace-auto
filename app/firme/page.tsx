"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function FirmePage() {
  const [firme, setFirme] = useState<any[]>([])

  useEffect(() => {
    const fetchFirme = async () => {
      const { data, error } = await supabase.from("firme").select("*")

      if (error) console.error(error)
      else setFirme(data || [])
    }

    fetchFirme()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>Firme</h1>

      <div style={styles.grid}>
        {firme.map((firma) => (
          <div key={firma.id} style={styles.card}>
            <h3>{firma.nume}</h3>
            <p>{firma.descriere}</p>

            <button style={styles.btn}>Vezi magazin</button>
          </div>
        ))}
      </div>

      {firme.length === 0 && <p>Nu există firme încă.</p>}
    </div>
  )
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  btn: {
    marginTop: "10px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
}
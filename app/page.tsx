"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function FirmePage() {
  const [firme, setFirme] = useState<any[]>([])

  useEffect(() => {
    fetchFirme()
  }, [])

  const fetchFirme = async () => {
    const { data, error } = await supabase.from("firme").select("*")

    if (error) console.log(error)
    else setFirme(data || [])
  }

  const promoveaza = async () => {
    const res = await fetch("/api/create-checkout", {
      method: "POST",
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Firme</h1>

      {firme.map((firma) => (
        <div key={firma.id} style={styles.card}>
          {firma.image_url && (
            <img src={firma.image_url} style={styles.image} />
          )}

          <h2>{firma.nume}</h2>
          <p>{firma.oras}</p>
          <p>{firma.telefon}</p>
          <p>{firma.descriere}</p>

          {/* BADGE PRO */}
          {firma.is_pro && (
            <span style={styles.badge}>PRO</span>
          )}

          {/* BUTON PROMOVARE */}
          {!firma.is_pro && (
            <button style={styles.button} onClick={promoveaza}>
              🚀 Promovează (300 lei)
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

const styles: any = {
  card: {
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 10,
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "gold",
    padding: "5px 10px",
    borderRadius: 5,
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
    padding: "10px 15px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
}
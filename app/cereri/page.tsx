"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function CereriPage() {
  const [cereri, setCereri] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCereri()
  }, [])

  const fetchCereri = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("cereri")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) console.log(error)

    setCereri(data || [])
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cereri piese</h1>

      {loading ? (
        <p>Se încarcă...</p>
      ) : cereri.length === 0 ? (
        <p>Nu există cereri</p>
      ) : (
        <div style={styles.grid}>
          {cereri.map((c) => (
            <Link key={c.id} href={`/cereri/${c.id}`}>
              <div style={styles.card}>
                <h3>{c.titlu}</h3>
                <p style={styles.city}>📍 {c.oras}</p>
                <p>{c.descriere}</p>

                <button style={styles.button}>Vezi detalii</button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "40px auto",
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
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "10px",
    background: "#fff",
    cursor: "pointer",
  },

  city: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "10px",
  },

  button: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
}
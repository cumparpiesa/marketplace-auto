"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function CereriPage() {
  const [cereri, setCereri] = useState<any[]>([])

  useEffect(() => {
    fetchCereri()
  }, [])

  const fetchCereri = async () => {
    const { data } = await supabase
      .from("cereri")
      .select("*")
      .order("created_at", { ascending: false })

    setCereri(data || [])
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Cereri piese</h1>

      {cereri.length === 0 && <p>Nu există cereri</p>}

      <div style={styles.grid}>
        {cereri.map((c) => (
          <Link key={c.id} href={`/cereri/${c.id}`}>
            <div style={styles.card}>
              <h3>{c.titlu}</h3>
              <p>📍 {c.oras}</p>
              <p>{c.descriere}</p>

              <button style={styles.btn}>Vezi cerere</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "10px",
    background: "#fff",
  },
  btn: {
    marginTop: "10px",
    padding: "8px",
    background: "#0070f3",
    color: "#fff",
    borderRadius: "6px",
    border: "none",
  },
}
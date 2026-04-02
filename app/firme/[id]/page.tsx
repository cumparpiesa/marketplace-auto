"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function FirmaPage() {
  const { id } = useParams()
  const [firma, setFirma] = useState<any>(null)
  const [produse, setProduse] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      // 🔹 ia firma
      const { data: firmaData } = await supabase
        .from("firme")
        .select("*")
        .eq("id", id)
        .single()

      setFirma(firmaData)

      // 🔹 ia produsele firmei
      const { data: produseData } = await supabase
        .from("products")
        .select("*")
        .eq("firma_id", id)

      setProduse(produseData || [])
    }

    fetchData()
  }, [id])

  if (!firma) return <p>Se încarcă...</p>

  return (
    <div style={{ padding: 20 }}>
      <h1>{firma.nume}</h1>
      <p>{firma.descriere}</p>

      <h2 style={{ marginTop: 30 }}>Produse</h2>

      <div style={styles.grid}>
        {produse.map((p) => (
          <div key={p.id} style={styles.card}>
            <h3>{p.nume}</h3>
            <p>{p.descriere}</p>
            <strong>{p.pret} lei</strong>
          </div>
        ))}
      </div>

      {produse.length === 0 && <p>Nu există produse.</p>}
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
  },
}
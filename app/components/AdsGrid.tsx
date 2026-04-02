"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdsGrid() {
  const [ads, setAds] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("ads").select("*")
      setAds(data || [])
    }

    load()
  }, [])

  return (
    <div>
      <h2>Anunțuri promovate</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 20,
        marginTop: 20
      }}>
        {ads.map((ad) => (
          <div key={ad.id} style={{
            background: "white",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}>
            <img src={ad.image} style={{
              width: "100%",
              height: 160,
              objectFit: "cover"
            }} />

            <div style={{ padding: 12 }}>
              <h4>{ad.title}</h4>
              <p style={{ fontSize: 13 }}>{ad.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
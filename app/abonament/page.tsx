"use client"

import { useState } from "react"

export default function AbonamentPage() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Eroare plată")
      }
    } catch {
      alert("Eroare conexiune")
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Abonamente</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        
        {/* FREE */}
        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h2>FREE</h2>
          <p>max 3 cereri</p>
          <button disabled>Plan activ</button>
        </div>

        {/* BUSINESS */}
        <div style={{ border: "2px solid green", padding: "20px" }}>
          <h2>BUSINESS</h2>
          <p>300 lei</p>
          <button onClick={handleCheckout}>
            {loading ? "Se încarcă..." : "Activează"}
          </button>
        </div>

        {/* GOLD */}
        <div style={{ border: "2px solid gold", padding: "20px" }}>
          <h2>GOLD</h2>
          <p>500 lei</p>
          <button onClick={handleCheckout}>
            {loading ? "Se încarcă..." : "Activează"}
          </button>
        </div>

      </div>
    </div>
  )
}
"use client"

import { useState } from "react"

export default function AbonamentPage() {
  const [loading, setLoading] = useState(false)

  async function buy(plan: string) {
    setLoading(true)

    const email = prompt("Introdu emailul contului tău") || ""

    const res = await fetch("/api/create-checkout", {
      method: "POST",
      body: JSON.stringify({ plan, email }),
    })

    const data = await res.json()

    window.location.href = data.url
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Abonamente</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
        {/* FREE */}
        <div style={{ padding: 20, border: "1px solid #ccc" }}>
          <h2>FREE</h2>
          <p>max 3 cereri</p>
          <button disabled>Plan activ</button>
        </div>

        {/* BUSINESS */}
        <div style={{ padding: 20, border: "2px solid green" }}>
          <h2>BUSINESS</h2>
          <p>300 lei</p>
          <button
            onClick={() => buy("business")}
            style={{ background: "gold", padding: 10 }}
          >
            Activează
          </button>
        </div>

        {/* GOLD */}
        <div style={{ padding: 20, border: "2px solid orange" }}>
          <h2>GOLD</h2>
          <p>500 lei</p>
          <button
            onClick={() => buy("gold")}
            style={{ background: "green", color: "white", padding: 10 }}
          >
            Activează
          </button>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <h2>Cumpără credite</h2>
        <button
          onClick={() => buy("credit")}
          style={{ background: "green", color: "white", padding: 10 }}
        >
          100 credite - 50 lei
        </button>
      </div>
    </div>
  )
}
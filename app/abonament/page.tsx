"use client"

import { useState } from "react"

export default function AbonamentPage() {
  const [loading, setLoading] = useState(false)

  async function buy(plan: string) {
    try {
      setLoading(true)

      const email = prompt("Introdu emailul contului tău") || ""

      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan, email }),
      })

      if (!res.ok) {
        alert("Eroare server")
        setLoading(false)
        return
      }

      const data = await res.json()

      if (!data.url) {
        alert("Nu s-a primit link Stripe")
        setLoading(false)
        return
      }

      window.location.href = data.url
    } catch (err) {
      alert("Eroare conexiune")
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, marginBottom: 30 }}>Abonamente</h1>

      <div style={{ display: "flex", gap: 20 }}>
        
        {/* FREE */}
        <div
          style={{
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 10,
            width: 200,
            textAlign: "center",
            background: "#f5f5f5",
          }}
        >
          <h2>FREE</h2>
          <p>max 3 cereri</p>

          <button
            style={{
              marginTop: 10,
              padding: "8px 16px",
              background: "gray",
              color: "white",
              borderRadius: 6,
              border: "none",
            }}
            disabled
          >
            Plan activ
          </button>
        </div>

        {/* BUSINESS */}
        <div
          style={{
            padding: 20,
            border: "2px solid green",
            borderRadius: 10,
            width: 200,
            textAlign: "center",
          }}
        >
          <h2>BUSINESS</h2>
          <p>300 lei</p>

          <button
            onClick={() => buy("business")}
            disabled={loading}
            style={{
              marginTop: 10,
              padding: "8px 16px",
              background: "gold",
              color: "black",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Se încarcă..." : "Activează"}
          </button>
        </div>

        {/* GOLD */}
        <div
          style={{
            padding: 20,
            border: "2px solid orange",
            borderRadius: 10,
            width: 200,
            textAlign: "center",
          }}
        >
          <h2>GOLD</h2>
          <p>500 lei</p>

          <button
            onClick={() => buy("gold")}
            disabled={loading}
            style={{
              marginTop: 10,
              padding: "8px 16px",
              background: "green",
              color: "white",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Se încarcă..." : "Activează"}
          </button>
        </div>
      </div>

      {/* CREDIT */}
      <div style={{ marginTop: 50 }}>
        <h2>Cumpără credite</h2>

        <button
          onClick={() => buy("credit")}
          disabled={loading}
          style={{
            marginTop: 10,
            padding: "10px 20px",
            background: "green",
            color: "white",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Se încarcă..." : "Cumpără 100 credite (50 lei)"}
        </button>
      </div>
    </div>
  )
}
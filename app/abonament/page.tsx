"use client"

import { useEffect, useState } from "react"

export default function AbonamentPage() {
  const [loading, setLoading] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<string | null>(null)

  // 🔥 ia planul userului
  useEffect(() => {
    fetch("/api/me")
      .then(res => res.json())
      .then(data => {
        if (data?.profile?.subscription) {
          setCurrentPlan(data.profile.subscription)
        }
      })
  }, [])

  async function buy(plan: string) {
    setLoading(true)

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Eroare Stripe")
      }
    } catch (err) {
      alert("Eroare conexiune")
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>
        Abonamente
      </h1>

      <div style={{ display: "flex", gap: "20px" }}>
        
        {/* FREE */}
        <div style={card}>
          <h2>FREE</h2>
          <p>max 3 cereri</p>
          <button disabled style={btnDisabled}>
            Plan activ
          </button>
        </div>

        {/* BUSINESS */}
        <div style={{ ...card, border: "2px solid green" }}>
          <h2>BUSINESS</h2>
          <p>300 lei</p>

          {currentPlan === "business" ? (
            <button style={btnActive}>Activ</button>
          ) : (
            <button
              style={btn}
              onClick={() => buy("business")}
              disabled={loading}
            >
              {loading ? "Se încarcă..." : "Activează"}
            </button>
          )}
        </div>

        {/* GOLD */}
        <div style={{ ...card, border: "2px solid gold" }}>
          <h2>GOLD</h2>
          <p>500 lei</p>

          {currentPlan === "gold" ? (
            <button style={btnActive}>Activ</button>
          ) : (
            <button
              style={btn}
              onClick={() => buy("gold")}
              disabled={loading}
            >
              {loading ? "Se încarcă..." : "Activează"}
            </button>
          )}
        </div>
      </div>

      {/* CREDIT */}
      <div style={{ marginTop: "60px" }}>
        <h2>Cumpără credite</h2>

        <button
          style={{ ...btn, marginTop: "10px" }}
          onClick={() => buy("credits")}
        >
          Cumpără 100 credite (50 lei)
        </button>
      </div>
    </div>
  )
}

/* 🎨 STYLES */
const card: any = {
  background: "#f5f5f5",
  padding: "20px",
  borderRadius: "10px",
  width: "200px",
  textAlign: "center",
}

const btn: any = {
  marginTop: "10px",
  padding: "10px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
}

const btnDisabled: any = {
  marginTop: "10px",
  padding: "10px",
  background: "gray",
  color: "white",
  border: "none",
  borderRadius: "6px",
}

const btnActive: any = {
  marginTop: "10px",
  padding: "10px",
  background: "gold",
  color: "black",
  border: "none",
  borderRadius: "6px",
}
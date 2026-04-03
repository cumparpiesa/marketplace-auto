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
    } catch (err) {
      alert("Eroare conexiune")
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Abonamente</h1>

      <button
        onClick={handleCheckout}
        style={{
          background: "green",
          color: "white",
          padding: "10px",
          borderRadius: "8px"
        }}
      >
        {loading ? "Se încarcă..." : "Cumpără abonament"}
      </button>
    </div>
  )
}
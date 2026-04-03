"use client"

import { useState } from "react"

export default function AbonamentClient() {
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
    <button
      onClick={handleCheckout}
      style={{
        background: "green",
        color: "white",
        padding: "12px",
        borderRadius: "8px"
      }}
    >
      {loading ? "Se încarcă..." : "Activează GOLD"}
    </button>
  )
}
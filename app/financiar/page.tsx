"use client"

import { useState } from "react"

export default function FinanciarPage() {
  const [selected, setSelected] = useState<number | null>(null)

  const plans = [
    { credits: 100, price: 10 },
    { credits: 300, price: 25 },
    { credits: 500, price: 40 },
    { credits: 1000, price: 80 },
  ]

  const handleBuy = async (plan: any) => {
    const res = await fetch("/api/stripe/credits", {
      method: "POST",
      body: JSON.stringify(plan),
    })

    const data = await res.json()
    window.location.href = data.url
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Alimentează contul</h1>

      {plans.map((p, i) => (
        <div key={i} style={card}>
          <b>{p.credits} credite</b> = {p.price}€
          <button onClick={() => handleBuy(p)}>Alege</button>
        </div>
      ))}
    </div>
  )
}

const card = {
  border: "1px solid #ccc",
  padding: 15,
  marginBottom: 10,
}
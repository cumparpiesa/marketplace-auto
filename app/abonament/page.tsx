"use client"

import { supabase } from "@/lib/supabaseClient"

export default function AbonamentPage() {

  const buyCredits = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("Login necesar")
      return
    }

    const res = await fetch("/api/create-checkout", {
      method: "POST",
      body: JSON.stringify({
        user_id: user.id,
      }),
    })

    const data = await res.json()
    window.location.href = data.url
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Abonamente</h1>

      <div style={{ display: "flex", gap: 20 }}>

        <div style={{ border: "1px solid #ddd", padding: 20 }}>
          <h3>FREE</h3>
          <p>max 3 cereri</p>
        </div>

        <div style={{ border: "1px solid green", padding: 20 }}>
          <h3>BUSINESS</h3>
          <p>300 lei</p>
        </div>

        <div style={{ border: "1px solid gold", padding: 20 }}>
          <h3>GOLD</h3>
          <p>500 lei</p>
        </div>

      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2>Cumpără credite</h2>

      <button
        onClick={buyCredits}
        style={{
          padding: 12,
          background: "green",
          color: "white",
          borderRadius: 8,
          marginTop: 10
        }}
      >
        Cumpără 100 credite (50 lei)
      </button>
    </div>
  )
}
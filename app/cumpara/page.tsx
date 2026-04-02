"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
export default function Cumpara() {
  const [telefon, setTelefon] = useState("")

  const cumpara = async (puncte: number) => {
    if (!telefon) {
      alert("Introdu telefon")
      return
    }

    // caută user
    let { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("phone", telefon)
      .single()

    // dacă nu există → creează
    if (!user) {
      const { data: newUser } = await supabase
        .from("users")
        .insert([
          {
            phone: telefon,
            points: puncte,
          },
        ])
        .select()
        .single()

      alert("Cont creat + puncte adăugate!")
      return
    }

    // update puncte
    await supabase
      .from("users")
      .update({ points: user.points + puncte })
      .eq("id", user.id)

    alert("Ai primit " + puncte + " puncte!")
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Cumpără puncte</h1>

      <input
        placeholder="Telefon"
        value={telefon}
        onChange={(e) => setTelefon(e.target.value)}
        style={{ padding: 10, width: "100%", marginBottom: 20 }}
      />

      <button onClick={() => cumpara(10)} style={btn}>
        10 puncte – 10 lei
      </button>

      <button onClick={() => cumpara(50)} style={btn}>
        50 puncte – 40 lei
      </button>

      <button onClick={() => cumpara(100)} style={btn}>
        100 puncte – 70 lei
      </button>
    </div>
  )
}

const btn = {
  display: "block",
  marginBottom: 10,
  padding: "12px",
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  width: "100%",
}
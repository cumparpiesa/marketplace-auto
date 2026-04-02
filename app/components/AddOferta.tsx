"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClientClient"

export default function AddOferta({ cerereId }: { cerereId: string }) {
  const [pret, setPret] = useState("")
  const [mesaj, setMesaj] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("Trebuie să fii logat")
      setLoading(false)
      return
    }

    const { error } = await supabase.from("oferte").insert([
      {
        cerere_id: cerereId,
        pret: Number(pret),
        mesaj,
        user_id: user.id,
      },
    ])

    if (error) {
      alert("Eroare")
      console.log(error)
      setLoading(false)
      return
    }

    alert("Ofertă trimisă!")
    setPret("")
    setMesaj("")
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 30 }}>
      <h3>Trimite ofertă</h3>

      <input
        placeholder="Preț (lei)"
        value={pret}
        onChange={(e) => setPret(e.target.value)}
        required
        style={input}
      />

      <textarea
        placeholder="Mesaj"
        value={mesaj}
        onChange={(e) => setMesaj(e.target.value)}
        required
        style={{ ...input, height: 80 }}
      />

      <button style={btn}>
        {loading ? "Se trimite..." : "Trimite ofertă"}
      </button>
    </form>
  )
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
}

const btn = {
  padding: "10px 20px",
  background: "#16a34a",
  color: "white",
  border: "none",
  cursor: "pointer",
}
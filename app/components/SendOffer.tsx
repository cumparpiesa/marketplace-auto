"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function SendOffer({ cerereId }: { cerereId: string }) {
  const [mesaj, setMesaj] = useState("")
  const [pret, setPret] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("Trebuie să fii logat")
      setLoading(false)
      return
    }

    // 🔥 verificare PRO
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_pro")
      .eq("id", user.id)
      .single()

    if (!profile?.is_pro) {
      alert("Trebuie să ai abonament PRO")
      setLoading(false)
      return
    }

    const { error } = await supabase.from("oferte").insert([
      {
        cerere_id: cerereId,
        sender_id: user.id,
        mesaj,
        pret: Number(pret),
      },
    ])

    setLoading(false)

    if (error) return alert(error.message)

    alert("Ofertă trimisă!")
    setMesaj("")
    setPret("")
  }

  return (
    <div style={styles.box}>
      <h3>Trimite ofertă</h3>

      <input
        placeholder="Preț"
        value={pret}
        onChange={(e) => setPret(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Mesaj"
        value={mesaj}
        onChange={(e) => setMesaj(e.target.value)}
        style={styles.textarea}
      />

      <button onClick={handleSend} style={styles.button}>
        {loading ? "Se trimite..." : "Trimite ofertă"}
      </button>
    </div>
  )
}

const styles = {
  box: {
    marginTop: "30px",
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    background: "#0070f3",
    color: "#fff",
    borderRadius: "6px",
  },
}
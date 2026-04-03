"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function SendOffer({ cerereId }: { cerereId: string }) {
  const [mesaj, setMesaj] = useState("")
  const [pret, setPret] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

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

    // 🔥 verificăm dacă există deja conversație
    let { data: conv } = await supabase
      .from("conversatii")
      .select("*")
      .eq("cerere_id", cerereId)
      .eq("user1", user.id)
      .maybeSingle()

    // 🔥 dacă NU există → creăm
    if (!conv) {
      const { data: newConv, error } = await supabase
        .from("conversatii")
        .insert([
          {
            cerere_id: cerereId,
            user1: user.id,
            user2: null, // se va completa ulterior
          },
        ])
        .select()
        .single()

      if (error) {
        alert(error.message)
        setLoading(false)
        return
      }

      conv = newConv
    }

    // 🔥 trimitem mesaj
    const { error } = await supabase.from("mesaje").insert([
      {
        conversatie_id: conv.id,
        sender_id: user.id,
        mesaj,
        pret: Number(pret),
      },
    ])

    setLoading(false)

    if (error) return alert(error.message)

    alert("Ofertă trimisă!")

    // 🔥 redirect direct în chat
    router.push(`/inbox/${conv.id}`)
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
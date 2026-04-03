"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function ChatPage() {
  const params = useParams()
  const [mesaje, setMesaje] = useState<any[]>([])
  const [text, setText] = useState("")
  const [pret, setPret] = useState("")

  useEffect(() => {
    fetchMesaje()
  }, [])

  const fetchMesaje = async () => {
    const { data } = await supabase
      .from("mesaje")
      .select("*")
      .eq("conversatie_id", params.id)
      .order("created_at", { ascending: true })

    setMesaje(data || [])
  }

  const trimite = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("mesaje").insert([
      {
        conversatie_id: params.id,
        mesaj: text,
        pret: pret ? Number(pret) : null,
        sender_id: user.id,
      },
    ])

    setText("")
    setPret("")
    fetchMesaje()
  }

  return (
    <div style={styles.container}>
      <div style={styles.chat}>
        {mesaje.map((m) => (
          <div key={m.id} style={styles.msg}>
            <p>{m.mesaj}</p>
            {m.pret && <b>{m.pret} RON</b>}
          </div>
        ))}
      </div>

      <input
        placeholder="Mesaj..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        placeholder="Preț ofertă (opțional)"
        value={pret}
        onChange={(e) => setPret(e.target.value)}
      />

      <button onClick={trimite}>Trimite</button>
    </div>
  )
}

const styles = {
  container: { padding: 20 },
  chat: {
    height: 400,
    overflowY: "scroll" as const,
    border: "1px solid #ddd",
    marginBottom: 10,
    padding: 10,
  },
  msg: {
    marginBottom: 10,
    background: "#f1f1f1",
    padding: 8,
    borderRadius: 6,
  },
}
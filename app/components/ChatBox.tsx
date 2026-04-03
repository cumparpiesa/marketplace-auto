"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ChatBox({ conversatieId }: any) {
  const [mesaje, setMesaje] = useState<any[]>([])
  const [text, setText] = useState("")

  useEffect(() => {
    fetchMesaje()

    // 🔥 realtime
    const channel = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "mesaje" },
        () => fetchMesaje()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchMesaje = async () => {
    const { data } = await supabase
      .from("mesaje")
      .select("*")
      .eq("conversatie_id", conversatieId)
      .order("created_at")

    setMesaje(data || [])
  }

  const sendMessage = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("mesaje").insert([
      {
        conversatie_id: conversatieId,
        sender_id: user.id,
        mesaj: text,
      },
    ])

    setText("")
  }

  return (
    <div style={styles.box}>
      <div style={styles.messages}>
        {mesaje.map((m) => (
          <div key={m.id} style={styles.msg}>
            {m.pret && <b>{m.pret} RON</b>}
            <p>{m.mesaj}</p>
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Scrie mesaj..."
        style={styles.input}
      />

      <button onClick={sendMessage}>Trimite</button>
    </div>
  )
}

const styles = {
  box: { border: "1px solid #ddd", padding: "10px" },
  messages: { height: "300px", overflowY: "auto" },
  msg: { marginBottom: "10px" },
  input: { width: "100%", marginTop: "10px" },
}
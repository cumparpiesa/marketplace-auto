"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import type { CSSProperties } from "react"

export default function ChatBox({ conversatieId }: { conversatieId: string }) {
  const [mesaje, setMesaje] = useState<any[]>([])
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchMesaje()

    // 🔥 REALTIME UPDATE
    const channel = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "mesaje",
        },
        () => {
          fetchMesaje()
        }
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
    if (!text) return

    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("Trebuie să fii logat")
      setLoading(false)
      return
    }

    const { error } = await supabase.from("mesaje").insert([
      {
        conversatie_id: conversatieId,
        sender_id: user.id,
        mesaj: text,
      },
    ])

    setLoading(false)

    if (error) return alert(error.message)

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

      <button onClick={sendMessage} style={styles.button}>
        {loading ? "Se trimite..." : "Trimite"}
      </button>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  box: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
    background: "#fff",
  },

  messages: {
    height: "300px",
    overflowY: "auto", // 🔥 FIX IMPORTANT
    marginBottom: "10px",
  },

  msg: {
    marginBottom: "10px",
    padding: "8px",
    background: "#f5f5f5",
    borderRadius: "6px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
}
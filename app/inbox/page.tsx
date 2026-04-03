"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function Inbox() {
  const [conv, setConv] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const { data } = await supabase
      .from("conversatii")
      .select("*")
      .order("created_at", { ascending: false })

    setConv(data || [])
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Inbox</h1>

      {conv.map((c) => (
        <Link key={c.id} href={`/chat/${c.id}`}>
          <div style={styles.card}>
            Conversație #{c.id}
          </div>
        </Link>
      ))}
    </div>
  )
}

const styles = {
  card: {
    padding: 15,
    border: "1px solid #eee",
    marginBottom: 10,
    cursor: "pointer",
  },
}
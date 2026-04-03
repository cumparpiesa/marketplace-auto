"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

export default function Inbox() {
  const [conversatii, setConversatii] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data } = await supabase
      .from("conversatii")
      .select("*")
      .or(`user1.eq.${user?.id},user2.eq.${user?.id}`)

    setConversatii(data || [])
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1>Inbox</h1>

      {conversatii.map((c) => (
        <Link key={c.id} href={`/inbox/${c.id}`}>
          <div style={{ padding: 15, borderBottom: "1px solid #eee" }}>
            Conversație {c.id}
          </div>
        </Link>
      ))}
    </div>
  )
}
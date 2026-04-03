"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function AdaugaDezmembrare() {
  const router = useRouter()
  const [titlu, setTitlu] = useState("")
  const [oras, setOras] = useState("")
  const [descriere, setDescriere] = useState("")

  const handleSubmit = async () => {
    const { data } = await supabase.auth.getUser()
    if (!data.user) return alert("Login necesar")

    await supabase.from("dezmembari").insert([
      { titlu, oras, descriere, user_id: data.user.id },
    ])

    alert("Adăugat!")
    router.push("/")
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", display:"flex", flexDirection:"column", gap:12 }}>
      <h2>Adaugă dezmembrare</h2>
      <input placeholder="Titlu" onChange={(e)=>setTitlu(e.target.value)} />
      <input placeholder="Oraș" onChange={(e)=>setOras(e.target.value)} />
      <textarea placeholder="Descriere" onChange={(e)=>setDescriere(e.target.value)} />
      <button onClick={handleSubmit}>Publică</button>
    </div>
  )
}
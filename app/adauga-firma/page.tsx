"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AdaugaFirma() {
  const [form, setForm] = useState({
    nume: "",
    oras: "",
    telefon: "",
    descriere: "",
  })

  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async () => {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return alert("Login necesar")

    let image_url = ""

    // 🔥 upload imagine
    if (file) {
      const fileName = Date.now() + "-" + file.name

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file)

      if (uploadError) return alert(uploadError.message)

      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(fileName)

      image_url = data.publicUrl
    }

    const { error } = await supabase.from("firme").insert([
      {
        ...form,
        image_url,
        user_id: userData.user.id,
      },
    ])

    if (error) alert(error.message)
    else {
      alert("Firmă adăugată!")
      window.location.href = "/"
    }
  }

  return (
    <div style={styles.container}>
      <h1>Adaugă firmă</h1>

      <input placeholder="Nume firmă"
        onChange={(e)=>setForm({...form, nume:e.target.value})} />

      <input placeholder="Oraș"
        onChange={(e)=>setForm({...form, oras:e.target.value})} />

      <input placeholder="Telefon"
        onChange={(e)=>setForm({...form, telefon:e.target.value})} />

      <textarea placeholder="Descriere firmă"
        onChange={(e)=>setForm({...form, descriere:e.target.value})} />

      <input type="file"
        onChange={(e)=>setFile(e.target.files?.[0] || null)} />

      <button onClick={handleSubmit}>Salvează</button>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
}
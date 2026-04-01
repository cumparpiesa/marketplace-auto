"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AdaugaCerere() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    oras: "",
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

    // 🔥 insert DB
    const { error } = await supabase.from("cereri").insert([
      {
        ...form,
        image_url,
        user_id: userData.user.id,
      },
    ])

    if (error) alert(error.message)
    else {
      alert("Cerere adăugată!")
      window.location.href = "/cereri"
    }
  }

  return (
    <div style={styles.container}>
      <h1>Adaugă cerere</h1>

      <input placeholder="Titlu cerere"
        onChange={(e)=>setForm({...form, title:e.target.value})} />

      <input placeholder="Categorie"
        onChange={(e)=>setForm({...form, category:e.target.value})} />

      <input placeholder="Oraș"
        onChange={(e)=>setForm({...form, oras:e.target.value})} />

      <textarea placeholder="Descriere"
        onChange={(e)=>setForm({...form, description:e.target.value})} />

      <input type="file"
        onChange={(e)=>setFile(e.target.files?.[0] || null)} />

      <button onClick={handleSubmit}>Trimite cererea</button>
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
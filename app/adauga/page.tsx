"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Adauga() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState<any>(null)

  const handleUpload = async () => {
    if (!file) return alert("Selectează imagine")

    const fileName = Date.now() + file.name

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file)

    if (error) return alert(error.message)

    const imageUrl = `https://xxxxx.supabase.co/storage/v1/object/public/images/${fileName}`

    await supabase.from("ads").insert({
      title,
      description: desc,
      image: imageUrl
    })

    alert("Adăugat!")
    location.reload()
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Adaugă reclamă</h1>

      <input placeholder="Titlu" onChange={e => setTitle(e.target.value)} />
      <br /><br />

      <textarea placeholder="Descriere" onChange={e => setDesc(e.target.value)} />
      <br /><br />

      <input type="file" onChange={e => setFile(e.target.files?.[0])} />
      <br /><br />

      <button onClick={handleUpload}>Adaugă</button>
    </div>
  )
}
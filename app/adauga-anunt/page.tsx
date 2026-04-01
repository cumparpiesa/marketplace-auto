import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

const styles: any = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  }
}

export default function AdaugaAnunt() {
  const [form, setForm] = useState({
    titlu: "",
    masina: "",
    oras: "",
    descriere: "",
  })

  const [poza, setPoza] = useState<any>(null)

  const handleSubmit = async () => {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return alert("Login necesar")

    let imageUrl = ""

    if (poza) {
      const fileName = Date.now() + "_" + poza.name
      const { data } = await supabase.storage.from("poze").upload(fileName, poza)
      imageUrl = data?.path || ""
    }

    await supabase.from("anunturi").insert([
      { ...form, imagine: imageUrl, user_id: userData.user.id }
    ])

    alert("Anunț adăugat!")
    window.location.href = "/dezmembrari"
  }

  return (
    <div style={styles.container}>
      <h1>Adaugă dezmembrare</h1>

      <input placeholder="Titlu"
        onChange={(e)=>setForm({...form, titlu:e.target.value})} />

      <input placeholder="Model mașină"
        onChange={(e)=>setForm({...form, masina:e.target.value})} />

      <input placeholder="Oraș"
        onChange={(e)=>setForm({...form, oras:e.target.value})} />

      <textarea placeholder="Descriere"
        onChange={(e)=>setForm({...form, descriere:e.target.value})} />

      <input type="file" onChange={(e)=>setPoza(e.target.files?.[0])} />

      <button onClick={handleSubmit}>Publică</button>
    </div>
  )
}
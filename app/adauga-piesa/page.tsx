"use client"

import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function AdaugaPiesa() {
  const [form, setForm] = useState({
    nume: "",
    categorie: "",
    pret: "",
    oras: "",
    descriere: "",
  })

  const [poza, setPoza] = useState<any>(null)

  const categorii = [
    "Motor","Cutie viteze","Suspensie","Frâne","Direcție",
    "Electrică","Caroserie","Interior","Răcire","Evacuare"
  ]

  const orase = [
    "București","Cluj","Timișoara","Iași","Brașov"
  ]

  const handleSubmit = async () => {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return alert("Login necesar")

    let imageUrl = ""

    if (poza) {
      const fileName = Date.now() + "_" + poza.name

      const { data, error } = await supabase.storage
        .from("poze")
        .upload(fileName, poza)

      if (error) return alert(error.message)

      imageUrl = data.path
    }

    const { error } = await supabase.from("piese").insert([
      {
        ...form,
        imagine: imageUrl,
        user_id: userData.user.id,
      },
    ])

    if (error) alert(error.message)
    else {
      alert("Piesă adăugată!")
      window.location.href = "/catalog"
    }
  }

  return (
    <div style={styles.container}>
      <h1>Adaugă piesă</h1>

      <p>Completează detaliile piesei pentru a fi vizibilă în catalog.</p>

      <input placeholder="Nume piesă"
        onChange={(e)=>setForm({...form, nume:e.target.value})} />

      <select onChange={(e)=>setForm({...form, categorie:e.target.value})}>
        <option>Selectează categorie</option>
        {categorii.map(c => <option key={c}>{c}</option>)}
      </select>

      <input placeholder="Preț"
        onChange={(e)=>setForm({...form, pret:e.target.value})} />

      <select onChange={(e)=>setForm({...form, oras:e.target.value})}>
        <option>Selectează oraș</option>
        {orase.map(o => <option key={o}>{o}</option>)}
      </select>

      <textarea placeholder="Descriere"
        onChange={(e)=>setForm({...form, descriere:e.target.value})} />

      <input type="file" onChange={(e)=>setPoza(e.target.files?.[0])} />

      <button onClick={handleSubmit}>Publică piesa</button>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  }
}
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import type { CSSProperties } from "react"

export default function AdaugaPiesa() {
  const router = useRouter()

  const [form, setForm] = useState({
    nume: "",
    categorie: "",
    pret: "",
    oras: "",
    descriere: "",
  })

  const [poza, setPoza] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const categorii = [
    "Motor","Cutie viteze","Suspensie","Frâne","Direcție",
    "Electrică","Caroserie","Interior","Răcire","Evacuare"
  ]

  const orase = [
    "București","Cluj","Timișoara","Iași","Brașov"
  ]

  const handleSubmit = async () => {
    if (!form.nume || !form.categorie || !form.pret || !form.oras) {
      return alert("Completează toate câmpurile")
    }

    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("Login necesar")
      router.push("/login")
      return
    }

    let imageUrl = ""

    // 🔥 UPLOAD POZĂ
    if (poza) {
      const fileName = `${Date.now()}-${poza.name}`

      const { error } = await supabase.storage
        .from("poze")
        .upload(fileName, poza)

      if (error) {
        alert(error.message)
        setLoading(false)
        return
      }

      const { data } = supabase.storage.from("poze").getPublicUrl(fileName)
      imageUrl = data.publicUrl
    }

    // 🔥 INSERT DB
    const { error } = await supabase.from("piese").insert([
      {
        ...form,
        pret: Number(form.pret),
        imagine: imageUrl,
        user_id: user.id,
      },
    ])

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert("Piesă publicată!")
    router.push("/catalog")
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Adaugă piesă</h2>

        <input
          placeholder="Nume piesă"
          onChange={(e)=>setForm({...form, nume:e.target.value})}
          style={styles.input}
        />

        <select
          onChange={(e)=>setForm({...form, categorie:e.target.value})}
          style={styles.input}
        >
          <option>Selectează categorie</option>
          {categorii.map(c => <option key={c}>{c}</option>)}
        </select>

        <input
          placeholder="Preț (RON)"
          type="number"
          onChange={(e)=>setForm({...form, pret:e.target.value})}
          style={styles.input}
        />

        <select
          onChange={(e)=>setForm({...form, oras:e.target.value})}
          style={styles.input}
        >
          <option>Selectează oraș</option>
          {orase.map(o => <option key={o}>{o}</option>)}
        </select>

        <textarea
          placeholder="Descriere"
          onChange={(e)=>setForm({...form, descriere:e.target.value})}
          style={styles.textarea}
        />

        <input
          type="file"
          onChange={(e)=>setPoza(e.target.files?.[0] || null)}
          style={styles.file}
        />

        <button onClick={handleSubmit} style={styles.button} disabled={loading}>
          {loading ? "Se publică..." : "Publică piesa"}
        </button>
      </div>

      <style>
        {`
        body {
          background: #f5f7fb;
        }

        button:hover {
          opacity: 0.9;
        }
      `}
      </style>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },

  card: {
    width: "500px",
    padding: "25px",
    borderRadius: "14px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  title: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    minHeight: "100px",
  },

  file: {
    marginBottom: "12px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #0070f3, #0055cc)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
}
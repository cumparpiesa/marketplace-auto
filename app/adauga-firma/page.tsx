"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import type { CSSProperties } from "react"

export default function AdaugaFirma() {
  const router = useRouter()

  const [form, setForm] = useState({
    nume: "",
    oras: "",
    descriere: "",
    telefon: "",
  })

  const [poza, setPoza] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.nume || !form.oras || !form.descriere) {
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

    const { error } = await supabase.from("firme").insert([
      {
        ...form,
        image_url: imageUrl,
        plan: "free",
        user_id: user.id,
      },
    ])

    setLoading(false)

    if (error) return alert(error.message)

    alert("Firmă adăugată!")
    router.push("/")
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Adaugă firmă</h2>

        <input placeholder="Nume firmă"
          onChange={(e)=>setForm({...form, nume:e.target.value})}
          style={styles.input}
        />

        <input placeholder="Oraș"
          onChange={(e)=>setForm({...form, oras:e.target.value})}
          style={styles.input}
        />

        <input placeholder="Telefon"
          onChange={(e)=>setForm({...form, telefon:e.target.value})}
          style={styles.input}
        />

        <textarea placeholder="Descriere"
          onChange={(e)=>setForm({...form, descriere:e.target.value})}
          style={styles.textarea}
        />

        <input type="file"
          onChange={(e)=>setPoza(e.target.files?.[0] || null)}
        />

        <button onClick={handleSubmit} style={styles.button}>
          {loading ? "Se salvează..." : "Publică firma"}
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  page: { display: "flex", justifyContent: "center", padding: "40px" },
  card: {
    width: "500px",
    padding: "25px",
    borderRadius: "14px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: { marginBottom: "20px", fontSize: "22px" },
  input: { width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "8px", border: "1px solid #ddd" },
  textarea: { width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "8px", border: "1px solid #ddd" },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg,#0070f3,#0055cc)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
  },
}
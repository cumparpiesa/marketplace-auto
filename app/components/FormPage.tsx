"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

type Props = {
  title: string
  table: string
}

export default function FormPage({ title, table }: Props) {
  const router = useRouter()

  const [titlu, setTitlu] = useState("")
  const [oras, setOras] = useState("")
  const [descriere, setDescriere] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!titlu || !oras || !descriere) {
      return alert("Completează toate câmpurile")
    }

    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("Trebuie să fii logat")
      router.push("/login")
      return
    }

    const { error } = await supabase.from(table).insert([
      {
        titlu,
        oras,
        descriere,
        user_id: user.id,
      },
    ])

    setLoading(false)

    if (error) return alert(error.message)

    alert("Salvat cu succes!")
    router.push("/")
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>{title}</h2>

        <input placeholder="Titlu" onChange={(e) => setTitlu(e.target.value)} style={styles.input} />
        <input placeholder="Oraș" onChange={(e) => setOras(e.target.value)} style={styles.input} />
        <textarea placeholder="Descriere" onChange={(e) => setDescriere(e.target.value)} style={styles.textarea} />

        <button onClick={handleSubmit} style={styles.button}>
          {loading ? "Se salvează..." : "Salvează"}
        </button>
      </div>
    </div>
  )
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    width: "420px",
    padding: "25px",
    borderRadius: "14px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    minHeight: "100px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
  },
}
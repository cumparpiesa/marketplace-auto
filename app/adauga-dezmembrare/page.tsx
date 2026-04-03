"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import type { CSSProperties } from "react"

export default function AdaugaDezmembrare() {
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
      alert("Login necesar")
      router.push("/login")
      return
    }

    const { error } = await supabase.from("dezmembari").insert([
      {
        titlu,
        oras,
        descriere,
        user_id: user.id,
      },
    ])

    setLoading(false)

    if (error) return alert(error.message)

    alert("Dezmembrare adăugată!")
    router.push("/")
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Adaugă dezmembrare</h2>

        <input
          placeholder="Titlu"
          onChange={(e) => setTitlu(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Oraș"
          onChange={(e) => setOras(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Descriere"
          onChange={(e) => setDescriere(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={handleSubmit} style={styles.button}>
          {loading ? "Se salvează..." : "Publică"}
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

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg,#0070f3,#0055cc)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
}
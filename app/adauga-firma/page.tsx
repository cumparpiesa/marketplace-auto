"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function AdaugaFirma() {
  const [form, setForm] = useState({
    nume: "",
    oras: "",
    telefon: "",
    descriere: "",
  })

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.nume || !form.oras || !form.telefon) {
      return alert("Completează toate câmpurile obligatorii")
    }

    setLoading(true)

    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) {
      setLoading(false)
      return alert("Trebuie să fii logat")
    }

    let image_url = ""

    // 🔥 upload imagine
    if (file) {
      const fileName = `${Date.now()}-${file.name}`

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file)

      if (uploadError) {
        setLoading(false)
        return alert(uploadError.message)
      }

      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(fileName)

      image_url = data.publicUrl
    }

    // 🔥 insert în DB
    const { error } = await supabase.from("firme").insert([
      {
        ...form,
        image_url,
        user_id: userData.user.id,
        is_pro: false,
      },
    ])

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Firmă adăugată cu succes 🚀")
      window.location.href = "/"
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Adaugă firmă</h1>

      <input
        name="nume"
        placeholder="Nume firmă"
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="oras"
        placeholder="Oraș"
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="telefon"
        placeholder="Telefon"
        onChange={handleChange}
        style={styles.input}
      />

      <textarea
        name="descriere"
        placeholder="Descriere firmă"
        onChange={handleChange}
        style={styles.textarea}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={styles.file}
      />

      {file && <p>📷 {file.name}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Se salvează..." : "Salvează firmă"}
      </button>
    </div>
  )
}

const styles: any = {
  container: {
    maxWidth: 500,
    margin: "60px auto",
    display: "flex",
    flexDirection: "column",
    gap: 15,
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 10,
    background: "#fff",
  },
  title: {
    textAlign: "center",
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  textarea: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    minHeight: 100,
  },
  file: {
    padding: 5,
  },
  button: {
    padding: 12,
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
  },
}
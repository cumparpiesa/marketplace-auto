"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import type { CSSProperties } from "react"

type Props = {
  title: string
  table: string
}

export default function FormPro({ title, table }: Props) {
  const router = useRouter()

  const [form, setForm] = useState({
    titlu: "",
    oras: "",
    descriere: "",
    telefon: "",
  })

  const [searchOras, setSearchOras] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [poza, setPoza] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  // 🔥 LISTĂ EXTINSĂ
  const orase = [
    "București","Cluj-Napoca","Timișoara","Iași","Brașov",
    "Constanța","Craiova","Oradea","Sibiu","Arad",
    "Satu Mare","Baia Mare","Pitești","Bacău","Suceava",
    "Zalău","Huedin","Carei","Negrești-Oaș","Turda","Dej"
  ]

  const filtered = orase.filter(o =>
    o.toLowerCase().includes(searchOras.toLowerCase())
  )

  const selectOras = (o: string) => {
    setForm({ ...form, oras: o })
    setSearchOras(o)
    setShowDropdown(false)
  }

  const handleSubmit = async () => {
    if (!form.titlu || !form.oras) {
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

    const { error } = await supabase.from(table).insert([
      {
        ...form,
        telefon: table === "cereri" ? null : form.telefon,
        imagine: imageUrl,
        user_id: user.id,
      },
    ])

    setLoading(false)

    if (error) return alert(error.message)

    alert("Salvat!")
    router.push("/")
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>{title}</h2>

        {/* TITLU */}
        <input
          placeholder="Titlu"
          onChange={(e) => setForm({ ...form, titlu: e.target.value })}
          style={styles.input}
        />

        {/* 🔥 AUTOCOMPLETE FIX */}
        <div style={{ position: "relative" }}>
          <input
            placeholder="Caută oraș / comună"
            value={searchOras}
            onFocus={() => setShowDropdown(true)}
            onChange={(e) => {
              setSearchOras(e.target.value)
              setShowDropdown(true)
            }}
            style={styles.input}
          />

          {showDropdown && searchOras && (
            <div style={styles.dropdown}>
              {filtered.length === 0 && (
                <div style={styles.option}>Nu există rezultate</div>
              )}

              {filtered.map((o) => (
                <div
                  key={o}
                  style={styles.option}
                  onMouseDown={() => selectOras(o)}
                >
                  {o}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TELEFON (NU la cereri) */}
        {table !== "cereri" && (
          <input
            placeholder="Telefon"
            onChange={(e) => setForm({ ...form, telefon: e.target.value })}
            style={styles.input}
          />
        )}

        {/* DESCRIERE */}
        <textarea
          placeholder="Descriere"
          onChange={(e) => setForm({ ...form, descriere: e.target.value })}
          style={styles.textarea}
        />

        {/* POZĂ */}
        <input
          type="file"
          onChange={(e) => setPoza(e.target.files?.[0] || null)}
          style={styles.file}
        />

        {/* BUTTON */}
        <button onClick={handleSubmit} style={styles.button}>
          {loading ? "Se salvează..." : "Publică"}
        </button>
      </div>
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

  file: {
    marginBottom: "12px",
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

  dropdown: {
    position: "absolute",
    top: "45px",
    left: 0,
    width: "100%",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    maxHeight: "180px",
    overflowY: "auto",
    zIndex: 999,
  },

  option: {
    padding: "10px",
    cursor: "pointer",
  },
}
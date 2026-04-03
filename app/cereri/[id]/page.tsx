"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function Page() {
  const params = useParams()
  const [cerere, setCerere] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.id) fetchCerere()
  }, [params?.id])

  const fetchCerere = async () => {
    const { data, error } = await supabase
      .from("cereri")
      .select("*")
      .eq("id", params.id)
      .single()

    if (error || !data) {
      setCerere(null)
    } else {
      setCerere(data)
    }

    setLoading(false)
  }

  if (loading) return <p style={{ padding: 20 }}>Se încarcă...</p>
  if (!cerere) return <p style={{ padding: 20 }}>Cererea nu există</p>

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src={cerere.imagine || "https://via.placeholder.com/600x300"}
          style={styles.image}
        />

        <h1>{cerere.titlu}</h1>

        <p>📍 {cerere.oras}</p>

        <p>{cerere.descriere}</p>

        <button
          style={styles.btn}
          onClick={async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
              alert("Login necesar")
              return
            }

            const { data: profile } = await supabase
              .from("profiles")
              .select("plan")
              .eq("id", user.id)
              .single()

            if (profile?.plan !== "pro") {
              alert("Trebuie abonament PRO")
              window.location.href = "/abonament"
              return
            }

            const { data: conv } = await supabase
              .from("conversatii")
              .insert([
                {
                  cerere_id: cerere.id,
                  vanzator_id: user.id,
                },
              ])
              .select()
              .single()

            window.location.href = `/chat/${conv.id}`
          }}
        >
          Trimite ofertă
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: "40px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    maxWidth: "700px",
    width: "100%",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover" as const,
    marginBottom: "15px",
  },
  btn: {
    marginTop: "20px",
    padding: "12px",
    width: "100%",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
  },
}
"use client"

import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddOferta({ cerereId }: { cerereId: string }) {
  const router = useRouter()
  const [pret, setPret] = useState("")

  const handleSend = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("Login necesar")
      return
    }

    // 🔥 profil
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_pro")
      .eq("id", user.id)
      .single()

    // 🔥 dacă NU e PRO → verifică credite
    if (!profile?.is_pro) {
      const { data: credit } = await supabase
        .from("credits")
        .select("credits")
        .eq("user_id", user.id)
        .single()

      if (!credit || credit.credits < 25) {
        alert("Nu ai credite suficiente")
        router.push("/abonament")
        return
      }

      // 🔥 scade credite
      await supabase
        .from("credits")
        .update({ credits: credit.credits - 25 })
        .eq("user_id", user.id)

      await supabase.from("credit_transactions").insert([
        {
          user_id: user.id,
          amount: -25,
          type: "use",
        },
      ])
    }

    // 🔥 salvează oferta
    await supabase.from("oferte").insert([
      {
        user_id: user.id,
        cerere_id: cerereId,
        pret,
      },
    ])

    alert("Ofertă trimisă!")
    router.push("/")
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Trimite ofertă</h2>

      <input
        placeholder="Preț"
        value={pret}
        onChange={(e) => setPret(e.target.value)}
      />

      <button onClick={handleSend}>
        Trimite ofertă (25 credite dacă nu ești PRO)
      </button>
    </div>
  )
}
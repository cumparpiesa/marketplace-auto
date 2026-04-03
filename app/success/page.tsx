"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function SuccessPage() {

  useEffect(() => {
    const addCredits = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await supabase
        .from("credits")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (!data) {
        await supabase.from("credits").insert([
          { user_id: user.id, credits: 100 },
        ])
      } else {
        await supabase
          .from("credits")
          .update({
            credits: data.credits + 100,
          })
          .eq("user_id", user.id)
      }
    }

    addCredits()
  }, [])

  return <h1>Plată reușită 🎉</h1>
}
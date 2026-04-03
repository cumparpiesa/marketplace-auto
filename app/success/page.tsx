"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const addCredits = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

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

      alert("Ai primit 100 credite 🎉")

      router.push("/cereri")
    }

    addCredits()
  }, [])

  return <h1>Se procesează plata...</h1>
}
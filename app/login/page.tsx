"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClientClient"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Login reușit!")
      window.location.href = "/"
    }
  }

  return (
    <div style={styles.container}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Parolă"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

// 🔥 FIX FINAL pentru Vercel (fără erori TypeScript)
const styles: any = {
  container: {
    maxWidth: 400,
    margin: "40px auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
}
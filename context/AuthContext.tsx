"use client"

import { createContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // 🔥 ia user la refresh
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // 🔥 ascultă login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient" // 🔥 FIX

export default function Navbar() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <div style={styles.nav}>
      
      {/* STÂNGA */}
      <div style={styles.left}>
        <span style={styles.logo}>CP</span>

        <Link href="/" style={styles.link}>Home</Link>
        <Link href="/catalog" style={styles.link}>Catalog piese</Link>
        <Link href="/dezmembrari" style={styles.link}>Dezmembrări</Link>
        <Link href="/cereri" style={styles.link}>Cereri</Link>
      </div>

      {/* DREAPTA */}
      <div style={styles.right}>

        <Link href="/adauga-piesa" style={styles.addBtn}>+ Piesă</Link>
        <Link href="/adauga-dezmembrare" style={styles.addBtn}>+ Dezmembrare</Link>
        <Link href="/adauga-cerere" style={styles.addBtn}>+ Cerere</Link>
        <Link href="/adauga-firma" style={styles.addBtn}>+ Firmă</Link>

        <Link href="/abonament" style={styles.proBtn}>
          Abonament
        </Link>

        {user ? (
          <>
            <span style={styles.email}>{user.email}</span>
            <span style={styles.proBadge}>PRO</span>

            <button onClick={logout} style={styles.logout}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" style={styles.link}>Login</Link>
        )}
      </div>
    </div>
  )
}
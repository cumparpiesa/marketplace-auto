"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabaseServer } from "../../lib/supabaseServer"

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

        {/* BUTOANE ADAUGARE */}
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

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 24px",
    background: "#1e3a8a",
    color: "white",
  },

  left: {
    display: "flex",
    gap: 25,
    alignItems: "center",
  },

  right: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },

  logo: {
    fontWeight: "bold",
    fontSize: 22,
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: 17,
    fontWeight: 500,
  },

  addBtn: {
    background: "#3b82f6",
    padding: "7px 12px",
    borderRadius: 6,
    color: "white",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
  },

  proBtn: {
    background: "#facc15",
    padding: "7px 14px",
    borderRadius: 6,
    color: "black",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: 15,
  },

  email: {
    fontSize: 14,
    marginLeft: 5,
  },

  proBadge: {
    background: "gold",
    color: "black",
    padding: "4px 7px",
    borderRadius: 5,
    fontSize: 12,
    fontWeight: "bold",
  },

  logout: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "7px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
  },
}
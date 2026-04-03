"use client"

import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <div style={{
      background: "#0f172a",
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "white"
    }}>
      
      {/* LEFT */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <b style={{ color: "#3b82f6" }}>cumparpiesa.ro</b>

        <a href="/">Home</a>
        <a href="/catalog">Catalog</a>
        <a href="/dezmembrari">Dezmembrări</a>
        <a href="/cereri">Cereri</a>
        <a href="/firme">Firme</a>
      </div>

      {/* CENTER */}
      <input
        placeholder="Caută piese, firme..."
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          border: "none",
          width: "300px"
        }}
      />

      {/* RIGHT */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <a href="/adauga-piesa">+ Piesă</a>
        <a href="/dezmembrari">+ Dezmembrare</a>
        <a href="/cereri">+ Cerere</a>
        <a href="/firma">+ Firmă</a>

        <a href="/abonament" style={{
          background: "gold",
          color: "black",
          padding: "6px 10px",
          borderRadius: "6px"
        }}>
          Abonament
        </a>

        <span>admin@autoalmani.ro</span>

        <button
          onClick={logout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
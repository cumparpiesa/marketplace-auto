"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      background: "#0f172a",
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "white"
    }}>

      {/* LOGO */}
      <div style={{ fontWeight: "bold", fontSize: 20 }}>
        cumparpiese.ro
      </div>

      {/* SEARCH */}
      <input
        placeholder="Caută piese, firme, cereri..."
        style={{
          width: 400,
          padding: 10,
          borderRadius: 10,
          border: "none"
        }}
      />

      {/* MENIU */}
      <div style={{ display: "flex", gap: 15 }}>
        <Link href="/">Home</Link>
        <Link href="/catalog">Catalog</Link>
        <Link href="/dezmembrari">Dezmembrări</Link>
        <Link href="/cereri">Cereri</Link>
        <Link href="/firme">Firme</Link>

        <Link href="/login" style={{
          background: "#2563eb",
          padding: "6px 12px",
          borderRadius: 6
        }}>
          Login
        </Link>
      </div>

    </nav>
  );
}
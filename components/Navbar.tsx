"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      background: "#0f172a",
      padding: "12px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white"
    }}>
      
      {/* LOGO */}
      <div style={{ fontWeight: "bold", fontSize: 20 }}>
        cumparpiese.ro
      </div>

      {/* MENIU */}
      <div style={{ display: "flex", gap: 20 }}>
        <Link href="/">Home</Link>
        <Link href="/catalog">Catalog</Link>
        <Link href="/dezmembrari">Dezmembrări</Link>
        <Link href="/cereri">Cereri</Link>
        <Link href="/firme">Firme</Link>
      </div>

      {/* ACTIONS */}
      <div style={{ display: "flex", gap: 10 }}>
        <Link href="/adauga-piesa">+ Piesă</Link>
        <Link href="/adauga-dezmembrare">+ Dezmembrare</Link>
        <Link href="/adauga-cerere">+ Cerere</Link>
        <Link href="/adauga-firma">+ Firmă</Link>

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
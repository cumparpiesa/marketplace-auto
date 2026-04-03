"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      background: "#0f172a",
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "white"
    }}>
      <div style={{ fontWeight: "bold" }}>
        cumparpiese.ro
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <Link href="/">Home</Link>
        <Link href="/catalog">Catalog</Link>
        <Link href="/dezmembrari">Dezmembrări</Link>
        <Link href="/cereri">Cereri</Link>
        <Link href="/firme">Firme</Link>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
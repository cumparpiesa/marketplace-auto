"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      background: "#0f172a",
      color: "white",
      padding: "14px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      
      {/* LOGO */}
      <div style={{ fontWeight: "bold", fontSize: 20 }}>
        cumparpiese.ro
      </div>

      {/* MENIU */}
      <div style={{
        display: "flex",
        gap: "24px",
        fontSize: 16
      }}>
        <Link href="/">Home</Link>
        <Link href="/catalog">Catalog</Link>
        <Link href="/dezmembrari">Dezmembrări</Link>
        <Link href="/cereri">Cereri</Link>
        <Link href="/firme">Firme</Link>
      </div>

      {/* ACTIUNI */}
      <div style={{
        display: "flex",
        gap: "12px",
        alignItems: "center"
      }}>
        <Link href="/adauga-piesa">+ Piesă</Link>
        <Link href="/adauga-dezmembrare">+ Dezmembrare</Link>
        <Link href="/adauga-cerere">+ Cerere</Link>
        <Link href="/adauga-firma">+ Firmă</Link>

        <Link href="/login">Login</Link>
      </div>

    </nav>
  );
}
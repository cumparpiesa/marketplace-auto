"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav style={styles.nav}>
      {/* LOGO */}
      <Link href="/" style={styles.logo}>
        cumparpiesa.ro
      </Link>

      {/* MENIU */}
      <div style={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/catalog">Catalog</Link>
        <Link href="/dezmembrari">Dezmembări</Link>
        <Link href="/cereri">Cereri</Link>
        <Link href="/firme">Firme</Link>
      </div>

      {/* SEARCH */}
      <input
        style={styles.search}
        placeholder="Caută piese, firme..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ACTIONS */}
      <div style={styles.actions}>
        <Link href="/adauga-piesa" style={styles.btn}>+ Piesă</Link>
        <Link href="/adauga-dezmembrare" style={styles.btn}>+ Dezmembrare</Link>
        <Link href="/adauga-cerere" style={styles.btn}>+ Cerere</Link>
        <Link href="/adauga-firma" style={styles.btn}>+ Firmă</Link>

        <Link href="/abonament" style={styles.abonament}>
          Abonament
        </Link>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#0f172a",
    color: "white",
    flexWrap: "wrap",
    gap: "10px",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#3b82f6",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  search: {
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    width: "220px",
  },
  actions: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  btn: {
    background: "#2563eb",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    textDecoration: "none",
  },
  abonament: {
    background: "#facc15",
    color: "black",
    padding: "6px 10px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
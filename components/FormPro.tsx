"use client";

import { useState } from "react";

export default function FormPro({ title }: { title: string }) {
  const [data, setData] = useState({
    titlu: "",
    descriere: "",
    oras: "",
    pret: ""
  });

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1>{title}</h1>

      <input placeholder="Titlu"
        onChange={e => setData({...data, titlu: e.target.value})} />

      <textarea placeholder="Descriere"
        onChange={e => setData({...data, descriere: e.target.value})} />

      <input placeholder="Oraș"
        onChange={e => setData({...data, oras: e.target.value})} />

      <input placeholder="Preț"
        onChange={e => setData({...data, pret: e.target.value})} />

      <button style={{
        marginTop: 10,
        background: "#2563eb",
        color: "white",
        padding: 10,
        borderRadius: 6
      }}>
        Trimite
      </button>
    </div>
  );
}
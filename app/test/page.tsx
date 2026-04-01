"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function TestPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");

      if (error) {
        console.error("Eroare:", error);
      } else {
        console.log("DATA:", data);
        setProfiles(data || []);
      }

      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return <p style={{ padding: 40 }}>Se încarcă...</p>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Profile din DB</h1>

      {profiles.length === 0 && <p>Nu există profile</p>}

      {profiles.map((p) => (
        <div key={p.id} style={card}>
          <p><b>Tip:</b> {p.type}</p>
          <p><b>Nume:</b> {p.name}</p>
          <p><b>Telefon:</b> {p.phone}</p>

          {p.type === "firma" && (
            <p><b>Firmă:</b> {p.company}</p>
          )}
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "#fff",
  padding: "20px",
  marginTop: "10px",
  borderRadius: "8px",
};
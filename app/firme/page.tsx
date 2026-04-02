"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function FirmePage() {
  const [firme, setFirme] = useState<any[]>([]);

  useEffect(() => {
    loadFirme();
  }, []);

  async function loadFirme() {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("type", "firma");

    if (data) setFirme(data);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Firme</h1>

      {firme.map((f) => (
        <div key={f.id} style={{ marginBottom: 10 }}>
          {f.company}
        </div>
      ))}
    </div>
  );
}
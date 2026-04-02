"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const styles = {
  container: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: 10,
  }
}

export default function AdaugaAnunt() {
  const [form, setForm] = useState({
    titlu: "",
    masina: "",
    oras: "",
    descriere: "",
  });

  const [poza, setPoza] = useState<File | null>(null);

  const handleSubmit = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      alert("Login necesar");
      return;
    }

    let imageUrl = "";

    if (poza) {
      const fileName = Date.now() + "_" + poza.name;

      const { data, error } = await supabase.storage
        .from("poze")
        .upload(fileName, poza);

      if (error) {
        alert("Eroare upload imagine");
        return;
      }

      imageUrl = data?.path || "";
    }

    const { error } = await supabase.from("anunturi").insert([
      {
        ...form,
        imagine: imageUrl,
        user_id: userData.user.id,
      },
    ]);

    if (error) {
      alert("Eroare salvare anunt");
      return;
    }

    alert("Anunț adăugat!");
    window.location.href = "/dezmembrari";
  };

  return (
    <div style={styles.container}>
      <h1>Adaugă dezmembrare</h1>

      <input
        placeholder="Titlu"
        onChange={(e) =>
          setForm({ ...form, titlu: e.target.value })
        }
      />

      <input
        placeholder="Model mașină"
        onChange={(e) =>
          setForm({ ...form, masina: e.target.value })
        }
      />

      <input
        placeholder="Oraș"
        onChange={(e) =>
          setForm({ ...form, oras: e.target.value })
        }
      />

      <textarea
        placeholder="Descriere"
        onChange={(e) =>
          setForm({ ...form, descriere: e.target.value })
        }
      />

      <input
        type="file"
        onChange={(e) =>
          setPoza(e.target.files?.[0] || null)
        }
      />

      <button onClick={handleSubmit}>
        Publică
      </button>
    </div>
  );
}
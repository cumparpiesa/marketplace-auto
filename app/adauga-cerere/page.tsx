"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient"

const styles: any = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
};

export default function AdaugaCerere() {
  const [form, setForm] = useState({
    titlu: "",
    masina: "",
    oras: "",
    descriere: "",
  });

  const handleSubmit = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      alert("Login necesar");
      return;
    }

    const { error } = await supabase.from("cereri").insert([
      {
        ...form,
        user_id: userData.user.id,
      },
    ]);

    if (error) {
      alert("Eroare salvare cerere");
      return;
    }

    alert("Cerere adăugată!");
    window.location.href = "/cereri";
  };

  return (
    <div style={styles.container}>
      <h1>Adaugă cerere</h1>

      <input
        placeholder="Titlu cerere"
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

      <button onClick={handleSubmit}>
        Publică cererea
      </button>
    </div>
  );
}
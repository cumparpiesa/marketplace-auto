"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilPage() {
  const [profil, setProfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Nu ești logat");
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!data) {
      // 🔥 creează profil gol dacă nu există
      const newProfile = {
        id: user.id,
        type: "persoana",
        name: "",
        phone: "",
        address: "",
        company: "",
        cui: "",
        cnp: "",
      };

      await supabase.from("profiles").insert([newProfile]);
      setProfil(newProfile);
    } else {
      setProfil(data);
    }

    setLoading(false);
  }

  async function saveProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase
      .from("profiles")
      .update(profil)
      .eq("id", user?.id);

    alert("Profil salvat ✅");
    setEdit(false);
  }

  if (loading) {
    return <p style={{ padding: 40 }}>Se încarcă profil...</p>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1>Profil</h1>

      {/* TIP */}
      <label>Tip cont:</label>
      {edit ? (
        <select
          value={profil.type}
          onChange={(e) =>
            setProfil({ ...profil, type: e.target.value })
          }
          style={input}
        >
          <option value="persoana">Persoană</option>
          <option value="firma">Firmă</option>
        </select>
      ) : (
        <p>{profil.type}</p>
      )}

      {/* NUME */}
      <label>Nume:</label>
      {edit ? (
        <input
          value={profil.name}
          onChange={(e) =>
            setProfil({ ...profil, name: e.target.value })
          }
          style={input}
        />
      ) : (
        <p>{profil.name}</p>
      )}

      {/* TELEFON */}
      <label>Telefon:</label>
      {edit ? (
        <input
          value={profil.phone}
          onChange={(e) =>
            setProfil({ ...profil, phone: e.target.value })
          }
          style={input}
        />
      ) : (
        <p>{profil.phone}</p>
      )}

      {/* ADRESA */}
      <label>Adresă:</label>
      {edit ? (
        <input
          value={profil.address}
          onChange={(e) =>
            setProfil({ ...profil, address: e.target.value })
          }
          style={input}
        />
      ) : (
        <p>{profil.address}</p>
      )}

      {/* FIRMA */}
      {profil.type === "firma" && (
        <>
          <label>Nume firmă:</label>
          {edit ? (
            <input
              value={profil.company}
              onChange={(e) =>
                setProfil({ ...profil, company: e.target.value })
              }
              style={input}
            />
          ) : (
            <p>{profil.company}</p>
          )}

          <label>CUI:</label>
          {edit ? (
            <input
              value={profil.cui}
              onChange={(e) =>
                setProfil({ ...profil, cui: e.target.value })
              }
              style={input}
            />
          ) : (
            <p>{profil.cui}</p>
          )}
        </>
      )}

      {/* PERSOANA */}
      {profil.type === "persoana" && (
        <>
          <label>CNP:</label>
          {edit ? (
            <input
              value={profil.cnp}
              onChange={(e) =>
                setProfil({ ...profil, cnp: e.target.value })
              }
              style={input}
            />
          ) : (
            <p>{profil.cnp}</p>
          )}
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        {edit ? (
          <button onClick={saveProfile} style={button}>
            Salvează
          </button>
        ) : (
          <button onClick={() => setEdit(true)} style={button}>
            Editează profil
          </button>
        )}
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const button = {
  padding: "10px",
  background: "blue",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};
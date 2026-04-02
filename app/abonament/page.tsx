"use client"

import { supabase } from "@/lib/supabaseClient"
export default function AbonamentPage() {
  const setPlan = async (plan: string) => {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) return alert("Nu ești logat")

    await supabase
      .from("profiles")
      .update({ plan })
      .eq("id", userData.user.id)

    alert("Plan activat: " + plan)
    window.location.reload()
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Abonamente</h1>

      <div style={{ display: "flex", gap: 20 }}>
        <div style={card}>
          <h2>FREE</h2>
          <p>✔ vezi cereri fără detalii</p>
          <p>✔ max 3 cereri</p>
          <button onClick={() => setPlan("free")}>Activează</button>
        </div>

        <div style={{ ...card, border: "2px solid green" }}>
          <h2>BUSINESS</h2>
          <p>✔ 3000 anunțuri</p>
          <p>✔ 1000 oferte gratuite</p>
          <p>✔ vezi detalii</p>
          <h3>300 lei + TVA</h3>
          <button onClick={() => setPlan("business")}>Activează</button>
        </div>

        <div style={{ ...card, border: "2px solid gold" }}>
          <h2>GOLD</h2>
          <p>✔ 100000 anunțuri</p>
          <p>✔ oferte nelimitate</p>
          <p>✔ prioritate</p>
          <h3>500 lei + TVA</h3>
          <button onClick={() => setPlan("gold")}>Activează</button>
        </div>
      </div>
    </div>
  )
}

const card = {
  padding: 20,
  borderRadius: 10,
  background: "#f5f5f5",
  width: 250,
}
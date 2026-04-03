"use client"

export default function AbonamentPage() {
  const buy = async (plan: string) => {
    const res = await fetch("/api/create-checkout", {
      method: "POST",
      body: JSON.stringify({ plan }),
    })

    const data = await res.json()

    window.location.href = data.url
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Abonamente</h1>

      <div style={{ display: "flex", gap: 20 }}>
        
        {/* FREE */}
        <div style={{ border: "1px solid #ccc", padding: 20 }}>
          <h2>FREE</h2>
          <p>max 3 cereri</p>
        </div>

        {/* BUSINESS */}
        <div style={{ border: "2px solid green", padding: 20 }}>
          <h2>BUSINESS</h2>
          <p>300 lei</p>
          <button onClick={() => buy("business")}>
            Activează
          </button>
        </div>

        {/* GOLD */}
        <div style={{ border: "2px solid gold", padding: 20 }}>
          <h2>GOLD</h2>
          <p>500 lei</p>
          <button onClick={() => buy("gold")}>
            Activează
          </button>
        </div>

      </div>
    </div>
  )
}
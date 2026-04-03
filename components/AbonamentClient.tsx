"use client"

export default function AbonamentClient() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Abonamente</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h2>FREE</h2>
          <p>max 3 cereri</p>
        </div>

        <div style={{ border: "1px solid green", padding: "20px" }}>
          <h2>BUSINESS</h2>
          <p>300 lei</p>
          <button onClick={() => alert("Business")}>
            Activează
          </button>
        </div>

        <div style={{ border: "1px solid gold", padding: "20px" }}>
          <h2>GOLD</h2>
          <p>500 lei</p>
          <button onClick={() => alert("Gold")}>
            Activează
          </button>
        </div>

      </div>

      <h2 style={{ marginTop: "40px" }}>Credite</h2>

      <button onClick={() => alert("Stripe aici")}>
        Cumpără 100 credite (50 lei)
      </button>
    </div>
  )
}
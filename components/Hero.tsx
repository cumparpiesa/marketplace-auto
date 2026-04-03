export default function Hero() {
  return (
    <div style={{
      background: "#f3f4f6",
      padding: 40,
      borderRadius: 12,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 40
    }}>
      <div>
        <h1 style={{ fontSize: 30, fontWeight: "bold" }}>
          Vrei și mai multe oferte?
        </h1>
        <p style={{ marginTop: 10 }}>
          Completează o cerere și primești oferte de la firme auto
        </p>
      </div>

      <button style={{
        background: "#f97316",
        color: "white",
        padding: "14px 22px",
        borderRadius: 10,
        border: "none",
        fontWeight: "bold"
      }}>
        Cere oferte de piese
      </button>
    </div>
  )
}
export default function CompaniesSlider() {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 10
      }}>
        <h2>Magazine de piese auto</h2>
        <span>Vezi toate ›</span>
      </div>

      <div style={{
        display: "flex",
        gap: 15,
        overflowX: "auto"
      }}>
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} style={{
            minWidth: 140,
            height: 80,
            background: "#e5e7eb",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            Logo firmă
          </div>
        ))}
      </div>
    </div>
  )
}
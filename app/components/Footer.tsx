import Link from "next/link"

export default function Footer() {
  return (
    <footer style={{ background: "#f4f6f8", marginTop: 60, padding: "40px 20px" }}>
      
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 30
      }}>
        
        {/* LOGO + INFO */}
        <div>
          <h2 style={{ color: "#2563eb" }}>AutoMarket</h2>
          <p style={{ fontSize: 14, marginTop: 10 }}>
            Marketplace piese auto din România
          </p>

          <p style={{ fontSize: 12, marginTop: 10 }}>
            © 2026 AutoMarket SRL
          </p>
        </div>

        {/* ASISTENTA */}
        <div>
          <h3>Asistență clienți</h3>
          <ul style={{ marginTop: 10, fontSize: 14 }}>
            <li><Link href="#">Despre noi</Link></li>
            <li><Link href="#">Cum funcționează</Link></li>
            <li><Link href="#">Cum vinzi</Link></li>
            <li><Link href="#">Cum cumperi</Link></li>
            <li><Link href="#">Garanție & retur</Link></li>
          </ul>
        </div>

        {/* INFORMATII */}
        <div>
          <h3>Informații</h3>
          <ul style={{ marginTop: 10, fontSize: 14 }}>
            <li><Link href="#">Termeni și condiții</Link></li>
            <li><Link href="#">Politica de cookie</Link></li>
            <li><Link href="#">Confidențialitate</Link></li>
            <li><Link href="#">Protecția consumatorului</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3>Urmărește-ne</h3>
          <p style={{ marginTop: 10 }}>
            Facebook
          </p>

          <p style={{ fontSize: 14 }}>
            fb.com/automarket
          </p>

          <div style={{ marginTop: 20 }}>
            <p>Aplicația mobilă</p>
            <p style={{ fontSize: 12 }}>Google Play / App Store</p>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div style={{
        borderTop: "1px solid #ddd",
        marginTop: 40,
        paddingTop: 20,
        textAlign: "center",
        fontSize: 12,
        color: "#666"
      }}>
        Marketplace piese auto • România 🇷🇴
      </div>
    </footer>
  )
}
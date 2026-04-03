import "./globals.css"
import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body>

        {/* NAVBAR */}
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#111",
          color: "white",
          padding: "12px 20px"
        }}>
          <div style={{ display: "flex", gap: "20px" }}>
            <b>CP</b>
            <Link href="/" style={{ color: "white" }}>Home</Link>
            <Link href="/catalog" style={{ color: "white" }}>Catalog piese</Link>
            <Link href="/dezmembrari" style={{ color: "white" }}>Dezmembrări</Link>
            <Link href="/cereri" style={{ color: "white" }}>Cereri</Link>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Link href="/adauga-piesa">
              <button>+ Piesă</button>
            </Link>

            <Link href="/adauga-dezmembrare">
              <button>+ Dezmembrare</button>
            </Link>

            <Link href="/adauga-cerere">
              <button>+ Cerere</button>
            </Link>

            <Link href="/adauga-firma">
              <button>+ Firmă</button>
            </Link>

            <Link href="/abonament">
              <button style={{ background: "gold" }}>Abonament</button>
            </Link>
          </div>
        </nav>

        {/* CONTENT */}
        {children}

        {/* FOOTER */}
        <footer style={{
          background: "#f4f6f8",
          padding: "50px 20px",
          marginTop: "50px",
          borderTop: "1px solid #ddd"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "40px",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>

            <div>
              <h2 style={{ color: "#2563eb" }}>cumparpiesa.ro</h2>
              <p>Marketplace piese auto România</p>
              <p style={{ fontSize: "14px", color: "#666" }}>
                © 2026 <br />
                Almani Roads Construct SRL <br />
                CUI: RO36224947
              </p>
            </div>

            <div>
              <h4>Asistență</h4>
              <p>Cum cumperi piese</p>
              <p>Cum vinzi piese</p>
              <p>Contul meu</p>
              <p>Plată și livrare</p>
            </div>

            <div>
              <h4>Informații</h4>
              <p>Termeni și condiții</p>
              <p>Politica cookies</p>
              <p>Confidențialitate</p>
              <p>Contact</p>
            </div>

            <div>
              <h4>Siguranță</h4>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Logo_ANPC.svg/512px-Logo_ANPC.svg.png"
                style={{ width: "120px" }}
              />
              <p>Protecția consumatorului</p>
            </div>

          </div>

          <div style={{
            marginTop: "40px",
            textAlign: "center",
            fontSize: "13px",
            color: "#666"
          }}>
            Marketplace piese auto • dezmembrări • motoare • România
          </div>
        </footer>

      </body>
    </html>
  )
}
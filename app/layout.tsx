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
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0f172a",
          padding: "10px 20px",
          color: "white",
          gap: "15px",
          flexWrap: "wrap"
        }}>

          {/* LEFT */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap"
          }}>
            <Link href="/" style={{
              fontWeight: "bold",
              fontSize: "18px",
              color: "#3b82f6",
              textDecoration: "none"
            }}>
              cumparpiesa.ro
            </Link>

            <Link href="/" style={link}>Home</Link>
            <Link href="/catalog" style={link}>Catalog</Link>
            <Link href="/dezmembrari" style={link}>Dezmembrări</Link>
            <Link href="/cereri" style={link}>Cereri</Link>
            <Link href="/firme" style={link}>Firme</Link>
          </div>

          {/* SEARCH */}
          <div style={{
            flex: 1,
            minWidth: "200px",
            maxWidth: "400px"
          }}>
            <input
              placeholder="Caută piese, firme..."
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none"
              }}
            />
          </div>

          {/* RIGHT */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap"
          }}>

            <Link href="/adauga-piesa"><button style={btn}>+ Piesă</button></Link>
            <Link href="/adauga-dezmembrare"><button style={btn}>+ Dezmembrare</button></Link>
            <Link href="/adauga-cerere"><button style={btn}>+ Cerere</button></Link>
            <Link href="/adauga-firma"><button style={btn}>+ Firmă</button></Link>

            {/* ABONAMENT */}
            <Link href="/abonament">
              <button style={{
                background: "gold",
                color: "black",
                border: "none",
                padding: "6px 10px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer"
              }}>
                Abonament
              </button>
            </Link>

            {/* USER */}
            <div style={{
              background: "#1e293b",
              padding: "6px 10px",
              borderRadius: "6px",
              fontSize: "13px"
            }}>
              admin@autoalmani.ro
            </div>

            {/* LOGOUT */}
            <button
              onClick={() => alert("Logout (fake momentan)")}
              style={{
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>

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

            {/* BRAND */}
            <div>
              <h2 style={{ color: "#2563eb" }}>cumparpiesa.ro</h2>
              <p>Marketplace piese auto România</p>

              <p style={{
                fontSize: "14px",
                color: "#666",
                marginTop: "10px",
                lineHeight: "1.6"
              }}>
                © 2026 cumparpiesa.ro <br />
                Almani Roads Construct SRL <br />
                CUI: RO36224947
              </p>
            </div>

            {/* ASISTENTA */}
            <div>
              <h4>Asistență</h4>
              <p>Cum cumperi piese</p>
              <p>Cum vinzi piese</p>
              <p>Contul meu</p>
              <p>Plată și livrare</p>
              <p>Garanție și retur</p>
            </div>

            {/* INFORMATII */}
            <div>
              <h4>Informații</h4>
              <p>Termeni și condiții</p>
              <p>Politica cookies</p>
              <p>Confidențialitate</p>
              <p>Protecția datelor</p>
              <p>Contact</p>
            </div>

            {/* SIGURANTA */}
            <div>
              <h4>Siguranță</h4>

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Logo_ANPC.svg/512px-Logo_ANPC.svg.png"
                alt="ANPC"
                style={{ width: "120px", marginBottom: "10px" }}
              />

              <p style={{ fontSize: "14px" }}>
                Protecția consumatorului
              </p>

              <p>Facebook</p>
            </div>

          </div>

          {/* SEO */}
          <div style={{
            marginTop: "40px",
            fontSize: "13px",
            color: "#666",
            textAlign: "center",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            Marketplace piese auto • dezmembrări auto • motoare • cutii viteze • piese second hand • România • cumpăr piese auto rapid
          </div>

        </footer>

      </body>
    </html>
  )
}

/* STYLES */
const btn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer"
}

const link = {
  color: "white",
  textDecoration: "none"
}
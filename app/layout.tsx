import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body>

        {/* CONTENT */}
        {children}

        {/* FOOTER */}
        <footer style={{
          background: "#f4f6f8",
          padding: "40px 20px",
          marginTop: "50px",
          borderTop: "1px solid #ddd"
        }}>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "30px"
          }}>

            {/* LOGO + FIRMA */}
            <div>
              <h2 style={{ color: "#2563eb" }}>AutoAlmani</h2>
              <p>Marketplace piese auto România</p>
              <p style={{ fontSize: "14px", color: "#666" }}>
                © 2026 AutoAlmani<br />
                RO999777397<br />
                J20/8014/2026
              </p>
            </div>

            {/* AJUTOR */}
            <div>
              <h4>Asistență</h4>
              <p>Cum cumperi</p>
              <p>Cum vinzi</p>
              <p>Contul meu</p>
              <p>Plată și livrare</p>
            </div>

            {/* INFO */}
            <div>
              <h4>Informații</h4>
              <p>Termeni și condiții</p>
              <p>Politica cookies</p>
              <p>Confidențialitate</p>
              <p>Contact</p>
            </div>

            {/* ANPC + SOCIAL */}
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

          {/* SEO TEXT */}
          <div style={{
            marginTop: "30px",
            fontSize: "13px",
            color: "#666",
            textAlign: "center"
          }}>
            Marketplace piese auto • dezmembrări • motoare • cutii viteze • România
          </div>

        </footer>

      </body>
    </html>
  )
}
import Link from "next/link"

export default function Home() {
  return (
    <div style={container}>
      <h1>Marketplace Auto</h1>

      <div style={menu}>
        <Link href="/catalog" style={link}>
          Catalog piese auto
        </Link>

        <Link href="/dezmembrari" style={link}>
          Dezmembrări auto
        </Link>

        <Link href="/cereri" style={link}>
          Cereri piese auto
        </Link>

        <Link href="/adauga-cerere" style={link}>
          Cere ofertă piese
        </Link>
      </div>
    </div>
  )
}

const container = {
  maxWidth: "900px",
  margin: "40px auto",
}

const menu = {
  display: "flex",
  gap: "20px",
  marginTop: "30px",
}

const link = {
  fontWeight: "600",
  textDecoration: "none",
  color: "#1e3a8a",
}
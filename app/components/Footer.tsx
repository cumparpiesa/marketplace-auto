export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* LOGO + FIRMA */}
        <div>
          <h2 style={{ color: "#3b82f6" }}>cumparpiesa.ro</h2>
          <p>Marketplace piese auto România</p>
          <p>Almani Roads Construct SRL</p>
          <p>RO36224947</p>
        </div>

        {/* ASISTENTA */}
        <div>
          <h4>Asistență</h4>
          <p>Cum cumperi</p>
          <p>Cum vinzi</p>
          <p>Contul meu</p>
        </div>

        {/* INFO */}
        <div>
          <h4>Informații</h4>
          <p>Termeni și condiții</p>
          <p>Confidențialitate</p>
          <p>Contact</p>
        </div>

        {/* SIGURANTA */}
        <div>
          <h4>Siguranță</h4>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/ANPC_logo.svg/2560px-ANPC_logo.svg.png"
            width="80"
          />
          <p>Protecția consumatorului</p>
        </div>
      </div>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        © 2026 cumparpiesa.ro
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#0f172a",
    color: "white",
    padding: "40px 20px",
    marginTop: "50px",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
    gap: "20px",
  },
};
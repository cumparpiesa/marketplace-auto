export default function Footer() {
  return (
    <footer style={{
      background: "#0f172a",
      color: "white",
      padding: "20px",
      textAlign: "center",
      marginTop: "40px"
    }}>
      © {new Date().getFullYear()} CumparPiesa.ro
    </footer>
  );
}
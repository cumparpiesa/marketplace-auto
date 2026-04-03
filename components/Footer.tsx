export default function Footer() {
  return (
    <footer style={{
      background: "#0f172a",
      color: "white",
      padding: 20,
      textAlign: "center"
    }}>
      © {new Date().getFullYear()} CumparPiesa.ro
    </footer>
  );
}
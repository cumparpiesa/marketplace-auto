export default function Filters() {
  return (
    <div>
      <h3>Filtre</h3>

      <input placeholder="Caută..."
        style={{ width: "100%", marginBottom: 10 }} />

      <select style={{ width: "100%", marginBottom: 10 }}>
        <option>Toate orașele</option>
        <option>București</option>
        <option>Cluj</option>
      </select>

      <select style={{ width: "100%" }}>
        <option>Cele mai noi</option>
        <option>Preț crescător</option>
      </select>
    </div>
  );
}
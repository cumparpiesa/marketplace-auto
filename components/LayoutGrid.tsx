export default function LayoutGrid({
  sidebar,
  children
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      display: "flex",
      gap: 20,
      maxWidth: 1200,
      margin: "auto"
    }}>

      {/* SIDEBAR */}
      <div style={{
        width: 260,
        background: "white",
        padding: 15,
        borderRadius: 10
      }}>
        {sidebar}
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1 }}>
        {children}
      </div>

    </div>
  );
}
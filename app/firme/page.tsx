import { supabase } from "@/lib/supabaseClient"

export default async function FirmePage() {
  const { data: firme, error } = await supabase
    .from("firme")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return <div>Eroare la încărcare firme</div>
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Firme</h1>

      {!firme?.length && <p>Nu există firme încă.</p>}

      {firme?.map((firma) => (
        <div
          key={firma.id}
          style={{
            border: "1px solid #ddd",
            padding: 20,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          {firma.image_url && (
            <img
              src={firma.image_url}
              alt=""
              style={{ width: 120, marginBottom: 10 }}
            />
          )}

          <h2>{firma.nume}</h2>
          <p>{firma.oras}</p>
          <p>{firma.telefon}</p>
          <p>{firma.descriere}</p>

          <button
            style={{
              background: "green",
              color: "white",
              padding: "10px 15px",
              borderRadius: 6,
              marginTop: 10,
            }}
            onClick={async () => {
              const res = await fetch("/api/create-checkout", {
                method: "POST",
                body: JSON.stringify({ firmaId: firma.id }),
              })

              const data = await res.json()
              window.location.href = data.url
            }}
          >
            🚀 Promovează (300 lei)
          </button>
        </div>
      ))}
    </div>
  )
}
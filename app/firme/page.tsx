import { supabaseServer } from "../@/lib/supabaseClientServer"

export default async function FirmePage() {
  const { data: firme, error } = await supabaseServer
    .from("firme")
    .select("*")

  console.log("FIRME:", firme)

  if (error) {
    return <div>Eroare: {error.message}</div>
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Firme</h1>

      {!firme?.length && <p>Nu există firme.</p>}

      {firme?.map((firma) => (
        <div key={firma.id} style={{ marginTop: 20 }}>
          <h2>{firma.nume}</h2>
          <p>{firma.oras}</p>
        </div>
      ))}
    </div>
  )
}
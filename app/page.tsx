import { createSupabaseServer } from "@/lib/supabase-server"

export default async function Home() {
  const supabase = await createSupabaseServer()

  const { data: firme } = await supabase
    .from("firme")
    .select("*")
    .order("id", { ascending: false })

  return (
    <div style={{ padding: 20 }}>
      <h1>Firme</h1>

      {!firme?.length && <p>Nu există firme încă</p>}

      {firme?.map((firma: any) => (
        <div
          key={firma.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h2>{firma.nume}</h2>
          <p>{firma.oras}</p>
          <p>{firma.telefon}</p>
          <p>{firma.descriere}</p>

          {firma.image_url && (
            <img src={firma.image_url} width={200} />
          )}
        </div>
      ))}
    </div>
  )
}
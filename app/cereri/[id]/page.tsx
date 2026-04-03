import { createClient } from "@/lib/supabaseServer"

export default async function Page({ params }: any) {
  const supabase = await createClient()

  const { data: cerere, error } = await supabase
    .from("cereri")
    .select("*")
    .eq("id", params.id)
    .maybeSingle()

  console.log("ID:", params.id)
  console.log("DATA:", cerere)
  console.log("ERROR:", error)

  if (!cerere) {
    return (
      <div style={{ padding: 20 }}>
        ❌ Cererea nu există sau ID greșit
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{cerere.titlu || "Fără titlu"}</h1>
      <p>{cerere.descriere}</p>
      <p>📍 {cerere.oras}</p>
    </div>
  )
}
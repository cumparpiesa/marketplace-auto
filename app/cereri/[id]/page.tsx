import { createClient } from "@/lib/supabaseServer"

export default async function Page({ params }: any) {
  const supabase = await createClient()

  const { data: cerere } = await supabase
    .from("cereri")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!cerere) {
    return <div>Cererea nu există</div>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{cerere.titlu}</h1>
      <p>{cerere.descriere}</p>
      <p>📍 {cerere.oras}</p>
    </div>
  )
}
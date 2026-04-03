import AddOferta from "@/app/components/AddOferta"
import { createClient } from "@/lib/supabaseServer"

export default async function Page({ params }: any) {
  const supabase = createClient()

  const { data: cerere } = await supabase
    .from("cereri")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!cerere) return <p>Nu există</p>

  return (
    <div style={{ padding: 40 }}>
      <h1>{cerere.titlu}</h1>
      <p>{cerere.descriere}</p>

      <AddOferta cerereId={cerere.id} />
    </div>
  )
}
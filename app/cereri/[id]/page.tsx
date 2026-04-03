import { supabase } from "@/lib/supabaseClient"
import SendOffer from "@/app/components/SendOffer"

export default async function Page({
  params,
}: {
  params: { id: string }
}) {
  const { data: cerere, error } = await supabase
    .from("cereri")
    .select("*")
    .eq("id", params.id)
    .single()

  if (error || !cerere) {
    return <p>Cererea nu există</p>
  }

  return (
    <div style={styles.container}>
      <h1>{cerere.titlu}</h1>
      <p style={styles.city}>📍 {cerere.oras}</p>
      <p>{cerere.descriere}</p>

      {/* 🔥 OFERTE */}
      <SendOffer cerereId={cerere.id} />
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
  },

  city: {
    color: "#666",
    marginBottom: "10px",
  },
}
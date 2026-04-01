import { createSupabaseServer } from "@/lib/supabase-server"

export default async function UserPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createSupabaseServer()

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.id)
    .single()

  return (
    <div>
      <h1>User</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  )
}
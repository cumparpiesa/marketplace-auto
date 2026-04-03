import { createClient } from "@/lib/supabaseServer"

export default async function Success({ searchParams }: any) {
  const supabase = await createClient()

  const plan = searchParams.plan

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase
      .from("profiles")
      .update({
        is_pro: true,
        plan: plan,
        subscription: plan,
      })
      .eq("id", user.id)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>✅ Plata reușită</h1>
      <p>Abonamentul tău este activ.</p>
    </div>
  )
}
import { supabase } from "@/lib/supabaseClient"

type Props = {
  params: {
    id: string
  }
}

export default async function UserPage({ params }: Props) {
  const { id } = params

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    return <div>Eroare: {error.message}</div>
  }

  if (!profile) {
    return <div>User inexistent</div>
  }

  return (
    <div style={styles.container}>
      <h1>{profile.nume}</h1>

      <p><strong>Oraș:</strong> {profile.oras}</p>
      <p><strong>Telefon:</strong> {profile.telefon}</p>

      <p>{profile.descriere}</p>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: 12,
  },
}
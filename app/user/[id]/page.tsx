import { supabase } from '@/lib/supabase'

export default async function UserPage({ params }) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .single()

  const { data: offers } = await supabase
    .from('offers')
    .select('*')
    .eq('user_id', params.id)

  if (!profile) return <p>User inexistent</p>

  return (
    <div style={{ padding: 20 }}>
      <h1>
        {profile.type === 'firma'
          ? profile.company_name
          : profile.name}
      </h1>

      {profile.verified && <p>✔️ Firmă verificată</p>}

      <p>Oraș: {profile.city}</p>

      {profile.type === 'firma' && (
        <>
          <p>CUI: {profile.cui}</p>
          <p>Adresă: {profile.address}</p>
        </>
      )}

      <h2>Oferte</h2>

      {offers?.map((o) => (
        <div key={o.id}>
          <p>{o.message}</p>
          <p>{o.price} lei</p>
        </div>
      ))}
    </div>
  )
}
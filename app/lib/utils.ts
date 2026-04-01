export async function checkSubscription(supabase: any, userId: string) {
  const { data } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!data) return false

  const now = new Date()
  const expires = new Date(data.expires_at)

  return expires > now
}
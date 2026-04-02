'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function SuccessPremium() {
  useEffect(() => {
    async function run() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) return

      const expires = new Date()
      expires.setMonth(expires.getMonth() + 1) // 🔥 30 zile

      await supabase
        .from('profiles')
        .update({
          premium: true,
          premium_expires_at: expires
        })
        .eq('id', data.user.id)
    }

    run()
  }, [])

  return <h1>💎 Premium activ 30 zile!</h1>
}
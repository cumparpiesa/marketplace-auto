'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SuccessBoost() {
  const params = useSearchParams()

  useEffect(() => {
    async function run() {
      const id = params.get('id')
      if (!id) return

      const expires = new Date()
      expires.setDate(expires.getDate() + 7) // 🔥 7 zile

      await supabase
        .from('requests')
        .update({
          boosted: true,
          boost_expires_at: expires
        })
        .eq('id', id)
    }

    run()
  }, [])

  return <h1>🚀 Boost activ 7 zile!</h1>
}
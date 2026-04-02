'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AddReview() {
  const params = useParams()
  const router = useRouter()

  const user_id = params.id as string

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  async function submit() {
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      alert('Login necesar')
      return
    }

    await supabase.from('reviews').insert({
      user_id,
      reviewer_id: data.user.id,
      rating,
      comment
    })

    router.push('/user/' + user_id)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Lasă review</h1>

      <select onChange={(e) => setRating(Number(e.target.value))}>
        <option value={5}>5 ⭐</option>
        <option value={4}>4 ⭐</option>
        <option value={3}>3 ⭐</option>
        <option value={2}>2 ⭐</option>
        <option value={1}>1 ⭐</option>
      </select>

      <textarea
        placeholder="Comentariu"
        onChange={(e) => setComment(e.target.value)}
      />

      <br /><br />

      <button onClick={submit}>
        Trimite review
      </button>
    </div>
  )
}
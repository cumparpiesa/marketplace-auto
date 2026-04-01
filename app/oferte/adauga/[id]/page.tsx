'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AddOfferPage() {
  const params = useParams()
  const router = useRouter()

  const request_id = Array.isArray(params.id) ? params.id[0] : params.id

  const [price, setPrice] = useState('')
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')

  async function handleSubmit(e: any) {
    e.preventDefault()

    await supabase.from('offers').insert({
      request_id,
      price,
      message,
      seller_phone: phone,
      city,
    })

    router.push('/cereri/' + request_id)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Trimite ofertă</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Preț"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Mesaj"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Telefon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Oraș"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br /><br />

        <button type="submit">Trimite ofertă</button>
      </form>
    </div>
  )
}
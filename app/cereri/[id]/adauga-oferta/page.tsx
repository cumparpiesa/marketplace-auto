'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function AdaugaOferta() {
  const params = useParams()
  const router = useRouter()

  const requestId = params.id as string

  const [price, setPrice] = useState('')
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!price || !phone) {
      alert('Completează toate câmpurile')
      return
    }

    setLoading(true)

    const { error } = await supabase.from('offers').insert({
      request_id: requestId, // 🔥 CHEIA
      price: Number(price),
      message,
      seller_phone: phone
    })

    setLoading(false)

    if (error) {
      alert('Eroare la trimitere')
      console.log(error)
    } else {
      alert('Oferta trimisă 🚀')
      router.push(`/cereri/${requestId}`)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Trimite ofertă</h1>

      <input
        placeholder="Preț"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '10px' }}
      />

      <input
        placeholder="Telefon"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '10px' }}
      />

      <textarea
        placeholder="Mesaj"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '10px' }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: '10px 20px',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px'
        }}
      >
        {loading ? 'Se trimite...' : 'Trimite oferta'}
      </button>
    </div>
  )
}
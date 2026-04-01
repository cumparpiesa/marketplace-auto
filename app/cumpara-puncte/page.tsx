'use client'

export default function CumparaPuncte() {

  async function buy() {
    const res = await fetch('/api/create-checkout', {
      method: 'POST',
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      alert('Eroare la plată')
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Cumpără puncte</h1>

      <div className="card">
        <h3>100 puncte</h3>
        <p>20 lei</p>

        <button className="main-btn" onClick={buy}>
          Cumpără acum
        </button>
      </div>
    </div>
  )
}
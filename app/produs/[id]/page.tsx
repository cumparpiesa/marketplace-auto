import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://tzkdiiezabjitzpzqjop.supabase.co',
  'sb_publishable_J7H0bx0C5kqcLjVYAbSfCA_NGBDXBRL'
)

export default async function ProductPage({ params }) {
  const { id } = params

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) {
    return <div>Produsul nu există</div>
  }

  const whatsappLink = product.phone
    ? `https://wa.me/4${product.phone.replace(/^0/, '')}`
    : '#'

  return (
    <div style={{ padding: 20 }}>

      <a href="/">← Înapoi</a>

      <div style={{
        display: 'flex',
        gap: 30,
        marginTop: 20
      }}>

        {/* IMAGE */}
        <img
          src={product.image_url || 'https://picsum.photos/500'}
          style={{
            width: 400,
            height: 300,
            objectFit: 'cover',
            borderRadius: 10
          }}
        />

        {/* INFO */}
        <div>

          <h1>{product.title}</h1>

          <p style={{
            fontSize: 28,
            color: 'green',
            fontWeight: 'bold'
          }}>
            {product.price} lei
          </p>

          <p><strong>Categorie:</strong> {product.category}</p>

          {/* 📞 TELEFON */}
          {product.phone && (
            <p style={{ marginTop: 10 }}>
              📞 {product.phone}
            </p>
          )}

          {/* 🔥 BUTTONE */}
          <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>

            {/* WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              style={{
                background: '#25D366',
                color: 'white',
                padding: '10px 15px',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              WhatsApp
            </a>

            {/* Telefon */}
            {product.phone && (
              <a
                href={`tel:${product.phone}`}
                style={{
                  background: '#2563eb',
                  color: 'white',
                  padding: '10px 15px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Sună
              </a>
            )}

          </div>

        </div>

      </div>

    </div>
  )
}
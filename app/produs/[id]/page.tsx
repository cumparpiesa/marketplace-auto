import { supabaseServer } from "../../lib/supabaseServer"

// 🔥 tip pentru params (fix pentru eroarea ta)
type Props = {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = params

  // 🔥 fetch produs din Supabase
  const { data: product, error } = await supabase
    .from("anunturi")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    return <div>Eroare: {error.message}</div>
  }

  if (!product) {
    return <div>Produs inexistent</div>
  }

  return (
    <div style={styles.container}>
      <h1>{product.titlu}</h1>

      {product.imagine && (
        <img
          src={product.imagine}
          alt={product.titlu}
          style={styles.image}
        />
      )}

      <p><strong>Mașină:</strong> {product.masina}</p>
      <p><strong>Oraș:</strong> {product.oras}</p>

      <p>{product.descriere}</p>
    </div>
  )
}

// 🔥 styles fără erori TypeScript
const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: 12,
  },
  image: {
    width: "100%",
    borderRadius: 8,
  },
}
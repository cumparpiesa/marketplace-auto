import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default async function CereriPage() {
  const { data: cereri } = await supabase
    .from("cereri")
    .select(`
      *,
      categories(name),
      judete(name),
      orase(name),
      profiles(plan)
    `)
    .order("created_at", { ascending: false })

  // 🔥 sortare PRO primul
  cereri?.sort((a: any, b: any) => {
    if (a.profiles?.plan === "pro") return -1
    if (b.profiles?.plan === "pro") return 1
    return 0
  })

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ marginBottom: 20 }}>Cereri piese</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {cereri?.map((c: any) => (
          <Link key={c.id} href={`/cereri/${c.id}`}>
            <div
              style={{
                padding: 20,
                borderRadius: 12,
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                background: c.profiles?.plan === "pro" ? "#fffbe6" : "white",
                border: c.profiles?.plan === "pro" ? "2px solid gold" : "none",
                cursor: "pointer",
              }}
            >
              {/* BADGE PRO */}
              {c.profiles?.plan === "pro" && (
                <div
                  style={{
                    background: "gold",
                    padding: "4px 8px",
                    borderRadius: 6,
                    display: "inline-block",
                    marginBottom: 8,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  PRO
                </div>
              )}

              <h3>{c.title}</h3>

              <p style={{ color: "#555" }}>
                {c.categories?.name}
              </p>

              <p style={{ color: "#888", fontSize: 14 }}>
                {c.orase?.name}, {c.judete?.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
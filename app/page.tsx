const fetchFirme = async () => {
  setLoading(true)

  let query = supabase.from("firme").select("*")

  // 🔍 SEARCH
  if (search && search.trim() !== "") {
    query = query.or(
      `nume.ilike.%${search.trim()}%,descriere.ilike.%${search.trim()}%,oras.ilike.%${search.trim()}%`
    )
  }

  // 📍 ORAȘ (SAFE)
  if (oras && oras.trim() !== "") {
    query = query.ilike("oras", `%${oras.trim()}%`)
  }

  // ⭐ PLAN (SAFE)
  if (plan && plan !== "") {
    query = query.eq("plan", plan)
  }

  const { data, error } = await query

  console.log("DATA:", data)
  console.log("ERROR:", error)

  if (!error) {
    const sorted = (data || []).sort((a, b) => {
      if (a.plan === "pro" && b.plan !== "pro") return -1
      if (a.plan !== "pro" && b.plan === "pro") return 1
      return 0
    })

    setFirme(sorted)
  } else {
    setFirme([])
  }

  setLoading(false)
}
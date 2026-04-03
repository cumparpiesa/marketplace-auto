<button
  style={styles.btn}
  onClick={async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("Trebuie login")
      return
    }

    // 🔥 verificare PRO
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single()

    if (profile?.plan !== "pro") {
      alert("Trebuie abonament PRO pentru a trimite ofertă")
      window.location.href = "/abonament"
      return
    }

    // 🔥 creare conversație
    const { data: conv } = await supabase
      .from("conversatii")
      .insert([
        {
          cerere_id: cerere.id,
          vanzator_id: user.id,
        },
      ])
      .select()
      .single()

    window.location.href = `/chat/${conv.id}`
  }}
>
  Trimite ofertă
</button>
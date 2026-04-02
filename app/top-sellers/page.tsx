"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TopSellers() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .limit(10);

    setUsers(data || []);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Top sellers</h1>
      {users.map((u) => (
        <p key={u.id}>{u.name}</p>
      ))}
    </div>
  );
}
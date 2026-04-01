"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TopSellers() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("top_sellers")
      .select("*");

    setUsers(data || []);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏆 Top Sellers</h1>

      {users.map((u) => (
        <div key={u.user_id} style={{
          border: "1px solid #ddd",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "10px"
        }}>
          <p>⭐ {u.avg_rating.toFixed(2)}</p>
          <p>Reviews: {u.total_reviews}</p>
        </div>
      ))}
    </div>
  );
}
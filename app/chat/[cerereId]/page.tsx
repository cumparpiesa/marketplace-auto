"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"
import { useParams } from "next/navigation";

export default function ChatPage() {
  const params = useParams();

  const [mesaje, setMesaje] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("");

  const cerereId = Array.isArray(params.cerereId)
    ? params.cerereId[0]
    : params.cerereId;

  useEffect(() => {
    load();
    getUser();
  }, []);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUserId(data.user?.id || "");
  };

  const load = async () => {
    const { data } = await supabase
      .from("mesaje")
      .select("*")
      .eq("cerere_id", cerereId)
      .order("created_at", { ascending: true });

    setMesaje(data || []);
  };

  const send = async () => {
    if (!text) return;

    await supabase.from("mesaje").insert({
      cerere_id: cerereId,
      sender_id: userId,
      mesaj: text,
    });

    setText("");
    load();
  };

  return (
    <div style={{ padding: 30, maxWidth: 600, margin: "auto" }}>
      <h2>Chat</h2>

      <div
        style={{
          border: "1px solid #ddd",
          height: 400,
          overflowY: "auto",
          padding: 10,
          marginBottom: 10,
        }}
      >
        {mesaje.map((m) => (
          <div
            key={m.id}
            style={{
              textAlign: m.sender_id === userId ? "right" : "left",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: 10,
                borderRadius: 10,
                background:
                  m.sender_id === userId ? "#4caf50" : "#eee",
                color: m.sender_id === userId ? "#fff" : "#000",
              }}
            >
              {m.mesaj}
            </div>
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Scrie mesaj..."
        style={{ width: "80%", marginRight: 10 }}
      />

      <button onClick={send}>Trimite</button>
    </div>
  );
}
"use client"

import ChatBox from "@/components/ChatBox"

export default function Page({ params }: any) {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <ChatBox conversatieId={params.id} />
    </div>
  )
}
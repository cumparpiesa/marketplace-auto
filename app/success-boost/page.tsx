"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

function SuccessContent() {
  const searchParams = useSearchParams()
  const session = searchParams.get("session_id")

  return (
    <div>
      <h1>Plata reușită 🎉</h1>
      <p>Session: {session}</p>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
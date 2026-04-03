"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <button style={{ marginTop: 10 }}>
        Login
      </button>
    </div>
  );
}
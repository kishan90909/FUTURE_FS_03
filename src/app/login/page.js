"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/";
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-card">
        <h2 className="auth-title">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="auth-error">{error}</p>}

        <button className="auth-btn">Login</button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="auth-link">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

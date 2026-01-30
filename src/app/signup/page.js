"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    address: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        address: formData.address,
        createdAt: new Date(),
      });

      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup} className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <input
          name="name"
          placeholder="Full Name"
          className="auth-input"
          onChange={handleChange}
          required
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          className="auth-input"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="auth-input"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="auth-input"
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          rows="3"
          className="auth-textarea"
          onChange={handleChange}
          required
        />

        {error && <p className="auth-error">{error}</p>}

        <button className="auth-btn">Sign Up</button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="auth-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

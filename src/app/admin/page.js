"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) return router.push("/login");

    const checkAdmin = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists() && snap.data().role === "admin") {
        setIsAdmin(true);
      } else {
        router.push("/");
      }
    };

    checkAdmin();
  }, [user, loading, router]);

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Checking admin access...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-bold mb-10">Admin Dashboard</h1>

      <div className="space-y-6">
        <Link href="/admin/add" className="auth-btn block">
          ➕ Add Products
        </Link>

        <Link href="/admin/edit" className="btn-outline block">
          ✏ Edit Products
        </Link>

        <Link
          href="/admin/delete"
          className="block bg-red-600 text-white py-3 rounded-lg"
        >
          🗑 Delete Products
        </Link>

        <Link href="/admin/orders" className="btn-outline block">
            📦 Manage Orders
        </Link>


      </div>
    </div>
  );
}

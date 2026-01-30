"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Navbar() {
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { user } = useAuth();

  const [isAdmin, setIsAdmin] = useState(false);

  // 🔐 CHECK ADMIN ROLE
  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    const checkAdmin = async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists() && snap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Admin check failed", err);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [user]);

  const linkClass = (path) =>
    pathname === path
      ? "text-gray-900 dark:text-white font-semibold border-b-2 border-gray-900 dark:border-white"
      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-gray-900 dark:text-white"
        >
          URBAN STORE
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6">

          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/products" className={linkClass("/products")}>Products</Link>

          {/* CART */}
          <Link href="/cart" className="relative">
            <span className={linkClass("/cart")}>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-gray-900 dark:bg-white text-white dark:text-black text-xs px-2 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* 🔑 ADMIN LINK (ONLY FOR ADMIN) */}
          {isAdmin && (
            <Link href="/admin">Admin</Link>
          )}

          {/* PROFILE / LOGIN */}
          {user ? (
            <Link
              href="/profile"
              title="Profile"
              className="flex items-center justify-center w-9 h-9 rounded-full
                         border border-gray-300 dark:border-gray-700
                         text-gray-600 dark:text-gray-400
                         hover:text-gray-900 dark:hover:text-white
                         hover:bg-gray-100 dark:hover:bg-gray-800
                         transition"
            >
              {/* PROFILE ICON */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 19a7 7 0 0114 0H5z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          ) : (
            <Link href="/login" className="btn-outline text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

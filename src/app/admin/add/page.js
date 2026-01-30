"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminProductsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // ADMIN CHECK
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

  const addProduct = async () => {
    if (!name || !price || !image) {
      alert("Fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        image,
        createdAt: serverTimestamp(),
      });

      alert("Product added successfully");

      setName("");
      setPrice("");
      setImage("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Checking admin access...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Admin Product Upload</h1>

      <input
        className="auth-input mb-3"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="auth-input mb-3"
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="auth-input mb-3"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button onClick={addProduct} className="auth-btn">
        Add Product
      </button>
    </div>
  );
}

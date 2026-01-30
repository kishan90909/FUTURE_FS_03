"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function DeleteProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, "products"));
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetch();
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete product?")) return;
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Delete Products</h1>

      {products.map(p => (
        <div key={p.id} className="card p-4 mb-4 flex justify-between">
          <span>{p.name}</span>
          <button
            onClick={() => remove(p.id)}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

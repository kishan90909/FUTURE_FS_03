"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function EditProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, "products"));
      setProducts(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    };
    fetch();
  }, []);

  const save = async (p) => {
    await updateDoc(doc(db, "products", p.id), {
      name: p.name,
      price: Number(p.price),
      image: p.image,
    });
    alert("Product Updated");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">Edit Products</h1>

      {products.map((p, i) => (
        <div
          key={p.id}
          className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8"
        >
          {/* FLEX LAYOUT */}
          <div className="flex flex-col md:flex-row gap-6">

            {/* LEFT SIDE IMAGE */}
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src={p.image}
                alt={p.name}
                className="w-40 h-40 object-cover rounded-lg border"
              />
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="w-full md:w-2/3 space-y-3">

              {/* NAME */}
              <input
                className="auth-input"
                value={p.name}
                onChange={(e) => {
                  const copy = [...products];
                  copy[i].name = e.target.value;
                  setProducts(copy);
                }}
                placeholder="Product Name"
              />

              {/* PRICE */}
              <input
                className="auth-input"
                type="number"
                value={p.price}
                onChange={(e) => {
                  const copy = [...products];
                  copy[i].price = e.target.value;
                  setProducts(copy);
                }}
                placeholder="Price"
              />

              {/* IMAGE URL */}
              <input
                className="auth-input"
                value={p.image}
                onChange={(e) => {
                  const copy = [...products];
                  copy[i].image = e.target.value;
                  setProducts(copy);
                }}
                placeholder="Image URL"
              />

              {/* SAVE BUTTON */}
              <button
                onClick={() => save(p)}
                className="auth-btn w-full mt-2"
              >
                Save Changes
              </button>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

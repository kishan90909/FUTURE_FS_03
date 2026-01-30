/* ==================================
  Used Firebase Data For Product Show
=================================== */

"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading products...
      </div>
    );
  }

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Featured Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}


/* ===============================
  Used Static Data For Product Show
================================ */

// "use client";

// import products from "../../data/products";
// import ProductCard from "../../components/ProductCard";

// export default function ProductsPage() {
//   return (
//     <section className="px-6 py-16 max-w-7xl mx-auto">
//       <h1 className="text-4xl font-bold mb-10">Featured Products</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="card relative overflow-hidden"
      whileHover={{ y: -6 }}          // ✅ card lift only
      transition={{ duration: 0.3 }}
    >
      {/* IMAGE (NO ZOOM) */}
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      {/* PRODUCT INFO */}
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-center">
        {product.name}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
        ₹{product.price}
      </p>

      {/* ADD TO CART */}
      <button
        onClick={() => addToCart(product)}
        className="btn-primary w-full"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}

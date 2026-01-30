"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

// 🔴 IMPORTANT: adjust this path if needed
import products from "../data/products";

export default function HomePage() {
  return (
    <main>
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-[85vh] flex items-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-black dark:to-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Elevate Your <br /> Everyday Style
            </h1>

            <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-md">
              Premium footwear designed for comfort, performance,
              and everyday lifestyle.
            </p>

            <div className="mt-8 flex gap-4">
              <Link href="/products" className="btn-primary">
                Shop Now
              </Link>
              <Link href="/cart" className="btn-outline">
                View Cart
              </Link>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
          >
            <motion.div
              className="w-[320px] h-[320px] md:w-[420px] md:h-[420px]
                         bg-white dark:bg-gray-800 rounded-full shadow-xl
                         flex items-center justify-center"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <span className="text-6xl md:text-7xl text-gray-900 dark:text-white">
                👟
              </span>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Products
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Hand-picked styles customers love
            </p>
          </motion.div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* View All */}
          <div className="mt-12 text-center">
            <Link href="/products" className="btn-outline">
              View All Products
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}

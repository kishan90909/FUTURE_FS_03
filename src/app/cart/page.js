"use client";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function CartPage() {
  const {
    cartItems,
    totalPrice,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const { user } = useAuth();

  // ---------------- PLACE ORDER ----------------
  const placeOrder = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cartItems,
        total: totalPrice,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      alert("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Order failed:", error);
      alert("Order failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">

            {/* LEFT IMAGE */}
            <div className="w-28 h-28 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg border"
              />
            </div>

            {/* RIGHT DETAILS */}
            <div className="flex-1 w-full space-y-2">
              <h3 className="font-semibold text-lg">{item.name}</h3>

              <p className="text-gray-600 dark:text-gray-400">
                Price: ₹{item.price}
              </p>

              {/* QUANTITY CONTROLS */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                >
                  -
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-1 rounded mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div className="mt-8 text-right">
          <h2 className="text-xl font-semibold mb-4">
            Total: ₹{totalPrice}
          </h2>

          <button onClick={placeOrder} className="auth-btn px-6 py-2">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

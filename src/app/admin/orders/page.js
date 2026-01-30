"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminOrders() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState([]);

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

  // FETCH ORDERS
  useEffect(() => {
    if (!isAdmin) return;

    const fetchOrders = async () => {
      const snap = await getDocs(collection(db, "orders"));
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };

    fetchOrders();
  }, [isAdmin]);

  // UPDATE STATUS
  const changeStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  // DELETE ORDER
  const removeOrder = async (id) => {
    if (!confirm("Delete order?")) return;
    await deleteDoc(doc(db, "orders", id));
    setOrders(orders.filter((o) => o.id !== id));
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Checking admin access...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Order Management</h1>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-6"
        >
          {/* FLEX LAYOUT */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* LEFT SIDE — ORDER DETAILS */}
            <div className="space-y-2 text-sm">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>User:</strong> {order.userId}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>

            {/* RIGHT SIDE — ACTION BUTTONS */}
            <div className="flex flex-wrap gap-3 md:justify-end">

              <button
                onClick={() => changeStatus(order.id, "pending")}
                className="btn-outline"
              >
                Pending
              </button>

              <button
                onClick={() => changeStatus(order.id, "shipped")}
                className="btn-outline"
              >
                Shipped
              </button>

              <button
                onClick={() => changeStatus(order.id, "delivered")}
                className="auth-btn"
              >
                Delivered
              </button>

              <button
                onClick={() => changeStatus(order.id, "cancelled")}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => removeOrder(order.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
  collection,   // 🔥 ADDED
  query,        // 🔥 ADDED
  where,        // 🔥 ADDED
  getDocs,      // 🔥 ADDED
} from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import DarkModeToggle from "../../components/DarkModeToggle";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]); // 🔥 ADDED
  const [activeTab, setActiveTab] = useState("profile");
  const [edit, setEdit] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  /* ---------------- AUTH GUARD ---------------- */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  /* ---------------- FETCH / CREATE PROFILE ---------------- */
  useEffect(() => {
    if (loading || !user) return;

    const fetchProfile = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          name: user.displayName || "User",
          email: user.email,
          mobile: "",
          addresses: [],
          createdAt: serverTimestamp(),
        });

        setProfile({
          name: user.displayName || "User",
          email: user.email,
          mobile: "",
          addresses: [],
        });
      } else {
        setProfile(snap.data());
      }
    };

    fetchProfile();
  }, [user, loading]);

  /* ---------------- FETCH ORDERS (NEW) ---------------- */
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid)
      );

      const snap = await getDocs(q);
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
    };

    fetchOrders();
  }, [user]);

  /* ---------------- LOADING STATE ---------------- */
  if (loading || !profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  /* ---------------- ACTIONS ---------------- */
  const saveProfile = async () => {
    await updateDoc(doc(db, "users", user.uid), {
      name: profile.name,
      mobile: profile.mobile,
    });
    setEdit(false);
  };

  const addAddress = async () => {
    if (!newAddress.trim()) return;

    const updated = [
      ...(profile.addresses || []),
      { id: Date.now(), label: "Home", address: newAddress },
    ];

    await updateDoc(doc(db, "users", user.uid), { addresses: updated });
    setProfile({ ...profile, addresses: updated });
    setNewAddress("");
  };

  const resetPassword = async () => {
    await sendPasswordResetEmail(auth, user.email);
    alert("Password reset link sent to your email");
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="profile-layout">

      {/* SIDEBAR */}
      <aside className="profile-sidebar">
        <div className="profile-avatar">
          {profile.name?.charAt(0)}
        </div>

        <p className="profile-name">{profile.name}</p>
        <p className="profile-email">{profile.email}</p>

        <ul className="profile-menu">
          <li onClick={() => setActiveTab("profile")}>Personal Information</li>
          <li onClick={() => setActiveTab("addresses")}>Saved Addresses</li>
          <li onClick={() => setActiveTab("orders")}>Order History</li>
          <li onClick={() => setActiveTab("security")}>Security Settings</li>
          <li onClick={logout} className="logout">Logout</li>
        </ul>
      </aside>

      {/* CONTENT */}
      <section className="profile-content">

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div className="profile-card">
            <h2>Personal Information</h2>
            {edit ? (
              <>
                <input
                  className="auth-input"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
                <input
                  className="auth-input mt-2"
                  value={profile.mobile}
                  onChange={(e) =>
                    setProfile({ ...profile, mobile: e.target.value })
                  }
                />
                <button onClick={saveProfile} className="profile-btn mt-3">
                  Save
                </button>
              </>
            ) : (
              <>
                <p>Name: {profile.name}</p>
                <p>Email: {profile.email}</p>
                <p>Mobile: {profile.mobile}</p>
                <button
                  onClick={() => setEdit(true)}
                  className="profile-btn mt-3"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        )}

        {/* ADDRESSES */}
        {activeTab === "addresses" && (
          <div className="profile-card">
            <h2>Saved Addresses</h2>

            {(profile.addresses || []).map((addr) => (
              <div key={addr.id} className="address-box">
                <strong>{addr.label}</strong>
                <p>{addr.address}</p>
              </div>
            ))}

            <textarea
              className="auth-textarea mt-3"
              placeholder="Add new address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />

            <button onClick={addAddress} className="profile-btn mt-3">
              Add Address
            </button>
          </div>
        )}

        {/* ORDERS (UPDATED ONLY THIS BLOCK) */}
        {activeTab === "orders" && (
          <div className="profile-card">
            <h2>Order History</h2>

            {orders.length === 0 ? (
              <p className="empty-text">
                You have not placed any orders yet.
              </p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="address-box">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Total:</strong> ₹{order.total}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* SECURITY */}
        {activeTab === "security" && (
          <div className="profile-card">
            <h2>Security Settings</h2>
            <button onClick={resetPassword} className="profile-btn">
              Change Password
            </button>

            <div className="profile-row mt-4">
              <span>Dark Mode</span>
              <DarkModeToggle />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

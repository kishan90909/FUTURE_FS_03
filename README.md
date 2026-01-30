# 🛍️ Urban Store – Modern E-Commerce Platform

<div align="center">
  <h3>
    🚀 Live Demo: 
    <a href="https://future-fs-03-five-ivory.vercel.app/" target="_blank">
      View Application Here
    </a>
  </h3>
</div>

<div align="center">

![Next.js](https://img.shields.io/badge/Framework-Next.js-black?logo=nextdotjs)
![Firebase](https://img.shields.io/badge/Backend-Firebase-orange?logo=firebase)
![Tailwind](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Animation-Framer_Motion-pink)
![Status](https://img.shields.io/badge/Status-Active_Development-brightgreen)

</div>

---

### 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Technology Stack](#-technology-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Installation & Setup](#-installation--setup)
- [🔧 Configuration](#-configuration)
- [💻 Usage & Roles](#-usage--roles)
- [🔐 Security Rules](#-security-rules)
- [📞 Support](#-support)

---

## 🌟 Overview

**Urban Store** is a full-featured modern e-commerce web application built using **Next.js App Router** and **Firebase**.  
It delivers a real-world online shopping experience including authentication, cart management, order placement, profile dashboards, and admin product control.

The platform demonstrates strong proficiency in **frontend UI/UX design**, **state management**, and **serverless backend integration** using Firebase Firestore and Authentication.

---

## ✨ Key Features

### 🛒 **Customer Experience**
* **Product Browsing:** Grid-based responsive product catalog.
* **Smart Cart System:** Quantity increment/decrement, real-time totals.
* **Secure Checkout:** Firestore order creation with user linkage.
* **Order History:** Profile dashboard displaying previous purchases.
* **Dark Mode:** Theme toggle with persistent UI state.
* **Responsive UI:** Optimized for mobile, tablet, and desktop.


### 👤 **User Account**
* **Firebase Authentication:** Email & Password login/signup.
* **Profile Dashboard:** Personal details editing.
* **Address Management:** Add and store multiple addresses.
* **Security Settings:** Password reset via email.


### 🛠️ **Admin Controls**
* **Product Upload:** Add new products with images.
* **Product Edit/Delete:** Full CRUD management.
* **Order Management:** Change order status and delete orders.
* **Role-Based Access:** Admin pages hidden for normal users.

---

## 🛠️ Technology Stack

### 🎨 **Frontend**

| Tech | Usage |
| :--- | :--- |
| **Next.js 14** | App Router & SSR framework |
| **React** | Component architecture |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Context API** | Global state (Cart & Auth) |

### ⚙️ **Backend / Services**

| Tech | Usage |
| :--- | :--- |
| **Firebase Auth** | User authentication |
| **Firebase Firestore** | NoSQL database |
| **Firebase Storage** | Product images |
| **Firebase Rules** | Role-based security |

---

## 📁 Project Structure

```bash
urban-store/
├── src/
│   ├── app/
│   │   ├── page.js              # Homepage
│   │   ├── cart/page.js         # Cart & Checkout
│   │   ├── profile/page.js      # User Dashboard
│   │   ├── products/page.js     # Product Listing
│   │   └── admin/               # Admin Panels
│   │       ├── products/page.js
│   │       └── orders/page.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   │
│   ├── context/
│   │   ├── CartContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   └── lib/
│       └── firebase.js          # Firebase config
│
├── public/                      # Static assets
├── tailwind.config.js
└── README.md
````

---

## 🚀 Installation & Setup

### 📋 Prerequisites

* **Node.js 18+**
* **Firebase Account**
* **Git**

### 🛠️ Step 1: Clone Repository

```bash
git clone https://github.com/<your-github-username>/FUTURE_FS_03.git
cd FUTURE_FS_03
```

### 🛠️ Step 2: Install Dependencies

```bash
npm install
```

### 🛠️ Step 3: Start Development Server

```bash
npm run dev
```

App runs at: `http://localhost:3000`

---

## 🔧 Configuration

Create `.env.local` in project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=xxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxx
```

---

## 💻 Usage & Roles

### 👤 User Flow

1. Register / Login
2. Browse products
3. Add to cart
4. Place order
5. View order history in profile

### 👨‍💼 Admin Flow

1. Login as admin 
  * **Email:** Admin@urbanstore.com
  * **password:** admin123
2. Upload/Edit/Delete products
3. Manage order statuses

---

## 🔐 Security Rules (Firestore)

| Collection   | Access                            |
| ------------ | --------------------------------- |
| **products** | Public Read / Admin Write         |
| **users**    | Own Profile Only                  |
| **orders**   | User Read Own / Admin Full Access |

---

## 📞 Support

**Kishan Patel**

* 📧 Email: [kpatel.tech.mca@gmail.com](mailto:kpatel.tech.mca@gmail.com)
* 💼 LinkedIn: [https://www.linkedin.com/in/kishan-patel-597792329/](https://www.linkedin.com/in/kishan-patel-597792329/)
* 🐱 GitHub: [https://github.com/kishan90909](https://github.com/kishan90909)

---

*Built with ❤️ using Next.js & Firebase | 2026*




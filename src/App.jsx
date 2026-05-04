import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";

import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Customers from "./Pages/Customers";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";

function PrivateRoute({ children }) {
  const isAuth = localStorage.getItem("auth") === "true";
  return isAuth ? children : <Navigate to="/login" />;
}

function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        <footer className="footer">
            © 2026 ShopAdmin Pro
        </footer>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
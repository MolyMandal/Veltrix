import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  // ✅ ADDED: Loading state
  const [loading, setLoading] = useState(true);

  // ✅ ADDED: Loading effect
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // ✅ DYNAMIC GREETING LOGIC
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  // 🔥 LIVE SYNC
  useEffect(() => {
    const interval = setInterval(() => {
      const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

      setProducts(savedProducts);
      setOrders(savedOrders);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ✅ ADDED: Loading guard clause
  if (loading) return <h2>Loading Dashboard...</h2>;

  const totalProducts = products.length;
  const totalOrders = orders.length;

  const revenue = orders.reduce(
    (acc, item) => acc + Number(item.amount || 0),
    0
  );

  // ✅ UPDATED: Sorted sales data for cleaner graph
  const salesData = [...orders]
    .sort((a, b) => a.id - b.id)
    .map((o, i) => ({
      name: `#${i + 1}`,
      sales: Number(o.amount),
    }));

  return (
    <div className="dashboard">
      {/* Dynamic Greeting */}
      <h1>{greeting}, Admin</h1>

      {/* 🔥 MODERN CARDS */}
      <div className="cards">
        <motion.div
          className="card gradient1"
          whileHover={{ scale: 1.03 }}
        >
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </motion.div>

        <motion.div
          className="card gradient2"
          whileHover={{ scale: 1.03 }}
        >
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </motion.div>

        <motion.div
          className="card gradient3"
          whileHover={{ scale: 1.03 }}
        >
          <h3>Revenue</h3>
          <p>₹{revenue}</p>
        </motion.div>
      </div>

      {/* CHART */}
      <div className="chart-box">
        <h2>Sales Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* RECENT ORDERS */}
      <div className="recent-orders">
        <h2>Recent Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.slice(-5).reverse().map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.customer}</td>
                  <td>₹{o.amount}</td>
                  <td>
                    <span className={`badge ${o.status.toLowerCase()}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
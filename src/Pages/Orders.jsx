import React, { useState, useEffect } from "react";
import "./Orders.css";
import toast from "react-hot-toast";

function Orders() {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
    window.dispatchEvent(new Event("storage"));
  }, [orders]);

  const handleSubmit = () => {
    if (!customer || !amount) {
      toast.error("Please fill all fields");
      return;
    }

    if (editId) {
      // ✏️ UPDATE
      setOrders(
        orders.map((o) =>
          o.id === editId
            ? { ...o, customer, amount: Number(amount), status }
            : o
        )
      );
      toast.success("Order Updated"); // ✅ HERE
      setEditId(null);
    } else {
      // ➕ ADD
      setOrders([
        ...orders,
        {
          id: Date.now(),
          customer,
          amount: Number(amount),
          status,
        },
      ]);
      toast.success("Order Added"); // ✅ HERE
    }

    setCustomer("");
    setAmount("");
    setStatus("Pending");
  };

  const handleEdit = (o) => {
    setEditId(o.id);
    setCustomer(o.customer);
    setAmount(o.amount);
    setStatus(o.status);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this order?")) return;
        setOrders(orders.filter((o) => o.id !== id));
        toast.success("Deleted Successfully"); // ✅ HERE
  };

  return (
    <div className="orders-page">
      <h1>Orders</h1>

      <div className="order-form">
        <input
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <input
          type="number"
          placeholder="Total Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>

        <button onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.customer}</td>
              <td>₹{o.amount}</td>

              <td>
                <span className={`badge ${o.status.toLowerCase()}`}>
                  {o.status}
                </span>
              </td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(o)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(o.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
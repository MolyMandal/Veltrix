import React, { useState, useEffect } from "react";
import "./Products.css";
import toast from "react-hot-toast"; // ✅ ADD HERE

function Products() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("In Stock");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    window.dispatchEvent(new Event("storage"));
  }, [products]);

  const handleSubmit = () => {
    // ❌ ERROR TOAST HERE
    if (!name || !price) {
      toast.error("Please fill all fields");
      return;
    }

    if (editId) {
      // ✏️ UPDATE
      setProducts(
        products.map((p) =>
          p.id === editId ? { ...p, name, price, stock } : p
        )
      );
      toast.success("Product Updated"); // ✅ HERE
      setEditId(null);
    } else {
      // ➕ ADD
      setProducts([
        ...products,
        { id: Date.now(), name, price, stock },
      ]);
      toast.success("Product Added"); // ✅ HERE
    }

    setName("");
    setPrice("");
    setStock("In Stock");
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setName(p.name);
    setPrice(p.price);
    setStock(p.stock);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
        setProducts(products.filter((p) => p.id !== id));
        toast.success("Product Deleted"); // ✅ HERE
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-page">
      <h1>Products</h1>

      <div className="product-form">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
        <select value={stock} onChange={(e) => setStock(e.target.value)}>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>

        <button onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <input
        className="search-box"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
            {filtered.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
            No products found
            </td>
            </tr>
             ) : (
            filtered.map((p) => (
            <tr key={p.id}>
            <td>{p.name}</td>
            <td>₹{p.price}</td>
            <td>
              <span
                className={`badge ${p.stock
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
              >   {p.stock}
              </span>
            </td>
            <td>
              <button onClick={() => handleEdit(p)}>
                Edit
                </button>

                <button onClick={() => handleDelete(p.id)}>
                Delete
                </button>
              </td>
              </tr>
              ))
              )}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
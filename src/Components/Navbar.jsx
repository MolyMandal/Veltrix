import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users[users.length - 1];

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2>Shop Admin Dashboard</h2>

      <div className="nav-right">
        <input placeholder="Search..." />

        <div className="profile">
          {currentUser?.email?.charAt(0).toUpperCase() || "A"}
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
    { name: "Customers", path: "/customers" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">ShopAdmin</div>

      <nav className="sidebar-menu">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === "/"}
            className="menu-link"
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>Admin Panel</p>
      </div>
    </aside>
  );
}

export default Sidebar;
import React, { useState, useEffect } from "react";
import "./Settings.css";
import toast from "react-hot-toast";

function Settings() {
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("INR");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("settings"));

    if (saved) {
      setStoreName(saved.storeName);
      setEmail(saved.email);
      setCurrency(saved.currency);
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      storeName,
      email,
      currency,
    };

    localStorage.setItem("settings", JSON.stringify(settings));
    toast.success("Settings Saved");
  };

  return (
    <div className="settings-page">
      <div className="page-head">
        <h1>Settings</h1>
      </div>

      <div className="settings-card">
        <label>Store Name</label>
        <input
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Currency</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option>INR</option>
          <option>USD</option>
          <option>EUR</option>
        </select>

        <button onClick={saveSettings}>
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;
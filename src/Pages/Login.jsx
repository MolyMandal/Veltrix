import React, { useState } from "react";
import "./Login.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // Controls whether we are showing Login or Register form
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ PASSWORD VALIDATION
  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#%?<])[A-Za-z\d@#%?<]{8,}$/;
    return regex.test(password);
  };

  // ✅ REGISTER FUNCTION
  const handleRegister = () => {
    if (!email || !password) {
      toast.error("Enter email & password");
      return;
    }

    if (!isValidPassword(password)) {
      toast.error(
        "Password must contain letter, number, special (@#%?<) and be 8+ chars"
      );
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === email);

    if (exists) {
      toast.error("User already exists");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Registered successfully");

    // Switch back to Login view after successful registration
    setIsRegister(false);
    setEmail("");
    setPassword("");
  };

  // ✅ LOGIN FUNCTION
  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Enter email & password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("auth", "true");
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>{isRegister ? "Register" : "Admin Login"}</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Dynamic Button based on state */}
        <button onClick={isRegister ? handleRegister : handleLogin}>
          {isRegister ? "Register" : "Login"}
        </button>

        {/* Toggle between views */}
        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          {isRegister ? "Already have an account?" : "New user?"}{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            style={{
              color: "#4f46e5",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {isRegister ? "Login here" : "Register here"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
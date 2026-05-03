import { useState } from "react";
import "./LoginStyle.css";
import axiosInstance from "../../../api/axiosInstance";
import heroBg from "/src/assets/images/hero-bg copys.jpg";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/token/", {
        username,
        password,
      });

      const { access, refresh } = res.data;

      // ✅ تخزينهم
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // ✅ نجاح → روح لصفحة ثانية
      window.location.href = "/admin/products/";
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <Helmet>
        <title>Munaryss | Login</title>
      </Helmet>
      ;
      <div
        className="page"
        style={{
          backgroundImage: `
      linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
      url(${heroBg})
    `,
        }}
      >
        <div className="card">
          <h1 className="card-title">Admin Login</h1>
          <p className="card-sub">Enter your credentials to continue</p>

          {error && <div className="error">{error}</div>}

          <div className="field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}
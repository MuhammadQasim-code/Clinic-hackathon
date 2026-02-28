// client/src/pages/Login.jsx
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Clinic AI SaaS</h2>
          <p style={styles.subtitle}>Welcome back! Please login to your account.</p>
        </div>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              style={styles.input} 
              placeholder="doctor@clinic.com"
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              style={styles.input} 
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
        <p style={{ marginTop: "20px" }}>
        Don't have a clinic account?{" "}
        <span 
          onClick={() => navigate("/register")} 
          style={{ color: "#3b82f6", cursor: "pointer", fontWeight: "bold" }}
        >
          Register Clinic here
        </span>
      </p>
      </div>
    </div>
  );
}

// Global Styles Object for both pages
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f7f6", // Light medical grey
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  header: { marginBottom: "30px" },
  title: { color: "#2c3e50", fontSize: "24px", fontWeight: "700", marginBottom: "8px" },
  subtitle: { color: "#7f8c8d", fontSize: "14px" },
  form: { textAlign: "left" },
  inputGroup: { marginBottom: "20px" },
  label: { display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "600", color: "#34495e" },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #dcdde1",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3498db", // Medical Blue
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s",
  },
  footerText: { marginTop: "25px", fontSize: "14px", color: "#7f8c8d" },
  link: { color: "#3498db", cursor: "pointer", fontWeight: "600" }
};

export default Login;
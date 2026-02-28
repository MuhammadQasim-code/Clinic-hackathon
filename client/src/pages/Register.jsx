// client/src/pages/Register.jsx
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "patient" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Logic for user registration [cite: 81-82]
      await API.post("/auth/register", formData);
      alert("Registration Successful! Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={{...styles.card, maxWidth: "450px"}}>
        <div style={styles.header}>
          <h2 style={styles.title}>Register Your Clinic</h2>
          <p style={styles.subtitle}>Join our AI-powered healthcare network.</p>
        </div>
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input 
              style={styles.input} 
              placeholder="John Doe"
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              style={styles.input} 
              placeholder="admin@clinic.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              style={styles.input} 
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>System Role</label>
            <select 
              style={styles.input} 
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              value={formData.role}
            >
              {/* Mandatory 4 roles for hackathon [cite: 25] */}
              <option value="patient">Patient</option>
              <option value="receptionist">Receptionist</option>
              <option value="doctor">Doctor</option>
              <option value="admin">System Admin</option>
            </select>
          </div>
          <button type="submit" style={{...styles.button, backgroundColor: "#2ecc71"}}>
            Create Account
          </button>
        </form>
        <p style={styles.footerText}>
          Already registered? <span style={styles.link} onClick={() => navigate("/")}>Login instead</span>
        </p>
      </div>
    </div>
  );
}

// PASTE THIS AT THE BOTTOM OF Register.jsx
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f7f6",
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
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },
  footerText: { marginTop: "25px", fontSize: "14px", color: "#7f8c8d" },
  link: { color: "#3498db", cursor: "pointer", fontWeight: "600" }
};

export default Register;
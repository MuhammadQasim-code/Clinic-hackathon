import { useNavigate, Link } from "react-router-dom";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>Clinic AI 🩺</div>
      <nav style={styles.nav}>
        <Link to="/dashboard" style={styles.navItem}>🏠 Dashboard</Link>
        
        {/* Role-Specific Links [cite: 25-50] */}
        {user?.role === "doctor" && (
          <Link to="/ai-check" style={styles.navItem}>🧠 AI Diagnosis</Link>
        )}
        
        {(user?.role === "receptionist" || user?.role === "admin") && (
          <>
            <Link to="/patients" style={styles.navItem}>👥 Patients</Link>
            <Link to="/book-appointment" style={styles.navItem}>📅 Bookings</Link>
          </>
        )}

        {user?.role === "patient" && (
          <>
            <Link to="/book-appointment" style={styles.navItem}>📅 New Appointment</Link>
            <Link to="/my-history" style={styles.navItem}>📜 My History</Link>
          </>
        )}
      </nav>
      <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
    </div>
  );
};

const styles = {
  sidebar: { width: "250px", backgroundColor: "#2c3e50", color: "white", height: "100vh", position: "fixed", display: "flex", flexDirection: "column", padding: "20px" },
  logo: { fontSize: "22px", fontWeight: "bold", marginBottom: "30px", textAlign: "center", color: "#3498db" },
  nav: { flex: 1, display: "flex", flexDirection: "column", gap: "10px" },
  navItem: { color: "#ecf0f1", textDecoration: "none", padding: "12px", borderRadius: "8px", transition: "0.3s", fontSize: "15px" },
  logoutBtn: { backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }
};

export default Sidebar;
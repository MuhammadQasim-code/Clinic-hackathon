import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchSchedule = async () => {
    if (!user) return navigate("/");
    try {
      setLoading(true);
      const endpoint = user.role === "doctor" ? "/appointments/doctor-schedule" : "/appointments";
      const res = await API.get(endpoint);
      setAppointments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSchedule(); }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await API.patch(`/appointments/status/${id}`, { status: newStatus });
      fetchSchedule(); 
    } catch (err) { alert("Update failed"); }
  };

  if (loading) return <div style={styles.loader}>Loading clinic data...</div>;

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={{margin: 0}}>{user?.role.toUpperCase()} Portal</h1>
        <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
          <span>Welcome, <strong>{user?.name}</strong></span>
          <button onClick={() => { localStorage.clear(); navigate("/"); }} style={styles.logout}>Logout</button>
        </div>
      </header>

      <div style={styles.grid}>
        {appointments.length > 0 ? appointments.map(app => (
          <div key={app._id} style={styles.card}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span style={styles.badge}>{app.status?.toUpperCase()}</span>
              <span style={{fontSize: '10px', color: '#94a3b8'}}>{new Date(app.date).toLocaleDateString()}</span>
            </div>
            
            {/* Safety: Optional Chaining prevents blank screen */}
            <h4 style={{margin: '15px 0 5px 0'}}>Patient: {app.patientId?.name || "Unknown"}</h4>
            <p style={styles.reason}>Reason: {app.reason}</p>
            <p style={styles.doctorName}>Dr. {app.doctorId?.name || "Assigned"}</p>
            
            <div style={styles.actions}>
              {user.role === "doctor" && app.status !== "completed" && (
                <button onClick={() => handleStatusUpdate(app._id, "completed")} style={styles.successBtn}>Mark Done</button>
              )}
              {user.role === "receptionist" && app.status === "pending" && (
                <button onClick={() => handleStatusUpdate(app._id, "confirmed")} style={styles.confirmBtn}>Confirm</button>
              )}
            </div>
          </div>
        )) : <div style={styles.empty}>No appointments found for today.</div>}
      </div>
    </div>
  );
}

const styles = {
  wrapper: { padding: "40px", backgroundColor: "#f8fafc", minHeight: "100vh", width: "100vw", boxSizing: "border-box", fontFamily: 'Inter, sans-serif' },
  header: { display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: "30px", borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "25px" },
  card: { backgroundColor: "#fff", padding: "25px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
  badge: { backgroundColor: "#dbeafe", color: "#1e40af", padding: "4px 10px", borderRadius: "20px", fontSize: "10px", fontWeight: "800" },
  reason: { fontSize: "14px", color: "#475569", margin: "10px 0" },
  doctorName: { fontSize: "12px", color: "#94a3b8", fontWeight: '600' },
  actions: { marginTop: "20px", display: "flex", gap: "10px" },
  successBtn: { flex: 1, backgroundColor: "#10b981", color: "white", border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer", fontWeight: 'bold' },
  confirmBtn: { flex: 1, backgroundColor: "#3b82f6", color: "white", border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer", fontWeight: 'bold' },
  logout: { backgroundColor: "#ef4444", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" },
  loader: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#64748b' },
  empty: { gridColumn: '1/-1', textAlign: 'center', padding: '50px', color: '#94a3b8', backgroundColor: 'white', borderRadius: '12px' }
};

export default Dashboard;
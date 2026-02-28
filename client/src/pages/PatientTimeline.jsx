import { useEffect, useState } from "react";
import API from "../services/api";

function PatientTimeline() {
  const [history, setHistory] = useState({ appointments: [], prescriptions: [] });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        // Fetching combined data for the timeline
        const res = await API.get(`/patients/timeline/${user.id}`);
        setHistory(res.data);
      } catch (err) {
        console.error("Timeline load failed");
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, [user.id]);

  if (loading) return <div style={styles.loader}>Loading your medical history...</div>;

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Your Medical Journey</h2>
      <p style={styles.subtitle}>A complete history of your visits and treatments.</p>

      <div style={styles.timelineContainer}>
        {/* Appointments Section */}
        <section style={styles.section}>
          <h3 style={styles.sectionHeader}>📅 Appointment History</h3>
          {history.appointments.map((app) => (
            <div key={app._id} style={styles.card}>
              <div style={styles.dateBadge}>{new Date(app.date).toLocaleDateString()}</div>
              <p><strong>Reason:</strong> {app.reason}</p>
              <p><strong>Status:</strong> 
                <span style={{...styles.status, color: app.status === 'confirmed' ? '#27ae60' : '#f39c12'}}>
                  {app.status.toUpperCase()}
                </span>
              </p>
            </div>
          ))}
        </section>

        {/* Prescriptions Section */}
        <section style={styles.section}>
          <h3 style={styles.sectionHeader}>💊 Prescriptions & Notes</h3>
          {history.prescriptions.map((pre) => (
            <div key={pre._id} style={{...styles.card, borderLeft: "4px solid #3498db"}}>
              <div style={styles.dateBadge}>{new Date(pre.createdAt).toLocaleString()}</div>
              <p><strong>Medicines:</strong></p>
              <ul>
                {pre.medicines.map((m, i) => (
                  <li key={i}>{m.name} - {m.dosage}</li>
                ))}
              </ul>
              <button 
                onClick={() => window.open(`http://localhost:5000/api/prescriptions/download/${pre._id}`)}
                style={styles.downloadBtn}
              >
                📥 Download PDF
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { padding: "40px", backgroundColor: "#f1f5f9", minHeight: "100vh", fontFamily: "'Inter', sans-serif" },
  title: { color: "#1e293b", marginBottom: "5px" },
  subtitle: { color: "#64748b", marginBottom: "30px" },
  timelineContainer: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" },
  section: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" },
  sectionHeader: { borderBottom: "2px solid #f1f5f9", paddingBottom: "10px", marginBottom: "20px" },
  card: { padding: "15px", backgroundColor: "#f8fafc", borderRadius: "8px", marginBottom: "15px", position: "relative" },
  dateBadge: { fontSize: "12px", fontWeight: "bold", color: "#3498db", marginBottom: "5px" },
  status: { marginLeft: "10px", fontWeight: "bold", fontSize: "12px" },
  downloadBtn: { marginTop: "10px", padding: "8px 15px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px" },
  loader: { padding: "50px", textAlign: "center", fontSize: "18px", color: "#64748b" }
};

export default PatientTimeline;
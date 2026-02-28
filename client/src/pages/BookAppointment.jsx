import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({ doctorId: "", date: "", reason: "" });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get("/auth/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error("Failed to load doctors", err);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/appointments", { ...formData, patientId: user.id });
      alert("Appointment Booked Successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert("Error booking appointment.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.formCard}>
        <h2 style={{ color: "#1e293b", textAlign: "center" }}>New Appointment</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Select Specialist</label>
          <select 
            style={styles.input} 
            onChange={(e) => setFormData({...formData, doctorId: e.target.value})} 
            required
          >
            <option value="">-- {doctors.length > 0 ? "Select Registered Doctor" : "No Doctors Available"} --</option>
            {doctors.map(doc => (
              <option key={doc._id} value={doc._id}>Dr. {doc.name}</option>
            ))}
          </select>

          <label style={styles.label}>Reason for Visit</label>
          <textarea 
            style={{...styles.input, height: "100px"}} 
            placeholder="Describe symptoms..." 
            onChange={(e) => setFormData({...formData, reason: e.target.value})} 
            required 
          />

          <label style={styles.label}>Date & Time</label>
          <input 
            type="datetime-local" 
            style={styles.input} 
            onChange={(e) => setFormData({...formData, date: e.target.value})} 
            required 
          />

          <button type="submit" style={styles.btn}>Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { width: "100vw", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f1f5f9" },
  formCard: { backgroundColor: "white", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "500px", boxShadow: "0 10px 15px rgba(0,0,0,0.1)" },
  form: { display: "flex", flexDirection: "column" },
  label: { marginBottom: "5px", fontWeight: "bold", fontSize: "14px", color: "#64748b" },
  input: { padding: "12px", marginBottom: "20px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "15px", outline: "none" },
  btn: { padding: "15px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }
};

export default BookAppointment;
import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  // Link to Patient [cite: 180]
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Patient", 
    required: true 
  },
  // Link to Doctor [cite: 181]
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  // Array for multiple medicines [cite: 97, 182]
  medicines: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true }, // [cite: 98]
      duration: { type: String, required: true }
    }
  ],
  instructions: { type: String }, // [cite: 183]
  notes: { type: String }, // [cite: 99]
  // Al-generated simple explanation for patient [cite: 50, 122, 123]
  aiExplanation: { type: String } 
}, { 
  timestamps: true // Tracks createdAt for history timeline [cite: 107, 184]
});

export default mongoose.model("Prescription", prescriptionSchema);
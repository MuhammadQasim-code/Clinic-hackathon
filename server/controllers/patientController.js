import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Prescription from "../models/Prescription.js";

// CRUD: Add Patient [cite: 87]
export const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: "Error adding patient." });
  }
};

// CRUD: View All [cite: 89]
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("createdBy", "name");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Fetch error." });
  }
};

// CRUD: Edit [cite: 88]
export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(patient);
  } catch (error) {
    res.status(400).json({ message: "Update failed." });
  }
};

// CRUD: Delete
export const deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Delete failed." });
  }
};

// TIMELINE: Appointment, Diagnosis, and Prescription History [cite: 102-107]
export const getPatientTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    const appointments = await Appointment.find({ patientId: id }).sort({ date: -1 });
    const prescriptions = await Prescription.find({ patientId: id }).sort({ createdAt: -1 });

    res.status(200).json({ appointments, prescriptions, timestamp: new Date() });
  } catch (error) {
    res.status(500).json({ message: "Timeline error." });
  }
};
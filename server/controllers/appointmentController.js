import Appointment from "../models/Appointment.js";

// Create Appointment
export const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({ ...req.body, status: "pending" });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Booking failed" });
  }
};

// Get All (Receptionist View)
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name") // Pulls Name from User Collection
      .populate("doctorId", "name")
      .sort({ date: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

// Get Doctor Schedule (Doctor View)
export const getDoctorSchedule = async (req, res) => {
  try {
    const schedule = await Appointment.find({ doctorId: req.user.id })
      .populate("patientId", "name age gender")
      .sort({ date: 1 });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedule" });
  }
};

// Update status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Appointment.findByIdAndUpdate(id, { status }, { new: true })
      .populate("patientId", "name");
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Status update failed" });
  }
};
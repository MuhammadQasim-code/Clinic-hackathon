import Prescription from "../models/Prescription.js";
import PDFDocument from "pdfkit";

// CREATE: Add medicines, dosage, and notes [cite: 97-99]
export const createPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.create({
      ...req.body,
      doctorId: req.user.id
    });
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: "Error creating prescription." });
  }
};

// VIEW: For History Timeline [cite: 106]
export const getPrescriptions = async (req, res) => {
  try {
    const data = await Prescription.find().populate("patientId doctorId");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records." });
  }
};

// PDF GENERATION [cite: 100, 101]
export const downloadPrescription = async (req, res) => {
  try {
    const p = await Prescription.findById(req.params.id).populate("patientId doctorId");
    if (!p) return res.status(404).json({ message: "Not found" });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=prescription_${p._id}.pdf`);

    doc.fontSize(20).text("CLINIC AI PRESCRIPTION", { align: "center" });
    doc.moveDown().fontSize(12).text(`Patient: ${p.patientId.name}`);
    doc.text(`Doctor: ${p.doctorId.name}`);
    doc.moveDown().text("Medicines:", { underline: true });
    
    p.medicines.forEach(m => {
      doc.text(`- ${m.name}: ${m.dosage} (${m.duration})`);
    });
    
    doc.moveDown().text(`Instructions: ${p.instructions}`);
    if (p.aiExplanation) doc.moveDown().text(`AI Summary: ${p.aiExplanation}`, { oblique: true });

    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).json({ message: "PDF Error" });
  }
};
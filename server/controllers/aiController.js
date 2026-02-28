import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize with your Free API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 2. Configure the model for JSON output
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" } // Force JSON for easy UI parsing
});

export const symptomCheck = async (req, res) => {
  try {
    const { symptoms, age, gender, history } = req.body;

    // Hackathon Tip: Always validate input to prevent empty API calls
    if (!symptoms) return res.status(400).json({ error: "Symptoms required" });

    const prompt = `
      You are a specialized Medical Assistant for a Clinic. 
      Analyze the following patient data:
      Age: ${age}, Gender: ${gender}, History: ${history}, Symptoms: ${symptoms}.

      Return a JSON object with exactly these keys:
      {
        "conditions": ["Condition 1", "Condition 2", "Condition 3"],
        "risk_level": "Low | Medium | High",
        "recommended_tests": ["Test A", "Test B"],
        "disclaimer": "Your medical disclaimer here"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Parse the JSON string from Gemini
    const medicalData = JSON.parse(response.text());

    res.status(200).json(medicalData);

  } catch (error) {
    console.error("Hackathon Demo Error:", error);
    res.status(500).json({
      message: "AI Diagnostics Offline",
      fallback: "Please consult a medical professional."
    });
  }
};
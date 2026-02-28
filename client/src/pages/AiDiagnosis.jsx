import { useState } from "react";
import API from "../services/api";

function AiDiagnosis() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");

  const check = async () => {
    const res = await API.post("/ai/symptom-check", {
      symptoms,
      age: 25,
      gender: "Male",
      history: "None"
    });
    setResult(res.data.result || res.data.message);
  };

  return (
    <div>
      <h2>AI Diagnosis</h2>
      <textarea onChange={(e)=>setSymptoms(e.target.value)} />
      <button onClick={check}>Check</button>
      <pre>{result}</pre>
    </div>
  );
}

export default AiDiagnosis;
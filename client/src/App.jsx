import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"; // 1. Ensure this is imported
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* 2. Add the Register Route here */}
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Redirect unknown paths back to Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
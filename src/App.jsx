import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HandleLogin from "./Pages/Login";
import HandleSignUp from "./Pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<HandleLogin />} />
        <Route path="/signup" element={<HandleSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

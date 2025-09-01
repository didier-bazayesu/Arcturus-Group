import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HandleLogin from "./Pages/Login";
import HandleSignUp from "./Pages/Signup";
import AboutUs from "./Pages/About";

function App() {
  return (

    <>
      <Router>
        <Routes>
          <Route path="/login" element={<HandleLogin />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<HandleSignUp />} />
          <Route path="/About" element={<AboutUs/>}/>

        </Routes>
      </Router>

     
    </>
  );
}

export default App;

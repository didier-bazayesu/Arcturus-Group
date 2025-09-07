import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HandleLogin from "./Pages/Login";
import HandleSignUp from "./Pages/Signup";
import AboutUs from "./Pages/AboutUs";
import Footer from "./Component/Footer";
import MainLandingPage from "./Pages/MainLandingPage";
import ShortReport from "./Pages/shortReport";
import Navigation from "./Component/navigation";
import SkillsExplorer from "./Pages/SearchSkills";
import OccupationsExplorer from "./Pages/SearchOccupations";

function App() {
  return (
    <Router>
      <Navigation />

      <Routes>
        {/* 👇 Make MainLandingPage the default first page */}
        <Route path="/" element={<MainLandingPage />} />

        <Route path="/login" element={<HandleLogin />} />
        <Route path="/signup" element={<HandleSignUp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/report" element={<ShortReport />} />
        <Route path="/skills" element={<SkillsExplorer />} />
        <Route path="/occupations" element={<OccupationsExplorer />} />

        {/* 👇 Redirect unknown routes back to main landing page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

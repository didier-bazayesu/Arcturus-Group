import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HandleLogin from "./Pages/Login";
import HandleSignUp from "./Pages/Signup";
import AboutUs from "./Pages/About";
import Footer from "./Pages/Footer"
import MainLandingPage from "./Pages/MainLandingPage"
import ShortReport from "./Pages/shortReport"
import { Navigation } from "./Pages/navigation"
import SkillsExplorer from './Pages/SearchSkills'
import OccupationsExplorer from './Pages/SearchOccupations'
import SearchAndOccupations from './Pages/skillsAndOccupa'
import Dashboard from './Pages/dashboard'
import ExploreTool from './Component/exploreTool'
import ConnectPart from './Component/ConnectPart'




function App() {
  return (

 <AboutUs />




  );
}

export default App;
    
{/* <BrowserRouter>
      <Navigation />


      <Routes>
        <Route path="/" element={<Navigate to="/login " />} />
        <Route path="/login" element={<HandleLogin />} />
        <Route path="/signup" element={<HandleSignUp />} />
        <Route path="/about" element={<MainLandingPage />} />
        <Route path="/report" element={<ShortReport />} />
        <Route path="/main_design" element={<MainDesign />} />
        <Route path="/searchgroup" element={<Searchgroup />} />
        <Route path="/skills" element={<SkillsExplorer />} />
        <Route path="/occupations" element={<OccupationsExplorer />} />
        <Route path="/skills-and-occupations" element={<SearchAndOccupations />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<ExploreTool />} />
        <Route path="/landing" element={<MainLandingPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>  */}


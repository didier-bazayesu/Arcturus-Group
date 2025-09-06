import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HandleLogin from "./Pages/Login";
import HandleSignUp from "./Pages/Signup";
import AboutUs from "./Pages/About";
import Footer from "./Pages/Footer"
import MainLandingPage from "./Pages/MainLandingPage"
import ShortReport from "./Pages/shortReport"
import { Navigation } from "./Pages/navigation"
import SkillsExplorer from './Pages/SearchSkills'
import  OccupationsExplorer from './Pages/SearchOccupations'
import SearchAndOccupations from './Pages/skillsAndOccupa'
import Searchgroup from "./Searchgroup";
import MainDesign from "./MainDesign";




function App() {
  return (

    <>
      <Router>
        <Routes>
          
          <Route path="/searchgroup" element={<Searchgroup/>}></Route>
          <Route path="/main_design" element={<MainDesign/>}></Route>
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

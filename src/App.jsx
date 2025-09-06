import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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




function App() {

  return (
    
  <BrowserRouter>
      <Navigation />
      <Routes>
           <Route path="/Home" element={<AboutUs/>}></Route>
          <Route path="/login" element={<HandleLogin />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<HandleSignUp />} />
          <Route path="/Report" element={<ShortReport />} />
          <Route path="/About" element={<MainLandingPage />} />
      </Routes>
      <Footer/> 
    </BrowserRouter>
   


  );

}

export default App;

 

 
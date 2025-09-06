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
import Dashboard from './Pages/dashboard'




function App() {

  return (
    
  <Dashboard />
   


  );

}

export default App;

 

//  <BrowserRouter>
//       <Navigation />
//       <Routes>
//           <Route path="/login" element={<OccupationsExplorer />} />
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/signup" element={<HandleSignUp />} />
//           <Route path="/About" element={<AboutUs/>}/>
//           <Route path="/Report" element={<SkillsExplorer />} />
//           <Route path="/about" element={<MainLandingPage />} />
//       </Routes>
//       <Footer/> 
//     </BrowserRouter>
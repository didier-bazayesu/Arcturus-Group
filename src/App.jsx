import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HandleLogin from "./Pages/Login";
import HandleSignUp from "./Pages/Signup";
import AboutUs from "./Pages/About";
import MainDesign from "./MainDesign";
import Searchgroup from "./Searchgroup";

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
          <Route path="/About" element={<AboutUs />} />

        </Routes>
      </Router>


    </>
  );
}

export default App;
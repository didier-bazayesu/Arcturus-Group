import Footer from "./Pages/Footer"
import MainLandingPage from "./Pages/MainLandingPage"
import { BrowserRouter,Routes, Route } from "react-router-dom"

import ShortReport from "./Pages/shortReport"
import { Navigation } from "./Pages/navigation"

function App() {

  return (
    <>
    <BrowserRouter>
    <Navigation />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/Report" element={<ShortReport />} />
        <Route path="/about" element={<MainLandingPage />} />
      </Routes>
    <Footer/> 
    </BrowserRouter>
    </>
  )
}

export default App

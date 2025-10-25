import React from 'react'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import SignUpBrochure from './components/SignUpBrochure'
import SignInBrochure from './components/SignInBrochure'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpBrochure />} />
          <Route path="/signin" element={<SignInBrochure />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App

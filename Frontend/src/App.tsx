import React from 'react'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          </Routes>
      </Router>
    </div>
  )
}

export default App

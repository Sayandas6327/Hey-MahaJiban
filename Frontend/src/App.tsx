import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import SignUpBrochure from './components/SignUpBrochure'
import SignInBrochure from './components/SignInBrochure'
import Footer from './components/Footer'
import BooksList from './components/BooksList'


const App : React.FC = () => {
  const [user, setUser] = useState<any>(null);

  // Load user from localStorage once
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpBrochure />} />
          <Route path="/signin" element={<SignInBrochure setUser={setUser}/>} />
          <Route path="/books" element={<BooksList user={user}/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App

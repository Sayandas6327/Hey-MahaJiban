import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignInBrochure.css";
import axios from "axios";

interface SignInBrochureProps {
  setUser: (user: any) => void;
}
const SignInBrochure : React.FC<SignInBrochureProps>= ({setUser}) => {
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const navigate = useNavigate();
    // Example SignIn API call
const handleSignIn = async (e:any) => {
    e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/api/users/signin", {
      email,
      pass1,
    });
    // console.log(res.data);
    if (res.data.message==="Sign In Successfull")
    {
      alert(res.data.message);
      // Store user info
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      // // Redirect or update state
      navigate("/books");
    }
    else{
    alert(res.data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Sign In Failed! Please fill all the fields correctly");
  }
};

  return (
    <div className="brochure-wrapper">
      <div className="brochure-container">
        <div className="brochure-right">
          <h2>Sign In</h2>
          <form className="signin-form">
            <input type="text" placeholder="Email" required value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" required value={pass1}
              onChange={(e) => setPass1(e.target.value)}/>
            <button type="submit" onClick={handleSignIn}>Sign In</button>
          </form>
          <p className="signup-text">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInBrochure;

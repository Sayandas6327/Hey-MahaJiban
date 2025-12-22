import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpBrochure.css";
import axios from "axios";

const SignUpBrochure = () => {
  const navigate = useNavigate();
  const [inputs,setInputs]=useState({name:"",phone:"",email:"",pass1:"",profilePic: null as File | null});
  const change = (e:any) => {
    const {name, value, files} =e.target;
    if(name==="profilePic" && files){
      setInputs({...inputs, [name]: files[0]});
    }else{
      setInputs({...inputs, [name]: value});
    }
  }
  const submit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      // Use FormData for file upload
      const formData = new FormData();
      formData.append("name", inputs.name);
      formData.append("phone", inputs.phone);
      formData.append("email", inputs.email);
      formData.append("pass1", inputs.pass1);
      if (inputs.profilePic) {
        formData.append("profilePic", inputs.profilePic);
      }
    const res = await axios.post("https://hey-mahajiban-backend.onrender.com/api/users/signup", formData,{
      headers: { "Content-Type": "multipart/form-data" },
    });
      if(res.data.message==="Sign Up Successfull"){
        alert(res.data.message);
        setInputs({name:"",phone:"",email:"",pass1:"",profilePic: null});
        navigate("/signin")
      }
      else{
        alert(res.data.message);
      }
    }
    catch(err) {
      alert("SignUp Failed! User already exists or please fill all the fields correctly");
    }
  }
  return (
    <div className="brochure-wrapper">
    <div className="brochure-container">
      <div className="brochure-right">
        <h2>Create Your Account</h2>
        <form className="signup-form">
          <input type="text" placeholder="User Name" required
          name="name" onChange={change} value={inputs.name}/>
          <input type="phone" placeholder="Phone Number" required 
          name="phone" onChange={change} value={inputs.phone}/>
          <input type="email" placeholder="Email" required 
          name="email" onChange={change} value={inputs.email}/>
          <input type="password" placeholder="Password" required 
          name="pass1" onChange={change} value={inputs.pass1}/>
          <input type="file" accept="image/*" 
          name="profilePic" onChange={change}/>
          <button type="submit" onClick={submit}>Sign Up</button>
        </form>
        <p className="signin-text">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default SignUpBrochure;

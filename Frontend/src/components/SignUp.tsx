import React from 'react'

const SignUp = () => {
  return (
    <>
    <div style={{textAlign:"center"}}>
        <br/><br/><br/><br/>
      <input type="text" placeholder="Enter your user name" /><br/><br/>
      <input type="number" placeholder="Enter your phone number" /><br/><br/>
      <input type="email" placeholder="Enter your email" /><br/><br/>
      <input type="password" placeholder="Enter your password" /><br/><br/>
      <input type="file" placeholder="Upload your profile picture" /><br/><br/>
      <button>Sign Up</button>
    </div>
    </>
  )
}

export default SignUp

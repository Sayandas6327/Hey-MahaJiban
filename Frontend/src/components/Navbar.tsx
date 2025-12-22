
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
interface NavbarProps {
  user: any;
  setUser: (user: any) => void;
}
const Navbar : React.FC<NavbarProps>= ({ user, setUser }) => {

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <nav className="navbar-container">
      {/* Left Section - Logo */}
      <div className="navbar-left">
        <Link className="navbar-brand" to="/">
          <img
            src="/images/Logo.png"
            alt="Hey Mahajiban Logo"
            className="navbar-logo"
          />
        </Link>
      </div>

      {/* Right Section - Links */}
      <div className="navbar-right">
        <Link className="nav-link text-nav" to="/">
          <b>Home</b>
        </Link>
        {!user ?(<>
                  <Link className="nav-link btn-nav" to="/signin">
          <b>Sign In</b>
        </Link>
        <Link className="nav-link btn-nav" to="/signup">
          <b>Sign Up</b>
        </Link>
        </>):(
          <>
           <div className="navbar-right">
            <Link className="nav-link btn-nav" to="/" onClick={handleLogout}>
              <b>Log Out</b>
            </Link>
          </div>
           <div className="user-profile">
            <img
              src={user.user.profilePic}
              alt={user.user.name}
              className="profile-pic"
            />
            {/* <span className="navbar-username">{user.user.name}</span> */}
          </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

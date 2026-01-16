
import React,{ useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import DropDownProfile from "./DropDownProfile";
interface NavbarProps {
  user: any;
  setUser: (user: any) => void;
}
const Navbar : React.FC<NavbarProps>= ({ user, setUser }) => {

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setOpen(false);
  };
  const toggleDropdown = (e: React.MouseEvent) => {
    // e.stopPropagation();
    setOpen((prev) => !prev);
  }

  /* Close dropdown on outside click */
  useEffect(() => {
    // const close =() => setOpen(false);
    // document.addEventListener("click", close);
    // return () => document.removeEventListener("click", close);
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    // document.addEventListener("click", handleClickOutside);
    // return () => document.removeEventListener("click", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
           {/* <div className="navbar-right"> */}
            <Link className="nav-link btn-nav" to="/" onClick={handleLogout}>
              <b>Log Out</b>
            </Link>
          {/* </div> */}
           <div className="user-profile profile-dropdown" ref={dropdownRef}>
            <img
              src={user.user.profilePic}
              alt={user.user.name}
              className="profile-pic"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={toggleDropdown}
            />
            {/* Dropdown Menu */}
              {open && <DropDownProfile />}
            {/* <span className="navbar-username">{user.user.name}</span> */}
          </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



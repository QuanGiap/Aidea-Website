import React, { useContext } from "react";
import "./Header.css";
import { Outlet, useNavigate } from "react-router";
import { Auth } from "../../context/AuthProvider";

function Header() {
    const {user} = useContext(Auth);
    const navigate = useNavigate();
  return (
    <React.Fragment>
      <nav className="header_container">
        <img id="header_logo_img" src="logo/AIdea.png" alt="AIDea logo" />
        <div id="header_navigation_container">
          <p className="header_nav" onClick={()=>navigate('hub')}>Hub</p>
          <p className="header_nav" onClick={()=>navigate('sign_up')}>Sign Up</p>
          <p className="header_nav login" onClick={()=>navigate('login')}>Log In</p>
        </div>
      </nav>
      <Outlet />
    </React.Fragment>
  );
}
export default Header;

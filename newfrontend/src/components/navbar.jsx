import React from "react";
import logo from "./images/IQLogo.jpg";

//Stateless Functional Component
const NavBar = () => {
  return (
    <nav className="navbar navbar-light" style={{ backgroundColor: "#f6c6a9", marginTop:"-10px" }}>
      <a className="navbar-brand" href="#">
        <img src={logo} width="96" height="52" alt="IQ180Logo" />
      </a>
    </nav>
  );
};

export default NavBar;

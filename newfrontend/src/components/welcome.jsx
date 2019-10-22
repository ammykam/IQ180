import React, { Component } from "react";
import logo from "./images/IQ180Logo.png";

const styleLogo = {
  marginLeft: "10%",
  marginRight: "10%",
  width: "80%"
};

const styleStart = {
  marginLeft: "45%",
  marginRight: "45%",
  width: "10%",
  backgroundColor: "#d67573",
  color: "white",
  fontSize: "25px",
  marginTop: "-140px"
};

class Welcome extends Component {
  state = {};
  render() {
    const { onWelcomeStart } = this.props;
    return (
      <div>
        <img
          src={logo}
          width="960"
          height="600"
          alt="IQ180Logo"
          style={styleLogo}
        />
        <button
          onClick={onWelcomeStart}
          className="btn btn-sm"
          style={styleStart}
        >
          START
        </button>
      </div>
    );
  }
}

export default Welcome;

import React, { Component } from "react";
import NavBar from "./components/navbar";
import Welcome from "./components/welcome";
import Login from "./components/login";

import "./App.css";

class App extends Component {
  state = {};

  constructor() {
    super();
    console.log("App - Constructor");
  }

  handleWelcomeStart = () => {
    console.log("Welcome Start Clicked!");
  };

  handleLoginLogin = () => {
    console.log("From APP CONSOLE: Login Button in Login Clicked!");
  };

  render() {
    console.log("App  - Rendered");
    return (
      <React.Fragment>
        <NavBar />

        <main className="container">

          <div id="welcome" style={{ display: "none" }}>
            <Welcome onWelcomeStart={this.handleWelcomeStart} />
          </div>

          <div id="login" style={{ marginTop:"12%"}}>
            <Login onLoginLogin={this.handleLoginLogin}/>
          </div>

        </main>
      </React.Fragment>
    );
  }
}

export default App;

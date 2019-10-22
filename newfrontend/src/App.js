import React from "react";
import { useState } from 'react';
import "./App.css";
import NavBar from "./components/navbar";
import Welcome from "./components/welcome";
import Login from "./components/login";
import WelcomeDialog from "./components/welcomeDialog";
import WhosReady from "./components/whosReady";
import Game from "./components/game";

import Song from "./components/Song";
import Countdown from "./components/countdown";

import socketIOClient from "socket.io-client";
export const socket = socketIOClient("http://localhost:3000");

function App() {
  // socket.on("OnlineUser", res => {
  //   console.log(res);
  // });
  // socket.on("ReadyUser", res => {
  //   console.log(res);
  // });
  // socket.on("ReadyToPlay", res => {
  //   console.log(res);
  // });
  // socket.on("CorrectAnswer", res => {
  //   console.log(res);
  // });
  // socket.on("RoundWinner", res => {
  //   console.log(res);
  // });

  const handleWelcomeStart = () =>{
    console.log("Welcome Start Clicked!");
    setShowWelcome(false);
    setShowLogin(true);
  }; 
  const handleLoginLogin = (x) =>{
    console.log("From APP CONSOLE: Login Button in Login Clicked!");
    setShowLogin(false);
    setShowWelcomeDialog(true);
  }; 
  const handleWelcomeWelcome = () =>{
    console.log("From APP CONSOLE: first Button in welcomeDialog Clicked!");
    setShowWelcomeDialog(false);
    setShowWhosReady(true);
  }; 

  const handleWhosReadyStart = () =>{
    console.log("From APP CONSOLE: start Button in whosready Clicked!");
    setShowWhosReady(false);
    setShowGame(true); 
  }; 

  const [showWelcome, setShowWelcome] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const [showWhosReady, setShowWhosReady] = useState(false);
  const [showGame, setShowGame] = useState(true);

  return (
    <>
      <div className="App">

        <header className="App-header">
         <NavBar/>
        </header>
         <Song/>
         <Countdown/>
        <main className="App-main">
          {showWelcome && <Welcome onWelcomeStart={handleWelcomeStart}/>}
          {showLogin && <Login onLoginLogin={handleLoginLogin}/>}
          {showWelcomeDialog && <WelcomeDialog onWelcomeWelcome={handleWelcomeWelcome}/>}
          {showWhosReady && <WhosReady onWhosReadyStart={handleWhosReadyStart}/>}
          {showGame && <Game/>}
        </main>

      </div>
    </>
  );
}

export default App;

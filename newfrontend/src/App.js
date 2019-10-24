import React from "react";
import { useState } from 'react';
import "./App.css";
import NewNavBar from "./components/newNavbar";
import Welcome from "./components/welcome";
import Login from "./components/login";
import WhosReady from "./components/whosReady";
import Game from "./components/game";
import RoundWinner from "./components/roundWinner";
import NewWelcomeDialog from "./components/newWelcomeDialog"
import GameSingle from "./components/gameSingle"

import socketIOClient from "socket.io-client";
export const socket = socketIOClient(process.env.REACT_APP_SERVER_URL || "http://localhost:3000");

function App() {
  const handleWelcomeStart = () =>{
    console.log("Welcome Start Clicked!");
    setShowWelcome(false);
    setShowLogin(true);
  }; 
  const handleLoginLogin = (x) =>{
    console.log("From APP CONSOLE: Login Button in Login Clicked!");
    setShowLogin(false);
    setShowNewWelcomeDialog(true);
  }; 
  const handleWelcomeWelcome = () =>{
    console.log("From APP CONSOLE: first Button in welcomeDialog Clicked!");
    setShowNewWelcomeDialog(false);
    setShowWhosReady(true);
  }; 

  const handleWhosReadyStart = () =>{
    console.log("From APP CONSOLE: start Button in whosready Clicked!");
    setShowWhosReady(false);
    setShowGame(true); 
  }; 

  const handleChangeGameToWinner = () => {
    setShowGame(false);
    setShowRoundWinner(true);
  }

  const handleBackToGame = () => {
    setShowRoundWinner(false);
    setShowGame(true);
  }

  const handleResetGame = () => {
    setShowGame(false);
    setShowWelcome(true);
  }

  const handleResetWinner = () => {
    setShowRoundWinner(false);
    setShowWelcome(true);
  }
  // const handleReset = () => {
  // }

  const handleSingleStart = () => {
    setShowWhosReady(false);
    setShowGameSingle(true);
  }

  const [showWelcome, setShowWelcome] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showNewWelcomeDialog, setShowNewWelcomeDialog] = useState(false);
  const [showWhosReady, setShowWhosReady] = useState(false);
  const [showGameSingle, setShowGameSingle] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showRoundWinner, setShowRoundWinner] = useState(false);
  
  return (
    <>
      <div className="App">
        <header className="App-header">
         <NewNavBar/>
        </header>
        <main className="App-main">
          {showWelcome && <Welcome onWelcomeStart={handleWelcomeStart}/>}
          {showLogin && <Login onLoginLogin={handleLoginLogin}/>}
          {showNewWelcomeDialog && <NewWelcomeDialog onWelcomeWelcome={handleWelcomeWelcome}/>}
          {showWhosReady && <WhosReady onWhosReadyStart={handleWhosReadyStart} onSingleStart={handleSingleStart}/>}
          {showGame && <Game onChangeGameToWinner={handleChangeGameToWinner} onResetGame={handleResetGame}/>}
          {showGameSingle && <GameSingle/>}
          {showRoundWinner && <RoundWinner onBackToGame={handleBackToGame} onResetWinner={handleResetWinner}/>}
          {/* onReset={handleReset} */}
        </main>
      </div>
    </>
  );
}

export default App;

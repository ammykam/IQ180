import React, { Component } from "react"

 
export default class extends Component {
  
  playAudio() {
    const audio = document.getElementsByClassName("audio-element")[0]
    audio.play()
  }
   pauseAudio(){
    const audio = document.getElementsByClassName("audio-element")[0]
    audio.pause()
    
   }
 
  render() {
    return (
      <div>
        <button onClick={this.playAudio}>
          <span>Play Music</span>
        </button>
        <button onClick={this.pauseAudio}>
          <span>
            Pause
          </span>
        </button>
        <audio className="audio-element">
          <source src="Yiruma.mp3"></source>
          
        </audio>
        </div>
    )
  }
}
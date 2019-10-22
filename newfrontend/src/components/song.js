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
      <div style={{marginTop:"10px"}}>
        <button class="btn btn-light m-2"  style={{height:"30px"}} onClick={this.playAudio}>
          <p style={{marginTop:"-5px", fontWeight:"bold"}}>Play Music</p>
        </button>
        <button class="btn btn-light" style={{height:"30px"}} onClick={this.pauseAudio}>
        <p style={{marginTop:"-5px", fontWeight:"bold"}}>Pause</p>
        </button>
        <audio className="audio-element">
          <source src="Yiruma.mp3"></source>
          
        </audio>
      </div>
    )
  }
}
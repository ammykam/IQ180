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
<<<<<<< HEAD
      <div style={{marginTop:"10px", marginRight:"-1020px"}}>
      <button className="btn btn-light m-2"  style={{height:"30px"}} onClick={this.playAudio}>
        <p style={{marginTop:"-5px", fontWeight:"bold"}}>Play Music</p>
      </button>
      <button className="btn btn-light" style={{height:"30px"}} onClick={this.pauseAudio}>
      <p style={{marginTop:"-5px", fontWeight:"bold"}}>Pause</p>
      </button>
      <audio className="audio-element">
        <source src="Yiruma.mp3"></source>
        
=======
    <div style={{marginTop:"10px"}}>
      <button className="btn btn-light m-2"  style={{height:"30px"}} onClick={this.playAudio}>
        <p style={{marginTop:"-5px", fontWeight:"bold"}}>Play Music</p>
      </button>
      <button className="btn btn-light" style={{height:"30px"}} onClick={this.pauseAudio}>
        <p style={{marginTop:"-5px", fontWeight:"bold"}}>Pause</p>
      </button>
      <audio className="audio-element">
        <source src="Yiruma.mp3"></source>
                
>>>>>>> b95a7d36682da408139ce7fa23b43af1ea17ea2a
      </audio>
    </div>
    )
  }
}
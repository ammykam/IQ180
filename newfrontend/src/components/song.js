import React, { Component } from "react"
import { withNamespaces } from 'react-i18next';
import { Trans } from 'react-i18next';

export default class extends withNamespaces()(Component) {
  
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
    <div style={{marginTop:"10px", marginRight:"-890px"}}>
      <button className="btn btn-light m-2"  style={{height:"30px"}} onClick={this.playAudio}>
        <p style={{marginTop:"-5px", fontWeight:"bold"}}>
        <Trans i18nKey="Play Music">Play Music </Trans>
        </p>
      </button>
      <button className="btn btn-light" style={{height:"30px"}} onClick={this.pauseAudio}>
        <p style={{marginTop:"-5px", fontWeight:"bold"}}>
        <Trans i18nKey="Pause">Pause</Trans>
        </p>
      </button>
      <audio className="audio-element">
        <source src="Yiruma.mp3"></source>
                
      </audio>
    </div>
    )
  } 
}
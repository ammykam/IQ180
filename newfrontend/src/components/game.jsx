import React, { Component } from 'react';
import DivideSign from "./images/sign/divideButton.png";
import LeftSign from "./images/sign/leftButton.png";
import MinusSign from "./images/sign/minusButton.png";
import PlusSign from "./images/sign/plusButton.png";
import RightSign from "./images/sign/divideButton.png";
import MultiplySign from "./images/sign/multiplyButton.png";

const buttonStyle ={
    backgroundColor: "transparent",
    borderColor: "transparent",
    width: "auto",
    margin: "10px"
  }

const buttonNumStyle ={
    backgroundColor: "#fdf5ee",
    borderColor: "transparent",
    width: "65px",
    height: "65px",
    margin: "25px"
  }

class Game extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="row" style={{margin:"30px"}}>
                <div className="col-sm-8">
                    <div className="card" style={{backgroundColor:"#67605f"}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-9">
                                    <h3 style={{color:"white", textAlign:"left"}}>Round (wait for round #)</h3>
                                </div>
                                <div className="col-sm-3" style={{backgroundColor:"#f8e8cf"}}>
                                    <p>TIMER</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-9" style={{backgroundColor:"#f6c6a9"}}>
                                    <p>show equation</p>
                                </div>
                                <div className="col-sm-1">
                                    <h3>=</h3>
                                </div>
                                <div className="col-sm-2" style={{backgroundColor:"#fdf5ee"}}>
                                    <p>RESULT</p>
                                </div>
                            </div>
                            <div>
                                <button style={buttonNumStyle}></button>
                                <button style={buttonNumStyle}></button>
                                <button style={buttonNumStyle}></button>
                                <button style={buttonNumStyle}></button>
                                <button style={buttonNumStyle}></button>
                            </div>
                            <div>
                                <button style={buttonStyle}><img style={{width:"80px"}} src={PlusSign} alt="" /></button>
                                <button style={buttonStyle}><img style={{width:"80px"}} src={MinusSign} alt="" /></button>
                                <button style={buttonStyle}><img style={{width:"80px"}} src={MultiplySign} alt="" /></button>
                                <button style={buttonStyle}><img style={{width:"80px"}} src={DivideSign} alt="" /></button>
                                <button style={buttonStyle}><img style={{width:"80px"}} src={LeftSign} alt="" /></button>
                                <button style={buttonStyle}><img style={{width:"80px"}} src={RightSign} alt="" /></button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Players</h3>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Game;
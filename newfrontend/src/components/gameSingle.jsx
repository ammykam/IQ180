import React, { Component } from 'react';
import { socket } from "../App.js";
import DivideSign from "./images/sign/divideButton.png";
import LeftSign from "./images/sign/leftButton.png";
import MinusSign from "./images/sign/minusButton.png";
import PlusSign from "./images/sign/plusButton.png";
import RightSign from "./images/sign/rightButton.png";
import MultiplySign from "./images/sign/multiplyButton.png";
import Chat from "./chat";
import { withNamespaces } from 'react-i18next';

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
class GameSingle extends Component {
    constructor() {
        super();
        this.state = {
          problem:[],
          answer:'',
          warnText:'',
          round:0,
          answer:[],
          checkAnswer:"0",
          stateAnswer:false,
          secondElapsed:60,
          changeWinner: false,
          firstTimeOut: true,
          buttonValue1:false,
          buttonValue2:false,
          buttonValue3:false,
          buttonValue4:false,
          buttonValue5:false,
          hintString:'',
          reset: false,
        };

      }    
      render() { 
        const { t } = this.props;
        const { nameReady,problem, warnText,round,answer,checkAnswer, stateAnswer, buttonValue1,buttonValue2,buttonValue3,buttonValue4,buttonValue5, hintString} = this.state; 

        return ( 
            <div className="row" style={{margin:"30px"}}>
                <div className="col-sm-8">
                    <div className="card" style={{backgroundColor:"#67605f", padding:"20px"}} >
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-9">
                                    <h3 style={{color:"white", textAlign:"left"}}>{t('Round')} {round}</h3>
                                </div>
                                <div className="col-sm-3" style={{backgroundColor:"#f8e8cf"}}>
                                    <div>
                                        {/* <h1>{this.getSecond()}</h1> */}
                                        <div style={{color:"black", fontSize:"1px"}}>{stateAnswer === true ? this.stopTime(): null }</div>
                                    </div>
                                </div>
                            </div>
                            <br/><br/>
                            <div className="row" style={{height:"70px", fontWeight:"bold"}}>
                                <div className="col-sm-9" style={{backgroundColor:"#f6c6a9"}}>
                                    <p style={{marginTop:"26px", fontSize: "25px"}}>{answer}</p>
                                </div>
                                <div className="col-sm-1">
                                    <h3 style={{marginTop:"26px"}}>=</h3>
                                </div>
                                <div className="col-sm-2" style={{backgroundColor:"#fdf5ee", fontWeight:"bold", paddingTop:"15px"}}>
                                    <p>{checkAnswer}</p>
                                    <p>{stateAnswer.toString()}</p>
                                </div>
                            </div><br/><br/>
                            <div className="row">
                                <div className="col-sm-6">
                                    <h4 style={{textAlign:"left", fontWeight:"bold", color:"pink"}}>{t('Expected Result')} = {problem[5]}</h4>
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-outline-success">{t('Hint')}</button>
                                </div>
                                <div className="col-sm-2" style={{marginLeft:"-30px"}}>
                                    <button className="btn btn-outline-info">{t('Skip')}</button>
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-outline-warning">{t('Submit')}</button>
                                </div>
                            </div>
                            <br/>
                            <div style={{marginLeft:"-100px"}}>
                                <p>{warnText}</p>
                                <button style={buttonNumStyle} disabled={buttonValue1} value={problem[0]}>{problem[0]}</button>
                                <button style={buttonNumStyle} disabled={buttonValue2} value={problem[1]}>{problem[1]}</button>
                                <button style={buttonNumStyle} disabled={buttonValue3} value={problem[2]}>{problem[2]}</button>
                                <button style={buttonNumStyle} disabled={buttonValue4} value={problem[3]}>{problem[3]}</button>
                                <button style={buttonNumStyle} disabled={buttonValue5} value={problem[4]}>{problem[4]}</button>
                            </div>
                            <div>
                                <button style={buttonStyle} onClick={()=>{
                                    this.state.answer.push("+")
                                    this.setState({answer: this.state.answer})
                                }} ><img style={{width:"80px"}} src={PlusSign} alt="" /></button>
                                <button style={buttonStyle} onClick={()=>{
                                    this.state.answer.push("-")
                                    this.setState({answer: this.state.answer})
                                }} ><img style={{width:"80px"}} src={MinusSign} alt="" /></button>
                                <button style={buttonStyle} onClick={()=>{
                                    this.state.answer.push("*")
                                    this.setState({answer: this.state.answer})
                                }} ><img style={{width:"80px"}} src={MultiplySign} alt="" /></button>
                                <button style={buttonStyle} onClick={()=>{
                                    this.state.answer.push("/")
                                    this.setState({answer: this.state.answer})
                                }} ><img style={{width:"80px"}} src={DivideSign} alt="" /></button>
                                <button style={buttonStyle} onClick={()=>{
                                    this.state.answer.push("(")
                                    this.setState({answer: this.state.answer})
                                }} ><img style={{width:"80px"}} src={LeftSign} alt="" /></button>
                                <button style={buttonStyle} onClick={()=>{
                                    this.state.answer.push(")")
                                    this.setState({answer: this.state.answer})
                                }} ><img style={{width:"80px"}} src={RightSign} alt="" /></button>
                                <button className="btn btn-danger m-3" onClick={()=>{
                                    
                                    this.setState({answer: [], buttonValue1:false, buttonValue2:false, buttonValue3:false, buttonValue4:false,  buttonValue5:false})
                                }}>{t('Reset')}</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">{t('Players')}</h3>

                            <div className="card-text">
                            {/* {nameReady.map(nameReady => 
                            <div key={Math.random()}>
                                <div className="card mb-3" style={{maxWidth: "540px", height:"120px", backgroundColor:"#fdf5ee"}}>
                                    <div className="row no-gutters" style={{padding:"20px"}}>
                                        <div className="col-md-3">
                                            <img src={nameReady.avatar} alt="" style={{width:"70px"}}/>
                                        </div>
                                        <div className="col-md-9" style={{textAlign:"left", paddingLeft:"20px", fontWeight:"bold"}}>
                                            <p className="card-text">{t('Name')}: {nameReady.name}</p>
                                            <p className="card-text">{t('Score')}: {nameReady.score}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )} */}
                            </div>
                        </div>
                    </div>
                    <br/>
                    <Chat/>
                </div>
            </div>
         );
    }
}
 
export default withNamespaces()(GameSingle);
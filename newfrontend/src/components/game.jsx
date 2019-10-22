import React, { Component } from 'react';
import { socket } from "../App.js";
import DivideSign from "./images/sign/divideButton.png";
import LeftSign from "./images/sign/leftButton.png";
import MinusSign from "./images/sign/minusButton.png";
import PlusSign from "./images/sign/plusButton.png";
import RightSign from "./images/sign/rightButton.png";
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
    constructor() {
        super();
        this.state = {
          nameReady: [],
          problem:[],
          answer:'',
          warnText:'',
          round:0,
          answer:[],
          checkAnswer:'',
          stateAnswer:false
        };
      }

    componentDidMount(){
        //console.log('hi');
        socket.on("ReadyUser", data => this.setState({ nameReady: data }));
        //console.log('done');
        socket.on("readyToPlay" , data => this.setState(
            {problem: data.problem
            ,warnText:''
            ,round:data.round
        }
        ))
        socket.on("notReadyToPlay", data =>
            this.setState(
                {warnText:  data}
        ))
        
    }
    handleClick(e) {
        //console.log(e.target.value)
        this.state.answer.push(e.target.value)
        console.log(this.state.answer)
        this.setState(({
            answer: this.state.answer
        }))
    }

    answerToServer= () => {
        let answerString = this.state.answer.join(',')
        for(let i =0;i<this.state.answer.length;i++){
            answerString=answerString.replace(',','')
        }
        
        let newObject = {checkAns: answerString, time: 10}
        console.log(newObject)
        socket.emit('answer', newObject)
        socket.on('answerToClient', data =>
            this.setState(
                {
                    checkAnswer: data
                }
            ))
        //let valueBoolean=true;
        socket.on('correctAnswer', data =>{
            this.setState({
                stateAnswer: data
            })
            // if(data==true){
            //     this.setState({stateAnswer: true})
            // }else if(data==false){
            //     this.setState({stateAnswer: false})
            // }
            
        })

    }
   

    render() { 
        const { nameReady,problem, warnText,round,answer,checkAnswer, stateAnswer} = this.state; 
        return ( 
            <div className="row" style={{margin:"30px"}}>
                <div className="col-sm-8">
                    <div className="card" style={{backgroundColor:"#67605f", padding:"20px"}} >
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-9">
                                    <h3 style={{color:"white", textAlign:"left"}}>Round {round}</h3>
                                </div>
                                <div className="col-sm-3" style={{backgroundColor:"#f8e8cf"}}>
                                    <p>TIMER</p>
                                </div>
                            </div>
                            <br/><br/>
                            <div className="row" style={{height:"70px"}}>
                                <div className="col-sm-9" style={{backgroundColor:"#f6c6a9"}}>
                                    <p>{answer}</p>
                                </div>
                                <div className="col-sm-1">
                                    <h3>=</h3>
                                </div>
                                <div className="col-sm-2" style={{backgroundColor:"#fdf5ee"}}>
                                    <p>{checkAnswer}</p>
                                    <p>{stateAnswer.toString()}</p>
                                </div>
                            </div><br/>
                            <div style={{textAlign:"left", fontWeight:"bold", color:"pink"}}>
                                <h4>expected result = {problem[5]}</h4>
                                <button style={buttonStyle} onClick={this.answerToServer}>Submit</button>
                            </div>
                            <br/>
                            <div>
                                <p>{warnText}</p>
                                <button style={buttonNumStyle} onClick={e => this.handleClick(e,"value")} value={problem[0]}>{problem[0]}</button>
                                <button style={buttonNumStyle} onClick={e => this.handleClick(e,"value")} value={problem[1]}>{problem[1]}</button>
                                <button style={buttonNumStyle} onClick={e => this.handleClick(e,"value")} value={problem[2]}>{problem[2]}</button>
                                <button style={buttonNumStyle} onClick={e => this.handleClick(e,"value")} value={problem[3]}>{problem[3]}</button>
                                <button style={buttonNumStyle} onClick={e => this.handleClick(e,"value")} value={problem[4]}>{problem[4]}</button>
                                

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
                                <button style={buttonStyle} onClick={()=>{
                                    this.state.answer.splice(this.state.answer.length-1)
                                    this.setState({answer: this.state.answer}
                                        )}
                                    
                                    
                                    }>C</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Players</h3>

                            <div className="card-text">
                            {nameReady.map(nameReady => 
                            <div key={Math.random()}>
                                <div class="card mb-3" style={{maxWidth: "540px", height:"120px", backgroundColor:"#fdf5ee"}}>
                                    <div class="row no-gutters" style={{padding:"20px"}}>
                                        <div class="col-md-3">
                                            <img src={nameReady.avatar} alt="" style={{width:"70px"}}/>
                                        </div>
                                        <div class="col-md-9" style={{textAlign:"left", paddingLeft:"20px", fontWeight:"bold"}}>
                                            <p class="card-text">Name: {nameReady.name}</p>
                                            <p class="card-text">Score: {nameReady.score}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Game;
import React, { Component } from 'react';
import { socket } from "../App.js";
import DivideSign from "./images/sign/divideButton.png";
import LeftSign from "./images/sign/leftButton.png";
import MinusSign from "./images/sign/minusButton.png";
import PlusSign from "./images/sign/plusButton.png";
import RightSign from "./images/sign/rightButton.png";
import MultiplySign from "./images/sign/multiplyButton.png";
import Chat from "./chat";
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

    componentDidMount(){
        //console.log('hi in mount');
        socket.on("ReadyUser", data => {
            console.log('in ready user')
            console.log(data)
            this.setState({ 
                nameReady: data,
                round: data[0].round})
        })
    
        //console.log('done');
        socket.on("readyToPlay" , data => {
            console.log('in ready to play')
            // console.log(data[0].problem)
            if(this.state.firstTimeOut){
                this.startTime();
            }
            this.setState(
                {problem: data.problem
                ,warnText:''
            })
        })
        socket.on("notReadyToPlay", data =>{
            console.log("in not ready to play")

            this.setState(
                {warnText:  data}
        )})

        socket.on("changeToWinner", data => this.setState({changeWinner: data}));

        if(this.state.changeWinner){
            console.log('in toChangeWinner')
            this.props.onChangeGameToWinner();
        }
        socket.on("correctAnswer", data =>{
            this.setState({
                stateAnswer: data
            })
        })
        if(this.state.stateAnswer){
            console.log(this.state.stateAnswer, "bb")
            this.stopTime();
        }
        socket.on("needReset", data =>{
            // console.log('the data is: ', this.state.reset)
            if(this.state.reset){
                this.setState({reset: data})
            }
            console.log('the data is D: ', this.state.reset)
            // console.log('the data is: ', this.state.reset)
        })

        if(this.state.reset){
            console.log('in needReset na ka: d')
            this.props.onResetGame();
        }

        
    }

    componentDidUpdate(){
        socket.on("changeToWinner", data =>{
            // console.log('changeWinner:', this.state.changeWinner);
            this.setState({changeWinner: data});
        })
        // console.log('changeWinner:', this.state.changeWinner);
        if(this.state.changeWinner){
            console.log('')
            this.props.onChangeGameToWinner();
        }

        if(this.state.stateAnswer){
            this.stopTime();
        }
        if(this.state.secondElapsed < 0 && this.state.firstTimeOut){
            this.stopTime();
            this.state.firstTimeOut = false;
            let answerString = this.state.answer.join(',')
            for(let i =0;i<this.state.answer.length;i++){
                answerString=answerString.replace(',','')
            }
            let newObject = {checkAns: answerString, time: 0}
            console.log(newObject)
            socket.emit('answer', newObject)
            socket.on('answerToClient', data =>
            this.setState({checkAnswer: data}))
        }
        socket.on("needReset", data =>{
            console.log('the data is A: ', data)
            console.log('the data is B: ', this.state.reset)
            if(this.state.reset===false){
                this.setState({reset: data})
            }
            // console.log('in needReset na ka: b')
            // console.log('the data is: ', this.state.reset)
        })
        if(this.state.reset){
            console.log('in needReset na ka: c')
            this.props.onResetGame()
        }
        // socket.on("readyToPlay" , data =>{
        //     console.log('hiiiiiiiiii')
        //     console.log(data);
        //     // if(data.problem != this.state.problem){
        //     //     this.setState({
        //     //         problem: data.problem
        //     //         ,warnText:''
        //     //         ,round:data.round
        //     //     })
        //     // }
        // })

        
    }
    handleClick1(e) {
        this.state.answer.push(e.target.value)
        this.setState(({
            answer: this.state.answer,
            buttonValue1: true
        }))
    }
    handleClick2(e) {
        //console.log(e.target.value)
        this.state.answer.push(e.target.value)
        this.setState(({
            answer: this.state.answer,
            buttonValue2: true
        }))
    }
    handleClick3(e) {
        //console.log(e.target.value)
        this.state.answer.push(e.target.value)
        this.setState(({
            answer: this.state.answer,
            buttonValue3: true
        }))
    }
    handleClick4(e) {
        //console.log(e.target.value)
        this.state.answer.push(e.target.value)
        this.setState(({
            answer: this.state.answer,
            buttonValue4: true
        }))
    }
    handleClick5(e) {
        //console.log(e.target.value)
        this.state.answer.push(e.target.value)
        this.setState(({
            answer: this.state.answer,
            buttonValue5: true
        }))
    }

    answerToServer= () => {
        let answerString = this.state.answer.join(',')
        for(let i =0;i<this.state.answer.length;i++){
            answerString=answerString.replace(',','')
        }
        console.log(this.stateAnswer, "cc")
        let newObject = {checkAns: answerString, time: this.state.secondElapsed %60}
        console.log(newObject)
        socket.emit('answer', newObject)
        socket.on('answerToClient', data =>
            this.setState(
                {
                    checkAnswer: data
                }
            ))
        //let valueBoolean=true;
        // socket.on('correctAnswer', data =>{
        //     this.setState({
        //         stateAnswer: data
        //     })
        //     if(this.state.stateAnswer){
        //         this.stopTime();
        //     }
        //     // if(data==true){
        //     //     this.setState({stateAnswer: true})
        //     // }else if(data==false){
        //     //     this.setState({stateAnswer: false})
        //     // }
        // socket.on('correctAnswer', data =>{
        //     this.setState({
        //         stateAnswer: data
        //     })
            
        // // })

    }

    getSecond(){
        return("00" + (this.state.secondElapsed % 60 )).slice(-2);
    }

    startTime = () =>{
        console.log('in startTime')
        var _this =this;
        this.countdown = setInterval(function(){
            _this.setState({ secondElapsed: _this.state.secondElapsed-1 });
        }, 1000);
        console.log(this.countdown)

    }

    stopTime(){
        clearInterval(this.countdown);
        console.log("Stop Value"+ (this.state.secondElapsed %60))
        let y = this.state.secondElapsed %60
        return y
    }

    sendTimeout(){
        let newObject = {checkAns: "", time: 0}
        console.log(newObject)
        socket.emit('answer', newObject)
    }
    hint=()=>{
        socket.emit("hint")
        socket.on("hintToClient", (data) =>{
           this.setState({
               hintString: data
           })
        })
        console.log(this.state.hintString)
    }

    skip=() =>{
        // console.log('skip button work')
        socket.emit("skip")
        if(this.state.firstTimeOut){
            this.stopTime();
        }
    }

    render() { 
        const { nameReady,problem, warnText,round,answer,checkAnswer, stateAnswer, buttonValue1,buttonValue2,buttonValue3,buttonValue4,buttonValue5, hintString} = this.state; 
        const { onChangeGameToWinner } =this.props;
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
                                    <div>
                                        <h1>{this.getSecond()}</h1>
                                        <button onClick={() => this.startTime()}>Start</button>
                                        <button onClick={() => this.stopTime()}>Stop</button>
                                        
                                        {/* <div style={{color:"black", fontSize:"1px"}}>{(this.state.secondElapsed %60) === 0 ? this.stopTime(): null }</div> */}
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
                                    <h4 style={{textAlign:"left", fontWeight:"bold", color:"pink"}}>expected result = {problem[5]}</h4>
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-outline-success" onClick={() =>{this.hint()}}>HINT</button>
                                    <p>{hintString}</p>
                                </div>
                                <div className="col-sm-2" style={{marginLeft:"-30px"}}>
                                    <button className="btn btn-outline-info" onClick={() =>{this.skip()}}>SKIP</button>
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-outline-warning" onClick={() =>{this.answerToServer()}}>Submit</button>
                                </div>
                            </div>
                            <br/>
                            <div style={{marginLeft:"-100px"}}>
                                <p>{warnText}</p>
                                <button style={buttonNumStyle} onClick={e => this.handleClick1(e,"value")} disabled={buttonValue1} value={problem[0]}>{problem[0]}</button>
                                <button style={buttonNumStyle} onClick={e => this.handleClick2(e,"value")} disabled={buttonValue2} value={problem[1]}>{problem[1]}</button>
                                <button style={buttonNumStyle} onClick={e => this.handleClick3(e,"value")} disabled={buttonValue3} value={problem[2]}>{problem[2]}</button>
                                <button style={buttonNumStyle} onClick={e => this.handleClick4(e,"value")} disabled={buttonValue4} value={problem[3]}>{problem[3]}</button>
                                <button style={buttonNumStyle} onClick={e => this.handleClick5(e,"value")} disabled={buttonValue5} value={problem[4]}>{problem[4]}</button>
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
                                }}>reset</button>
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
                                <div className="card mb-3" style={{maxWidth: "540px", height:"120px", backgroundColor:"#fdf5ee"}}>
                                    <div className="row no-gutters" style={{padding:"20px"}}>
                                        <div className="col-md-3">
                                            <img src={nameReady.avatar} alt="" style={{width:"70px"}}/>
                                        </div>
                                        <div className="col-md-9" style={{textAlign:"left", paddingLeft:"20px", fontWeight:"bold"}}>
                                            <p className="card-text">Name: {nameReady.name}</p>
                                            <p className="card-text">Score: {nameReady.score}</p>
                                            <p className="card=text">Round: {nameReady.round}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}
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
 
export default Game;
import React, { Component } from 'react';
// import { useState } from 'react';
import { socket } from "../App.js";

const styleBlock = {
    backgroundColor:"#67605f",
    height: "300px",
    marginTop: "200px",
    width:"40%",
    marginLeft: "30%",
    marginRight: "30%",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    fontSize: "40px",
    reset: false,
}
class RoundWinner extends Component {

    constructor(){
        super();
        this.state={
            round:0,
            text:[],
            winnerName: '',
            backGame: false,
            reset: false,

        }
    }

    componentDidMount(){
        socket.on("roundWinner", data => this.setState({ 
            round: data.round,
            winnerName: data.name[0].name,
        }));
        socket.on("goBackToGame", data => {
            console.log('in goBackToGame')
            this.setState({backGame: data})
        });

        if(this.state.backGame){
            console.log('in onBackToGame')
            this.props.onBackToGame();
        }
    };

    componentDidUpdate(){
        socket.on("goBackToGame", data => {
            console.log('in goBackToGame')
            this.setState({backGame: data})
        });

        if(this.state.backGame){
            console.log('in onBackToGame')
            this.props.onBackToGame();
        }
        socket.on("needReset", data =>{
            if(this.state.reset===false){
                this.setState({reset: data})
            }
        })
        if(this.state.reset){
            console.log('in needReset na ka: c')
            this.props.onResetWinner()
        }
    }

    goBack = () => {
        console.log('inGoback')
        socket.emit('nextRound');
    }

    render() {
        const { winnerName } = this.state; 
        const { round } = this.state; 

        return ( 
            <div style={styleBlock}>
                <p style={{paddingTop:"70px"}} >Round-{round} Winner is </p>
                <p>{winnerName} ! </p>
                <button className="btn" onClick={() =>{ this.goBack()}}>next</button>
            </div>
         );
    }
}
export default RoundWinner;
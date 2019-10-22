import React, { Component } from 'react';
// import { useState } from 'react';
import { socket } from "../App.js";


class RoundWinner extends Component {

    constructor(){
        super();
        this.state={
            round:0,
            text:[],
            winnerName: '',
            backGame: false,

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
    }

    goBack = () => {
        socket.emit('nextRound');
    }

    render() {
        const { winnerName } = this.state; 
        const { round } = this.state; 
        const { onBackToGame } =this.props;

        return ( 
            <div>
                <p>Round: </p>
                <p>{round}</p>
                <p>Winner: </p>
                <p>{winnerName}</p>
                <button className="btn" onClick={() =>{ this.goBack()}}>next</button>
            </div>
         );
    }
}
export default RoundWinner;
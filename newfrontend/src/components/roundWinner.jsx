import React, { Component } from 'react';
// import { useState } from 'react';
import { socket } from "../App.js";


class RoundWinner extends Component {

    constructor(){
        super();
        this.state={
            round:0,
            text:[],
            winnerName: [],
        }
    }

    componentDidMount(){
        socket.on("roundWinner", data => this.setState({ 
            round: data.round,
            winnerName: data.name,
        }));
    }

    render() {
        const { winnerName } = this.state; 
        const { round } = this.state; 

        return ( 
            <div>
                <p>Round: </p>
                <p>{round}</p>
                <p>Winner: </p>
                <p>{winnerName}</p>
            </div>
         );
    }
}
export default RoundWinner;
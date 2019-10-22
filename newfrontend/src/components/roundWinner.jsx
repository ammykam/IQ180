import React, { Component } from 'react';
// import { useState } from 'react';
//import { socket } from "../App.js";

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
}
class RoundWinner extends Component {

    constructor(){
        super();
        this.state={
        }
    }

    render() {
        return ( 
            <div style={styleBlock}>
                <p style={{paddingTop:"70px"}} >Round ____ Winner is </p>
                <p>______ ! </p>
            </div>
         );
    }
}
export default RoundWinner;
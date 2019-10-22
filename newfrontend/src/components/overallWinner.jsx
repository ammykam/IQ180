import React, { Component } from 'react';
//import { socket } from "../App.js";

const styleBlock = {
    backgroundColor:"#d67573",
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
class OverallWinner extends Component {

    constructor(){
        super();
        this.state={
        }
    }

    render() {
        return ( 
            <div style={styleBlock}>
                <p style={{paddingTop:"70px"}} >The Winner is </p>
                <p>______ ! </p>
            </div>
         );
    }
}
export default OverallWinner;
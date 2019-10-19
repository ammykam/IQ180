import React, { Component } from 'react';

const userStyle ={
    backgroundColor: "#67605f",
    marginLeft: "10%",
    marginRight: "60%",
    marginTop:"100px",
    width:"30%",
    height:"500px",
}
const topicStyle ={
    backgroundColor: "#d67573",
    marginLeft: "10%",
    marginRight: "60%",
    width:"30%",
    height:"30px",
}

class WhosReady extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={userStyle}>
                <h1 style={topicStyle}>Who's Ready</h1>
            </div>
         );
    }
}
 
export default WhosReady;
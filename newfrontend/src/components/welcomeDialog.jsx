import React, { Component } from 'react';
import "./css/welcomeDialog.css";
import Login from "./login";


class WelcomeDialog extends Component {
    
    state = {  }
    render() { 
        const styleDialog ={
            backgroundColor: "#67605f",
            marginLeft: "20%",
            marginRight: "20%",
            marginTop:"100px",
            width:"60%",
            height:"500px",
        }
        const { onWelcomeWelcome } = this.props;
        return ( 
            <div style={styleDialog}>
                <h1>Welcome ______</h1>
                <button className="btn btn-primary" onClick={onWelcomeWelcome}>Let's Start</button>
            </div>
         );
    }
}
 
export default WelcomeDialog;
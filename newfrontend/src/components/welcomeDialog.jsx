import React, { Component } from 'react';
import "./css/welcomeDialog.css";
import { socket } from "../App.js";
import Login from "./login";


class WelcomeDialog extends Component {
    constructor(){
        super();
        this.state={
            name: "",
        }
    }
    componentDidMount(){
        // const {name} = this.state;
        socket.on("WelcomeUser", data => this.setState({name: data.name}));
    }
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
        const { name } = this.state;
        return ( 
            <div style={styleDialog}>
                {this.welcomeUser}
                <h1>Welcome {name}!</h1>
                <button className="btn btn-primary" onClick={onWelcomeWelcome()}>Let's Start</button>
            </div>
         );
    }
}
 
export default WelcomeDialog;
import React, { Component } from 'react';
// import { useState } from 'react';
import { socket } from "../App.js";
import FirstQues from "./firstQues";
import SecondQues from "./secondQues";


const styleButton = {
    backgroundColor: "#fdf5ee",
    marginRight: "-80%",
    marginBottom: "-10%"
}

const styleDialog ={
    backgroundColor: "#67605f",
    marginLeft: "20%",
    marginRight: "20%",
    marginTop:"100px",
    width:"60%",
    height:"500px",
}

class WelcomeDialog extends Component {
    _isMounted = false;
    constructor(){
        super();
        this.state={
            name: "New Comer",
            showFirstQues: true,
            showSecondQues: false,
        }
    }

    componentDidMount(){
        this._isMounted=true;
        socket.on("WelcomeUser", data => this.setState(
            {name: data.name}
            ));
    }

    componentWillUnmount(){
        this._isMounted=false;
    }

    skipBut(){
        socket.emit('askInformation');
    }
    
    handleClick(){
        console.log("hi");
        if(this._isMounted){
            this.setState({showFirstQues: false});
            this.setState({showSecondQues: true});
        }
    }

    handleSecondClick(){
        console.log("hiSecond");
        this.skipBut();
        this.props.onWelcomeWelcome();
    }

    render() {

        const { name } = this.state;
        const { showFirstQues } = this.state;
        const { showSecondQues } = this.state;
        const { onWelcomeWelcome } = this.props;

        return ( 
            <div style={styleDialog}>
                <h1 style={{color:"white"}}> Hello {name}!</h1>
                <div style={{backgroundColor:"#f6c6a9", margin:"50px", height:"250px"}}>
                    {showFirstQues && <FirstQues onClick={() => this.handleClick()}/>}
                    {showSecondQues && <SecondQues onSecondClick={() => this.handleSecondClick()}/>}
                </div>
                <button type="button" className="btn" onClick={() =>{onWelcomeWelcome(); this.skipBut()}} style={styleButton}>Next</button>
            </div>
         );
    }
}
export default WelcomeDialog;
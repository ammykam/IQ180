import React, { Component } from 'react';
import { socket } from "../App.js";

const cardStyle ={
    backgroundColor: "#67605f",
    height:"600px",
}

const cardTitleStyle ={
    backgroundColor: "#fdf5ee",
    height: "auto",
    color: "#67605f"
}

const buttonStyle ={
    backgroundColor: "#d67573",
    color:"white",
    width: "120px",
    fontWeight: "bold",
}

class WhosReady extends Component {

    constructor() {
        super();
        this.state = {
          nameOnline: [],
          nameReady: [],
          name: "",
          value: true,
        };

      }

    sendBoolean(){
        console.log("sendBoolean called!");
    }

    componentDidMount(){
        console.log('hi')
        socket.on("WelcomeUser", data => this.setState({ 
            name: data.name }
            ));
        socket.on("OnlineUser", data => this.setState({ nameOnline: data }));
        socket.on("ReadyUser", data => this.setState({ nameReady: data }));
        console.log(this.state.name)
        console.log('done')
    }

    sendReady = () => {   
        socket.emit('readyUser');
        this.setState({value: !this.state.value});
      };

    render() {
        const { nameOnline } = this.state; 
        const { nameReady } = this.state; 
        const { value } = this.state; 
        const { onWhosReadyStart } =this.props;
        return ( 
            <div className="row">
                <div className="col-sm-5" style={{paddingRight:"50px", paddingLeft:"100px", marginTop:"60px"}}>
                    <div className="card" style={cardStyle}>
                        <div className="card-body">
                            <h3 className="card-title" style={cardTitleStyle} >Online Players</h3>
                            <p className="card-text" style={{textAlign:"left", color:"white", fontWeight:"bold", fontSize:"20px"}}>
                            {nameOnline.map(nameOnline => <div>
                            <li>{nameOnline.name}</li>
                            </div>)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-2" style={{marginTop:"18%"}}>
                    <button className="btn" style={buttonStyle} onClick={() => this.sendReady()}>Ready</button>
                    <br/> <br/> <br/>
                    <button className="btn" style={buttonStyle} disabled={value} onClick={() =>{onWhosReadyStart(); this.sendBoolean()}}>Start</button>
                </div>

                <div className="col-sm-5" style={{paddingRight:"100px", paddingLeft:"50px", marginTop:"60px"}}>
                    <div className="card" style={cardStyle}>
                        <div className="card-body">
                            <h3 className="card-title" style={cardTitleStyle}>Who's Ready</h3>
                            <p className="card-text" style={{textAlign:"left", color:"white", fontWeight:"bold", fontSize:"20px"}}>
                            {nameReady.map(nameReady => <div>
                            <li>{nameReady.name}</li>
                            </div>)}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
         );
    }
}
 
export default WhosReady;
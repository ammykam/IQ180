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
    _isMounted = false;
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
        //console.log("sendBoolean called!");
        socket.emit('start');
    }

    componentDidMount(){
        this._isMounted=true;
        //console.log('hi')
        socket.on("WelcomeUser", data => this.setState({ name: data.name }));
        socket.on("OnlineUser", data => this.setState({ nameOnline: data }));
        socket.on("ReadyUser", data => this.setState({ nameReady: data }));
        //console.log(this.state.nameOnline)
        //console.log(this.state.nameReady)
        //console.log('done')
    }

    componentWillUnmount(){
        this._isMounted=false;
    }
    
    // componentDidUpdate(){
    //     console.log("get in")
    //     if(this.state.nameReady.length>1){
    //         console.log("in for")
    //         this.setState({value: true});
    //     }else{

    //     }
    // }

    sendReady = () => {   
        socket.emit('readyUser');
        //console.log(this.state.nameReady.length)
        
    };

    present = () =>{
        socket.on('ReadyUser',data => this.setState(
            { nameReady: data }
        ));

        return this.state.nameReady.length
    }

    render() {
        const { nameOnline } = this.state; 
        const { nameReady } = this.state; 
        const { value } = this.state; 
        const { onWhosReadyStart } =this.props;
        //const x = nameReady.length;
        return ( 
            <div className="row">
                <p>The number of User: {this.present()}</p>
                <div className="col-sm-5" style={{paddingRight:"50px", paddingLeft:"100px", marginTop:"60px"}}>
                    <div className="card" style={cardStyle}>
                        <div className="card-body">
                            <h3 className="card-title" style={cardTitleStyle} >Online Players</h3>
                            <div className="card-text" style={{textAlign:"left", color:"white", fontWeight:"bold", fontSize:"20px"}}>
                            {nameOnline.map(nameOnline =><div className="readyPlayers" key={Math.random()}>
                            <li>{nameOnline.name}</li>
                            </div>
                            )}
                            </div>
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
                            <div className="card-text" style={{textAlign:"left", color:"white", fontWeight:"bold", fontSize:"20px"}}>
                            {nameReady.map(nameReady => <div key={Math.random()}>
                            <li>{nameReady.name}</li>
                            </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
         );
    }
}
 
export default WhosReady;
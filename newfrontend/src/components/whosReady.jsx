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
          user: [],
          value: true,
          number:0,
          difficulty:0
        };
      }

    sendBoolean(){
        //console.log("sendBoolean called!");
        socket.emit('start',100);
    }

 

    componentDidMount(){
        this._isMounted=true;
     
        socket.on("WelcomeUser", data => this.setState({ user: data }));
        socket.on("OnlineUser", data => this.setState({ nameOnline: data }));
        socket.on("ReadyUser", data => this.setState({ nameReady: data }));
    }

    componentWillUnmount(){
        this._isMounted=false;
    }
    
    sendReady = (x) => {   
        socket.emit('readyUser');
        //console.log(x);
        socket.on("WelcomeUser", data => this.setState({ user: data }));
        let y;
        if(this.state.user.ready === false){
            console.log("false")
            y = x + 1;
        }
        console.log(this.state.user)
        if(this.state.user.ready === true){
            console.log("true")
            y =x -1;
        }
        console.log("new" + y);
        if(y > 1){
            console.log(y);
            this.setState({value: false});
        }else{
            this.setState({value: true});
        }
    };

    sendLevel = () => {
        var e = document.getElementById("levelSelect");
        var a = e.options[e.selectedIndex].value;
        let y;
        if(a=="Easy") {y=10;}
        if(a=="Medium") {y=50;}
        if(a=="Hard") {y=100;}
    }

    render() {
        const { nameOnline } = this.state; 
        const { nameReady } = this.state; 
        const { value } = this.state; 
        const { onWhosReadyStart } =this.props;
        const x = nameReady.length;
        return ( 
            <div className="row">
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

                <div className="col-sm-2" style={{marginTop:"15%"}}>
                    <button className="btn" style={buttonStyle} onClick={() => this.sendReady(x)}>Ready</button>
                    <br/> <br/> <br/>
                    <div className="dropdown" style={{width:"110px", marginLeft:"52px"}}>
                        <div className="form-group">
                            <label for="exampleFormControlSelect1">Select Level</label>
                            <select className="form-control" id="levelSelect">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                            </select>
                        </div>
                    </div>
                    <br/> <br/>
                    <button className="btn" style={buttonStyle} disabled={value} onClick={() =>{onWhosReadyStart(); this.sendBoolean(); this.sendLevel()}}>Start</button>
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
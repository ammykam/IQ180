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
     
        //console.log('hi')
        const temp = this.state.checkName
        let x=0;
        socket.on("WelcomeUser", data => 
      
        this.setState({ user: data }),
        console.log(this.state.user)
        );
        socket.on("OnlineUser", data => this.setState({ nameOnline: data }));
        socket.on("ReadyUser", data => this.setState({ nameReady: data }));

        //console.log(this.state.nameOnline)
        //console.log(this.state.nameReady)
        //console.log('done')
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

    // present = () =>{
    //     socket.on('ReadyUser',data => 

    //     this.setState({ nameReady: data }),
        
    //     );

    //     if(this.state.nameReady.length>1){
    //         this.setState({value: true});
    //     }
        
    //     //console.log(this.state.nameReady.length)
    // }

    render() {
        const { nameOnline } = this.state; 
        const { nameReady } = this.state; 
        const { value } = this.state; 
        const { onWhosReadyStart } =this.props;
        const x = nameReady.length;
        return ( 
            <div className="row">
                {/* {this.present()} */}
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
                    <button className="btn" style={buttonStyle} onClick={() => this.sendReady(x)}>Ready</button>
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
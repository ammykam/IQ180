import React, { Component } from 'react';
import { socket } from "../App.js";
import { withNamespaces } from 'react-i18next';

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

const buttonSingleStyle ={
    backgroundColor: "#d67573",
    color:"white",
    width: "160px",
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
          numberUser:0,
          number:0,
          difficulty:0,
          level:0,
          toChangeGame: false,
        };
      }

 

    componentDidMount(){
        this._isMounted=true;
     
        socket.on("WelcomeUser", data => this.setState({ user: data }));
        socket.on("OnlineUser", data => this.setState({ nameOnline: data }));
        socket.on("ReadyUser", data => this.setState({ nameReady: data }));
        socket.on("toChangeGame", data => this.setState({toChangeGame: data}));
        if(this.state.toChangeGame){
            console.log('in change Game')
            this.props.onWhosReadyStart();
        }

        socket.on('ReadyUser', (message) => {
            this.setState({numberUser:message.length})
            //console.log(this.state.numberUser)
        })
        if(this.state.numberUser>0){
            this.setState({value: false});
        }
    }

    componentWillUnmount(){
        this._isMounted=false;
    }

    componentDidUpdate(){
        socket.on("toChangeGame", data => this.setState({toChangeGame: data}));
        if(this.state.toChangeGame){
            this.props.onWhosReadyStart();
        }
        socket.on('ReadyUser', (message) => {
            this.setState({numberUser:message.length})
            //console.log(this.state.numberUser)
        })
        if(this.state.value){
            if(this.state.numberUser>2){
                this.setState({value: false});
            }
        }
    }
    
    sendReady = (x) => {   
        socket.emit('readyUser');


        // socket.on('ReadyUser', (message) => {
        //     this.setState({numberUser:message.length})
        //     //console.log(this.state.numberUser)
        // })

        // if(this.state.numberUser>0){
        //     this.setState({value: false});
        // }
        //this.setBoolean()

        // socket.on("WelcomeUser", data => this.setState({ user: data }));
        // let y;
        // if(this.state.user.ready === false){
        //     console.log("false")
        //     y = x + 1;
        // }
        // console.log(this.state.user)
        // if(this.state.user.ready === true){
        //     console.log("true")
        //     y =x -1;
        // }
        // console.log("new" + y);
        // if(y > 1){
        //     console.log(y);
        //     this.setState({value: false});
        // }else{
        //     this.setState({value: true});
        // }
    };



    sendLevel = () => {
        
        var e = document.getElementById("levelSelect");
        var a = e.options[e.selectedIndex].value;
        let l;
        if(a==="Easy") {
            l = 10;
        }
        if(a==="Medium") {
            l = 50
        }
        if(a==="Hard") {
            l = 100
        }
        socket.emit('start',l)
    }

    render() {
        const { nameOnline } = this.state; 
        const { nameReady } = this.state; 
        const { onWhosReadyStart, onSingleStart } =this.props;
        const x = nameReady.length;
        const { t } = this.props;
        return ( 
            <div className="row">
                <div className="col-sm-5" style={{paddingRight:"50px", paddingLeft:"100px", marginTop:"60px"}}>
                    <div className="card" style={cardStyle}>
                        <div className="card-body">
                            <h3 className="card-title" style={cardTitleStyle} >{t('Online Players')}</h3>
                            <div className="card-text" style={{textAlign:"left", color:"white", fontWeight:"bold", fontSize:"20px"}}>
                            {nameOnline.map(nameOnline =><div className="readyPlayers" key={Math.random()}>
                            <li>{nameOnline.name}</li>
                            </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-2" style={{marginTop:"12%"}}>
                    <button className="btn" style={buttonStyle} onClick={() => this.sendReady(x) }>{t('Ready')}</button>
                    <br/> <br/> <br/>
                    <div className="dropdown" style={{width:"110px", marginLeft:"52px"}}>
                        <div className="form-group">
                            <label forhtml="exampleFormControlSelect1" style={{color:"brown"}}>{t('Select Level')}</label>
                            <select className="form-control" id="levelSelect">
                            <option>{t('Easy')}</option>
                            <option>{t('Medium')}</option>
                            <option>{t('Hard')}</option>
                            </select>
                        </div>
                    </div>
                    <br/> <br/>
                    <button className="btn" style={buttonStyle} disabled={false} onClick={() =>{ onWhosReadyStart();this.sendLevel();}}>{t('Start')}</button>
                    <br/><br/><br/>
                    <button className="btn" style={buttonSingleStyle} disabled={false} onClick={() =>{ onSingleStart()}}>{t('Single Player Mode')}</button>
                </div>

                <div className="col-sm-5" style={{paddingRight:"100px", paddingLeft:"50px", marginTop:"60px"}}>
                    <div className="card" style={cardStyle}>
                        <div className="card-body">
                            <h3 className="card-title" style={cardTitleStyle}>{t('Whos Ready')}</h3>
                            <div className="card-text" style={{textAlign:"left", color:"white", fontWeight:"bold", fontSize:"20px"}}>
                            {nameReady.map(nameReady => <div key={Math.random()}>
                            <li>{nameReady.name}</li>
                            </div>
                            )}
                            </div>
                        </div>
                    </div>S
                </div>

            </div>
         );
    }
}
 
export default withNamespaces()(WhosReady);
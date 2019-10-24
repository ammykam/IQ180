import React, { Component } from 'react';
import { socket } from "../App.js";
import FirstQues from "./firstQues";
import SecondQues from "./secondQues";
import ThirdQues from "./thirdQues";
import ForthQues from "./forthQues";
import FifthQues from "./fifthQues";
import SixthQues from "./sixthQues";

import { withNamespaces } from 'react-i18next';

const styleButton = {
    backgroundColor: "#fdf5ee",
    marginRight: "-80%",
    marginBottom: "-5%"
}

const styleDialog ={
    backgroundColor: "#67605f",
    marginLeft: "20%",
    marginRight: "20%",
    marginTop:"100px",
    width:"60%",
    height:"500px",
}

class NewWelcomeDialog extends Component {
    _isMounted = false;
    constructor(){
        super();
        this.state={
            name: "",
            showFirstQues: true,
            showSecondQues: false,
            showThirdQues: false,
            showForthQues: false,
            showFifthQues: false,
            showSixthQues: false,
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
    
    handleSecondClick(){
        if(this._isMounted){
            this.setState({showFirstQues: false});
            this.setState({showSecondQues: true});
        }
    }
    handleThirdClick(){
        this.setState({showFirstQues: false});
        this.setState({showThirdQues: true});
    }
    handleForthClick(){
        this.setState({showSecondQues: false});
        this.setState({showForthQues: true});
    }
    handleFifthClick(){
        this.setState({showSecondQues: false});
        this.setState({showFifthQues: true});
    }
    handleSixthClick(){
        this.setState({showThirdQues: false});
        this.setState({showSixthQues: true});
    }
    handleSeventhClick(){
        this.setState({showThirdQues: false});
        this.setState({showForthQues: true});
    }

    handleSkipClick(){
        console.log("hiSecond");
        this.skipBut();
        this.props.onWelcomeWelcome();
    }

    render() {

        const { name } = this.state;
        const { showFirstQues, showSecondQues, showThirdQues, showForthQues, showFifthQues, showSixthQues } = this.state;
        const { onWelcomeWelcome } = this.props;
        const { t } = this.props;
        return ( 
            <div style={styleDialog}>
                <div style={{marginRight:"-750px", paddingTop:"10px", paddingRight:"80px"}}>
                    
                </div>
                <h1 style={{color:"white"}}> {t('Hello')} {name}!</h1>
                <div style={{backgroundColor:"#f6c6a9", margin:"50px", marginTop:"10px", height:"350px"}}>
                    {showFirstQues && <FirstQues onSecondClick={() => this.handleSecondClick()} onThirdClick={() => this.handleThirdClick()}/>}
                    {showSecondQues && <SecondQues onForthClick={() => this.handleForthClick()} onFifthClick={() => this.handleFifthClick()}/>}
                    {showThirdQues && <ThirdQues onSixthClick={() => this.handleSixthClick()} onSeventhClick={() => this.handleSeventhClick()}/>}
                    {showForthQues && <ForthQues onSkipClick={() => this.handleSkipClick()}/>}
                    {showFifthQues && <FifthQues onSkipClick={() => this.handleSkipClick()}/>}
                    {showSixthQues && <SixthQues onSkipClick={() => this.handleSkipClick()}/>}
                </div>
                {/* <button type="button" className="btn" onClick={() =>{onWelcomeWelcome(); this.skipBut()}} style={styleButton}>{t('Skip')}</button> */}
            </div>
         );
    }
}
export default withNamespaces()(NewWelcomeDialog);
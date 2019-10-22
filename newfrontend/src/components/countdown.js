import React, { Component } from 'react';

class Countdown extends Component{
    constructor(props){
        super(props);

        this.state = {
            secondElapsed :60
        };
    }

    getSecond(){
        return("00" + (this.state.secondElapsed % 60 )).slice(-2);
    }

    startTime(){
        var _this =this;
        this.countdown = setInterval(function(){
            _this.setState({ secondElapsed: _this.state.secondElapsed-1 });
        }, 1000);

    }

    stopTime(){
        clearInterval(this.countdown);
        console.log("Stop Value"+ (this.state.secondElapsed %60))
    }

    render(){
        return (
            <div>
                <h1>
                    {this.getSecond()}
                </h1>
                <button onClick={() => this.startTime()}>
                    Start
                </button>
                <button onClick={() => this.stopTime()}>
                    Stop
                </button>
            </div>
        );
    }
}

export default Countdown
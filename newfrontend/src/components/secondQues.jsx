import React, { Component } from 'react';

const styleChoice ={
    borderColor: "transparent",
}

class SecondQues extends Component {
    state = {  }
    render() { 
        const { onSecondClick } = this.props;
        return ( 
            <div>
                <br/><h3>Glad to see you in IQ180</h3><br/>
                <button type="button" className="btn btn-outline-dark" style={styleChoice} onClick={onSecondClick} >I'm excited to play your game!</button><br/>
                <button type="button" className="btn btn-outline-dark" style={styleChoice} onClick={onSecondClick}>It might be a ver simple game.</button><br/>
                <button type="button" className="btn btn-outline-dark" style={styleChoice} onClick={onSecondClick}>Can't wait to see your game!</button>
            </div>
         );
    }
}
 
export default SecondQues;
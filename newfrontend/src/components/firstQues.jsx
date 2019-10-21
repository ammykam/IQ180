import React, { Component } from 'react';

const styleChoice ={
    borderColor: "transparent",
}

class FirstQues extends Component {
    state = {  }
    render() { 
        const { onClick } = this.props;
        return ( 
            <div>
                <br/><h3>How are you?</h3><br/>
                <button type="button" className="btn btn-outline-dark" style={styleChoice} onClick={onClick} >Hello!</button><br/>
                <button type="button" className="btn btn-outline-dark" style={styleChoice} onClick={onClick}>Yo!</button><br/>
                <button type="button" className="btn btn-outline-dark" style={styleChoice} onClick={onClick}>What's up</button>
            </div>
         );
    }
}
 
export default FirstQues;
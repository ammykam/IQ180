import React, { Component } from 'react';
import { socket } from '../App';
class Chat extends Component {
    constructor(){
        super();
        this.state={
            input:"",
            messages:[]

        };
    }
    componentDidMount = () =>{
        const temp= this.state.messages
        socket.on('messageToClient', (message) =>{
            temp.push(message)
            this.setState({
                messages: temp
            })
        })
    }
    sendChat = () =>{
        const {input} = this.state
        socket.emit('chatMessage',input)
        this.setState({
            input:""
        })
    }
    changeInput = (e) =>{
        this.setState({
            input: e.target.value
        })
    }
    render() { 
        const {input, messages} = this.state
        return ( 
            <div class="container" style={{width:"100%"}}>
                <h4 style={{textAlign:"left"}}>CHAT</h4>
                <div class="card" style={{height:"auto"}}>
                    <div class="card-block">
                        {
                            messages.map((message) => 
                            <div key={message.name} style={{textAlign:"left"}}>
                                <p style={{fontWeight:"bold", display:"inline"}}> {message.name} </p> : {message.text}
                            </div>)
                        }
                    </div>
                </div>
                    <input type="text" value={input} onChange={this.changeInput} style={{width:"317px"}}/>
                    <button onClick={()=>this.sendChat()}>Send</button>
            </div>
         );
    }
}
 
export default Chat;
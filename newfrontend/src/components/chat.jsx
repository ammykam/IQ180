import React, { Component } from 'react';
import { socket } from '../App';
import { withNamespaces } from 'react-i18next';

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
        const { t } = this.props;

        return ( 
            <div class="container" style={{width:"100%"}}>
                <h4 style={{textAlign:"left" ,color:"brown"}}>{t('Chat')}</h4>
                <div class="card" style={{minHeight:"150px",height:"auto"}}>
                    <div class="card-block">
                        {
                            messages.map((message) => 
                            <div key={message.name} style={{textAlign:"left", paddingLeft:"10px"}}>
                                <p style={{fontWeight:"bold", display:"inline"}}> {message.name} </p> : {message.text}
                            </div>)
                        }
                    </div>
                </div>
                    <input type="text" value={input} onChange={this.changeInput} style={{width:"345px"}}/>
                    <button onClick={()=>this.sendChat()}>{t('Send')}</button>
            </div>
         );
    }
}
 
export default withNamespaces()(Chat);
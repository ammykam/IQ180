import React, { Component } from "react";
import { socket } from "../App.js";
import Avatar from "./avatar";

const styleLogin = {
  marginLeft: "20%",
  marginRight: "20%",
  marginTop: "100px",
  height:"500px",
  width: "60%",
  backgroundColor: "#fdf5ee",
  padding: "5%"
};

const styleAvatar ={
    marginLeft: "6%",
    marginRight: "5%",
    width: "89%",
}

const styleLoginButton ={
    backgroundColor: "#67605f",
    color: "white",
    marginTop: "80px",
    marginLeft: "88%",
    width: "12%",
}

class Login extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.avatar = React.createRef();
  }

  sendProfile = () => {
    var username = document.getElementById("inputUsername").value;
    var choosingAvatar = document.getElementsByName('avatarSet');
    var avatarNum;
    for(var i = 0; i < choosingAvatar.length; i++){
        if(choosingAvatar[i].checked){
            avatarNum = choosingAvatar[i].value;
        }
    }
    console.log("name created" + username);
    console.log("avatar created" + avatarNum);

    socket.emit('createUser',{
      name: username,
      avatar: avatarNum,
    })
  };

  render() {
    const { onLoginLogin } = this.props;
    return (
      <div style={styleLogin}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" style={{fontWeight:"bold"}}>Name</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              id="inputUsername"
              placeholder="name"
            />
          </div>
        </div>
        <br/>
        <br/>
        <div className="col-11" style={styleAvatar}> 
            <Avatar/>
        </div>
        <br/>
        <div>
            <button className="btn" onClick={() =>{onLoginLogin(); this.sendProfile()}} style={styleLoginButton}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;

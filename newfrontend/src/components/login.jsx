import React, { Component } from "react";
import Avatar from "./avatar";

const styleLogin = {
  marginLeft: "20%",
  marginRight: "20%",
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
    marginLeft: "88%",
    width: "12%",
}

class Login extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.avatar = React.createRef();
  }

  onAvatarToLogin = () => {
    var inputVal = document.getElementById("inputUsername").value;
    console.log("Name: " +inputVal);
    this.avatar.current.chosenAvatar();
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
        <div className="col-11" style={styleAvatar}> 
            <Avatar ref={this.avatar} />
        </div>
        <br/>
        <div>
            <button id="but1" name="but1" className="btn" onClick={() =>{this.onAvatarToLogin(); onLoginLogin();}} style={styleLoginButton}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;

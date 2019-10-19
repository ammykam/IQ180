import React, { Component } from "react";
import "./css/avatar.css";
import avatar1 from "./images/avatar/avatar1.svg";
import avatar2 from "./images/avatar/avatar2.svg";
import avatar3 from "./images/avatar/avatar3.svg";
import avatar4 from "./images/avatar/avatar4.svg";
import avatar5 from "./images/avatar/avatar5.svg";
import avatar6 from "./images/avatar/avatar6.svg";
import avatar7 from "./images/avatar/avatar7.svg";
import avatar8 from "./images/avatar/avatar8.svg";
import avatar9 from "./images/avatar/avatar9.svg";
import avatar10 from "./images/avatar/avatar10.png";

const styleAvatar = {
  width: "60px"
};

const styleCon ={
  // marginLeft: "10%",
  // marginRight: "10%",
  // width: "80%",
}
class Avatar extends Component {
  state = {};

  render() {
    return (
      <div>
      <div style={ styleCon }>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="avatarSet" id="avatar_1" value="option1"/>
            <img src={avatar1} alt="" style={styleAvatar}/>
        </div>
        
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="avatarSet" id="avatar_2" value="option2"/>
            <img src={avatar2} alt="" style={styleAvatar}/>
        </div>

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="avatarSet" id="avatar_3" value="option3"/>
            <img src={avatar3} alt="" style={styleAvatar}/>
        </div>

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="avatarSet" id="avatar_4" value="option4"/>
            <img src={avatar4} alt="" style={styleAvatar}/>
        </div>

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="avatarSet" id="avatar_5" value="option5"/>
            <img src={avatar5} alt="" style={styleAvatar}/>
        </div>

        <br/>
        <br/>

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="avatarSet" id="avatar_6" value="option6"/>
            <img src={avatar6} alt="" style={styleAvatar}/>
        </div>

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="avatarSet" id="avatar_7" value="option7"/>
            <img src={avatar7} alt="" style={styleAvatar}/>
        </div>

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="avatarSet" id="avatar_8" value="option8"/>
            <img src={avatar8} alt="" style={styleAvatar}/>
        </div>

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="avatarSet" id="avatar_9" value="option9"/>
            <img src={avatar9} alt="" style={styleAvatar}/>
        </div>

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="avatarSet" id="avatar_10" value="option10"/>
            <img src={avatar10} alt="" style={styleAvatar}/>
        </div>
      </div>
      {/* <button onClick={this.onChosenAvatar}> dog</button> */}

      </div>  
    );
    
  }

  chosenAvatar() {
    var choosingAvatar = document.getElementsByName('avatarSet');
    var choosenValue;
    for(var i = 0; i < choosingAvatar.length; i++){
        if(choosingAvatar[i].checked){
            choosenValue = choosingAvatar[i].value;
        }
    }
    console.log("Avatar: " + choosenValue);
  }
}

export default Avatar;

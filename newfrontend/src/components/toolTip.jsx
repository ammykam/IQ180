import React, { useState } from "react";
import { Button, Tooltip } from "reactstrap";


const TooltipItem = props => {
    const { item, id } = props;
    const [tooltipOpen, setTooltipOpen] = useState(false);
  
    const toggle = () => setTooltipOpen(!tooltipOpen);
  
    return (
      <span style={{marginTop:"10px"}}>
        <Button className="btn btn-danger mr-1" id={"Tooltip-" + id} style={{height:"30px"}}>
          <p style={{marginTop:"-4px"}}>{item.text}</p>
        </Button>
        <Tooltip
          placement={item.placement}
          isOpen={tooltipOpen}
          target={"Tooltip-" + id}
          toggle={toggle}
        >   <h4> How to play?</h4>
            <div style={{textAlign:"left", fontSize:"15px"}}>
            <p> 1. Game will provide 5 numbers and the answer for all players</p>
            <p> 2. Player should generate equation using (+,-,x,/,(,)) to get the answer within 60 seconds by using all 5 given numbers.</p>
            <p> 3. Player needs to play 5 rounds</p>
            <p> 4. Each round All player will receive the same 5 number and the answer. Player  who can generate equation by using less time will receive 1 point and if all player cannot answer the equation no player will receive a point.</p>
            <p> 5. The winner is the player who got highest cumulative point</p>
        </div>
        </Tooltip>
      </span>
    );
  };
  
  const ToolTip = props => {
    return (
      <>
        {[{placement: "bottom",text: "Help"}].map((tooltip, i) => {
          return <TooltipItem key={i} item={tooltip} id={i} />;
        })}
      </>
    );
  };
  
  export default ToolTip;
import React, { useState } from "react";
import { Button, Tooltip } from "reactstrap";
import { withNamespaces } from 'react-i18next';
import { Trans } from 'react-i18next';


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
        >   <div style={{fontWeight:"bold", fontSize:"20px"}}>
            <Trans i18nKey="How to play?">
                <strong> How to play?</strong>  
            </Trans>
            </div>
            <div style={{textAlign:"left", fontSize:"15px"}}>
            <Trans i18nKey="1">
              <p> 1. Game will provide 5 numbers and the answer for all players</p>
            </Trans>
            <br/><br/>
            <Trans i18nKey="2">
              <p> 2. Player should generate equation using (+,-,x,/,(,)) to get the answer within 60 seconds by using all 5 given numbers.</p>
            </Trans>
            <br/><br/>
            <Trans i18nKey="3">
              <p> 3. Each round all player will receive the same 5 number and the answer. Player  who can generate equation by using less time will receive 1 point and if all player cannot answer the equation no player will receive a point.</p>
            </Trans>
            <br/><br/>
            <Trans i18nKey="4">
              <p> 4. The winner is the player who got highest cumulative point</p>
            </Trans>
            <br/><br/>
            <Trans i18nKey="5">
              <p> 5. Game will provide hint in case that player don’t know how to generate equation by show up the first 2 number and also the operation of the correct equation </p>
            </Trans>
        </div>
        </Tooltip>
      </span>
    );
  };
  
  const ToolTip = props => {
    return (
      <>
        {[{placement: "bottom",text: 
        <Trans i18nKey="Help">Help</Trans>
      }].map((tooltip, i) => {
          return <TooltipItem key={i} item={tooltip} id={i} />;
        })}
      </>
    );
  };
  
  export default withNamespaces()(ToolTip);
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
 

const styleChoice ={
    borderColor: "transparent",
}


class FirstQues extends Component {
    state = {  }
    render() { 
        const { t } = this.props;
        const { onClick } = this.props;
        return ( 
            <div>
                <br/><h3>{t('HowAreYou')}</h3><br/>
                <button type="button" className="btn btn-outline-dark" style={styleChoice} onClick={onClick} >Hello!</button><br/>
                <button type="button" className="btn btn-outline-dark" style={styleChoice} onClick={onClick}>Yo!</button><br/>
                <button type="button" className="btn btn-outline-dark" style={styleChoice} onClick={onClick}>What's up</button>
            </div>
         );
    }
}
 
export default withNamespaces()(FirstQues);
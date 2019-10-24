import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';

const styleChoice ={
    borderColor: "transparent",
}

class SecondQues extends Component {
    state = {  }
    render() { 
        const { onForthClick, onFifthClick} = this.props;

        const { t } = this.props;
        return ( 
            <div>
                <br/><h3>{t('Please Enjoy Our Game')}</h3><br/>
                <button type="button" className="btn btn-outline-dark" style={styleChoice} onClick={onForthClick} >{t('Thanks')}</button><br/>
                <br/>
                <button type="button" className="btn btn-outline-dark" style={styleChoice} onClick={onFifthClick}>{t('Im bad at this game.')}</button><br/>
            </div>
         );
    }
}
 
export default withNamespaces()(SecondQues);
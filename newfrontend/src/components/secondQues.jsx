import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';

const styleChoice ={
    borderColor: "transparent",
}

class SecondQues extends Component {
    state = {  }
    render() { 
        const { onSecondClick } = this.props;
        const { t } = this.props;
        return ( 
            <div>
                <br/><h3>{t('Glad')}</h3><br/>
                <button type="button" className="btn btn-outline-dark" style={styleChoice} onClick={onSecondClick} >{t('Excited')}</button><br/>
                <button type="button" className="btn btn-outline-dark" style={styleChoice} onClick={onSecondClick}>{t('Simple')}</button><br/>
                <button type="button" className="btn btn-outline-dark" style={styleChoice} onClick={onSecondClick}>{t('CantWait')}</button>
            </div>
         );
    }
}
 
export default withNamespaces()(SecondQues);
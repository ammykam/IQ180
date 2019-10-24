import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
 

class FirstQues extends Component {
    state = {  }
    render() { 
        const { t } = this.props;
        const { onSecondClick, onThirdClick } = this.props;
        return ( 
            <div>
                <br/><h3>{t('Hello')}</h3><br/>
                <button type="button" className="btn btn-outline-dark" onClick={onSecondClick} >{t('Hi')}!</button><br/>
                <br/>
                <button type="button" className="btn btn-outline-dark" onClick={onThirdClick}>{t('I dont want to say hi')}!</button><br/>
            </div>
         );
    }
}
 
export default withNamespaces()(FirstQues);
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';



class ForthQues extends Component {
    render() { 
        const { t } = this.props;
        const { onSkipClick} = this.props;
        return ( 
            <div>
                <br/><h3>{t('Good Luck & Have Fun')}</h3><br/>
                <button type="button" className="btn btn-outline-dark"  onClick={onSkipClick} >{t('Thanks')}!</button><br/>
            </div>
         );
    }
}
 
export default withNamespaces()(ForthQues);
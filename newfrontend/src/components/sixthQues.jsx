import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';


class SixthQues extends Component {
    render() { 
        const { t } = this.props;
        const { onSkipClick} = this.props;
        return ( 
            <div>
                <br/>
                <img src="https://66.media.tumblr.com/392ef7c55109022e3caf0c0c7d81c4f1/tumblr_pco6r7Ki1h1vt240uo1_400.png" alt="" style={{width:"25%", marginLeft:"32.5%",marginRight:"32.5%"}}/>
                <br/><br/>
                <button type="button" className="btn btn-outline-dark" onClick={onSkipClick} >{t('Go On')}!</button>
            </div>
         );
    }
}
 
export default withNamespaces()(SixthQues);
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';


class ThirdQues extends Component {
    render() { 
        const { t } = this.props;
        const { onSixthClick, onSeventhClick } = this.props;
        return ( 
            <div>
                <br/><h3>{t('Really')} ? :(</h3><br/>
                <button type="button" className="btn btn-outline-dark"  onClick={onSeventhClick} >{t('Joking')}!</button><br/>
                <br/>
                <button type="button" className="btn btn-outline-dark" onClick={onSixthClick}>{t('YES')}! >:(</button><br/>
            </div>
         );
    }
}
 
export default withNamespaces()(ThirdQues);
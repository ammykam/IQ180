import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';

class FifthQues extends Component {
    render() { 
        const { t } = this.props;
        const { onSkipClick} = this.props;
        return ( 
            <div>
                <br/>
                <p style={{fontWeight:"bold", fontSize:"20px"}}>{t('Dont worry, heres dog for you')}</p>
                <img src="https://media.istockphoto.com/photos/corgi-dog-smile-and-happy-in-summer-sunny-day-picture-id953069774?k=6&m=953069774&s=612x612&w=0&h=S1pb3n3UhhrnViNaEuEM-AsO-rasGU-FaxfQozyPcOE=" alt="" style={{width:"40%", marginLeft:"30%",marginRight:"30%"}}/>
                <br/><br/>
                <button type="button" className="btn btn-outline-dark" onClick={onSkipClick} >{t('OK')}!</button><br/>
            </div>
         );
    }
}
 
export default withNamespaces()(FifthQues);